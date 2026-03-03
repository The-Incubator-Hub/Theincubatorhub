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

define('NO_MOODLE_COOKIES', true);

require_once(__DIR__ . '/../../config.php');
require_once($CFG->dirroot . '/local/incubator/classes/service.php');

/**
 * Emit JSON response and exit.
 *
 * @param int $status
 * @param array $payload
 * @return void
 */
function local_incubator_emit_json(int $status, array $payload): void {
    @header('Content-Type: application/json; charset=utf-8');
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    local_incubator_emit_json(405, [
        'ok' => false,
        'error' => 'method_not_allowed',
        'message' => 'Only POST is supported.',
    ]);
}

$rawbody = file_get_contents('php://input');
$timestamp = (string) ($_SERVER['HTTP_X_INCUBATOR_TIMESTAMP'] ?? '');
$signature = (string) ($_SERVER['HTTP_X_INCUBATOR_SIGNATURE'] ?? '');

try {
    if (!ctype_digit($timestamp)) {
        throw new moodle_exception('invalidtimestamp', 'local_incubator');
    }

    $validsignature = \local_incubator\service::verify_sync_signature(
        (string) $rawbody,
        $timestamp,
        $signature
    );
    if (!$validsignature) {
        throw new moodle_exception('invalidsignature', 'local_incubator');
    }

    $payload = \local_incubator\service::decode_sync_payload((string) $rawbody);
    $result = \local_incubator\service::sync_enrolment($payload);

    local_incubator_emit_json(200, [
        'ok' => true,
        'message' => 'Enrollment sync completed.',
        'result' => $result,
    ]);
} catch (moodle_exception $exception) {
    $status = 400;
    if (in_array($exception->errorcode, ['invalidsignature', 'invalidtimestamp'], true)) {
        $status = 401;
    } else if (in_array($exception->errorcode, ['missingsecret'], true)) {
        $status = 500;
    } else if (in_array($exception->errorcode, ['missingmanualplugin'], true)) {
        $status = 500;
    } else if (in_array($exception->errorcode, ['missingcoursemapping', 'missingcourse', 'missingmanualinstance'], true)) {
        $status = 422;
    }

    local_incubator_emit_json($status, [
        'ok' => false,
        'error' => $exception->errorcode,
        'message' => $exception->getMessage(),
    ]);
} catch (\Throwable $exception) {
    local_incubator_emit_json(500, [
        'ok' => false,
        'error' => 'sync_failed',
        'message' => $exception->getMessage(),
    ]);
}

