<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

namespace local_incubator;

defined('MOODLE_INTERNAL') || die();

use context_course;
use core_user;
use moodle_exception;
use stdClass;

final class service {
    private const DEFAULT_TOKEN_LEEWAY = 60;
    private const DEFAULT_SYNC_MAX_SKEW = 300;
    private const SYNC_EVENT_NAME = 'applicant.enrollment.sync';

    private static function get_config_int(string $name, int $default): int {
        $value = (int) get_config('local_incubator', $name);
        return $value > 0 ? $value : $default;
    }

    public static function get_shared_secret(): string {
        $configured = trim((string) get_config('local_incubator', 'sharedsecret'));
        if ($configured !== '') {
            return $configured;
        }

        $fromenv = trim((string) getenv('INCUBATOR_SHARED_SECRET'));
        return $fromenv;
    }

    private static function require_shared_secret(): string {
        $secret = self::get_shared_secret();
        if ($secret === '') {
            throw new moodle_exception('missingsecret', 'local_incubator');
        }
        return $secret;
    }

    private static function base64url_decode(string $value): string {
        $padding = 4 - (strlen($value) % 4);
        if ($padding < 4) {
            $value .= str_repeat('=', $padding);
        }
        $decoded = base64_decode(strtr($value, '-_', '+/'), true);
        if ($decoded === false) {
            throw new moodle_exception('invalidtokenformat', 'local_incubator');
        }
        return $decoded;
    }

    private static function base64url_encode(string $value): string {
        return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
    }

    public static function decode_launch_token(string $token): array {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            throw new moodle_exception('invalidtokenformat', 'local_incubator');
        }

        [$encodedheader, $encodedpayload, $encodedsignature] = $parts;

        $header = json_decode(self::base64url_decode($encodedheader), true);
        if (!is_array($header) || ($header['alg'] ?? '') !== 'HS256') {
            throw new moodle_exception('invalidtokenheader', 'local_incubator');
        }

        $payload = json_decode(self::base64url_decode($encodedpayload), true);
        if (!is_array($payload)) {
            throw new moodle_exception('invalidtokenpayload', 'local_incubator');
        }

        $signature = self::base64url_encode(hash_hmac(
            'sha256',
            $encodedheader . '.' . $encodedpayload,
            self::require_shared_secret(),
            true
        ));
        if (!hash_equals($signature, $encodedsignature)) {
            throw new moodle_exception('invalidtokensignature', 'local_incubator');
        }

        $now = time();
        $leeway = self::get_config_int('tokenleeway', self::DEFAULT_TOKEN_LEEWAY);
        $exp = isset($payload['exp']) ? (int) $payload['exp'] : 0;
        $nbf = isset($payload['nbf']) ? (int) $payload['nbf'] : 0;

        if (($exp > 0 && $now > ($exp + $leeway)) || ($nbf > 0 && $now < ($nbf - $leeway))) {
            throw new moodle_exception('expiredtoken', 'local_incubator');
        }

        if (empty($payload['sub']) || empty($payload['email'])) {
            throw new moodle_exception('invalidtokenpayload', 'local_incubator');
        }

