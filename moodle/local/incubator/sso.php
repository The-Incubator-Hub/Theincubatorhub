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

require_once(__DIR__ . '/../../config.php');
require_once($CFG->dirroot . '/local/incubator/classes/service.php');

$token = required_param('token', PARAM_RAW_TRIMMED);

try {
    $payload = \local_incubator\service::decode_launch_token($token);

    $email = (string) ($payload['email'] ?? '');
    $name = (string) ($payload['name'] ?? '');
    $programslug = (string) ($payload['programSlug'] ?? '');
    $returnurl = !empty($payload['returnUrl']) ? (string) $payload['returnUrl'] : '/my/';

    $user = \local_incubator\service::find_or_create_user($email, $name);
    complete_user_login($user);

    $courseid = \local_incubator\service::resolve_course_id_for_program($programslug);
    if ($courseid > 0) {
        \local_incubator\service::enrol_user_in_course((int) $user->id, $courseid);
        redirect(new moodle_url('/course/view.php', ['id' => $courseid]));
    }

    if (strpos($returnurl, $CFG->wwwroot) === 0 || strpos($returnurl, '/') === 0) {
        redirect($returnurl);
    }

    redirect(new moodle_url('/my/'));
} catch (\Throwable $exception) {
    throw new moodle_exception('ssolaunchfailed', 'local_incubator', '', null, $exception->getMessage());
}