        return $payload;
    }

    public static function verify_sync_signature(string $rawbody, string $timestamp, string $provided): bool {
        if ($provided === '' || !ctype_digit($timestamp)) {
            return false;
        }

        $maxskew = self::get_config_int('syncmaxskew', self::DEFAULT_SYNC_MAX_SKEW);
        $requesttime = (int) $timestamp;
        if (abs(time() - $requesttime) > $maxskew) {
            return false;
        }

        $secret = self::require_shared_secret();
        $expected = hash_hmac('sha256', $timestamp . '.' . $rawbody, $secret);
        return hash_equals($expected, $provided);
    }

    public static function decode_sync_payload(string $rawbody): array {
        $payload = json_decode($rawbody, true);
        if (!is_array($payload)) {
            throw new moodle_exception('invalidsyncpayload', 'local_incubator');
        }

        self::validate_sync_payload_array($payload);
        return $payload;
    }

    private static function validate_sync_payload_array(array $payload): void {
        $event = (string) ($payload['event'] ?? '');
        $applicant = $payload['applicant'] ?? null;
        $program = $payload['program'] ?? null;
        $application = $payload['application'] ?? null;

        if (
            $event !== self::SYNC_EVENT_NAME ||
            !is_array($applicant) ||
            !is_array($program) ||
            !is_array($application) ||
            empty($applicant['email']) ||
            empty($program['slug']) ||
            empty($application['id'])
        ) {
            throw new moodle_exception('invalidsyncpayload', 'local_incubator');
        }
    }

    private static function split_name(string $fullname): array {
        $clean = trim($fullname);
        if ($clean === '') {
            return ['Applicant', 'User'];
        }

        $parts = preg_split('/\s+/', $clean);
        if (!$parts || count($parts) === 0) {
            return ['Applicant', 'User'];
        }

        $firstname = array_shift($parts);
        $lastname = count($parts) ? implode(' ', $parts) : 'Learner';

        return [$firstname, $lastname];
    }

    private static function generate_unique_username(string $email): string {
        global $DB;

        $localpart = strtolower((string) strstr($email, '@', true));
        $candidate = preg_replace('/[^a-z0-9._-]/', '', $localpart);
        if ($candidate === '') {
            $candidate = 'incubator_user';
        }

        $base = substr($candidate, 0, 80);
        $username = $base;
        $suffix = 0;
        while ($DB->record_exists('user', ['username' => $username, 'deleted' => 0])) {
            $suffix++;
            $username = substr($base, 0, 75) . '_' . $suffix;
        }

        return $username;
    }

    public static function find_or_create_user(string $email, string $fullname = ''): stdClass {
        global $CFG;

        $normalizedemail = strtolower(trim($email));
        if (!validate_email($normalizedemail)) {
            throw new moodle_exception('invalidemail', 'local_incubator');
        }

        $users = core_user::get_user_by_email($normalizedemail);
        if (!empty($users)) {
            return reset($users);
        }

        $autocreate = (int) get_config('local_incubator', 'autocreateusers');
        if ($autocreate !== 1) {
            throw new moodle_exception('usernotfound', 'local_incubator');
        }

        require_once($CFG->dirroot . '/user/lib.php');

        [$firstname, $lastname] = self::split_name($fullname);

        $user = new stdClass();
        $user->auth = 'manual';
        $user->confirmed = 1;
        $user->mnethostid = $CFG->mnet_localhost_id;
        $user->email = $normalizedemail;
        $user->username = self::generate_unique_username($normalizedemail);
        $user->firstname = $firstname;
        $user->lastname = $lastname;
        $user->lang = current_language();
        $user->timecreated = time();
        $user->timemodified = time();

        $userid = user_create_user($user, false, false);
        return core_user::get_user($userid, '*', MUST_EXIST);
    }

    public static function get_program_course_map(): array {
        $raw = trim((string) get_config('local_incubator', 'programmapjson'));
        if ($raw === '') {
            return [];
        }

        $decoded = json_decode($raw, true);
        if (!is_array($decoded)) {
            return [];
        }

        $map = [];
        foreach ($decoded as $slug => $courseid) {
            $normalizedslug = strtolower(trim((string) $slug));
            $normalizedcourseid = (int) $courseid;
            if ($normalizedslug !== '' && $normalizedcourseid > 0) {
                $map[$normalizedslug] = $normalizedcourseid;
            }
        }

        return $map;
    }

    public static function resolve_course_id_for_program(string $programslug): int {
        $normalizedslug = strtolower(trim($programslug));
        $map = self::get_program_course_map();
        if (array_key_exists($normalizedslug, $map)) {
            return (int) $map[$normalizedslug];
        }

        $fallback = (int) get_config('local_incubator', 'defaultcourseid');
        return $fallback > 0 ? $fallback : 0;
    }

    public static function enrol_user_in_course(int $userid, int $courseid): void {
        global $CFG, $DB;

        if ($courseid <= 0) {
            throw new moodle_exception('missingcoursemapping', 'local_incubator');
        }

        $course = $DB->get_record('course', ['id' => $courseid], 'id', IGNORE_MISSING);
        if (!$course) {
            throw new moodle_exception('missingcourse', 'local_incubator', '', $courseid);
        }

        $context = context_course::instance($courseid);
        if (is_enrolled($context, $userid, '', true)) {
            return;
        }

        require_once($CFG->libdir . '/enrollib.php');

        $manualinstance = null;
        $instances = enrol_get_instances($courseid, true);
        foreach ($instances as $instance) {
            if ($instance->enrol === 'manual' && (int) $instance->status === ENROL_INSTANCE_ENABLED) {
                $manualinstance = $instance;
                break;
            }
        }

        if (!$manualinstance) {
            throw new moodle_exception('missingmanualinstance', 'local_incubator', '', $courseid);
        }

        $manualplugin = enrol_get_plugin('manual');
        if (!$manualplugin) {
            throw new moodle_exception('missingmanualplugin', 'local_incubator');
        }

        $studentrole = $DB->get_record('role', ['shortname' => 'student'], 'id', IGNORE_MISSING);
        $roleid = $studentrole ? (int) $studentrole->id : 5;

        $manualplugin->enrol_user(
            $manualinstance,
            $userid,
            $roleid,
            time(),
            0,
            ENROL_USER_ACTIVE
        );
    }

    public static function sync_enrolment(array $payload): array {
        self::validate_sync_payload_array($payload);
        $applicant = $payload['applicant'];
        $program = $payload['program'];
        $application = $payload['application'];

        $user = self::find_or_create_user(
            (string) $applicant['email'],
            (string) ($applicant['name'] ?? '')
        );

        $courseid = self::resolve_course_id_for_program((string) $program['slug']);
        self::enrol_user_in_course((int) $user->id, $courseid);

        return [
            'userid' => (int) $user->id,
            'courseid' => (int) $courseid,
            'programslug' => (string) $program['slug'],
            'applicationid' => (string) $application['id'],
            'enrolled' => true,
        ];
    }
}
