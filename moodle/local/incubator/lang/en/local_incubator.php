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

defined('MOODLE_INTERNAL') || die();

$string['pluginname'] = 'Incubator LMS Bridge';

$string['sharedsecret'] = 'Shared secret';
$string['sharedsecret_desc'] = 'Secret used to verify Incubator JWT launch tokens and sync webhook HMAC signatures. Keep this identical to MOODLE_SHARED_SECRET in the Next.js app.';

$string['autocreateusers'] = 'Auto-create Moodle users';
$string['autocreateusers_desc'] = 'When enabled, unknown applicant emails received from Incubator are created as Moodle users automatically.';

$string['tokenleeway'] = 'JWT leeway (seconds)';
$string['tokenleeway_desc'] = 'Allowed clock skew when validating launch token exp/nbf timestamps.';

$string['syncmaxskew'] = 'Webhook max skew (seconds)';
$string['syncmaxskew_desc'] = 'Maximum timestamp drift allowed for sync webhook signatures.';

$string['programmapjson'] = 'Program-to-course map (JSON)';
$string['programmapjson_desc'] = 'JSON object mapping Incubator program slugs to Moodle course IDs.';

$string['defaultcourseid'] = 'Default Moodle course ID';
$string['defaultcourseid_desc'] = 'Fallback course ID when a program slug is not found in the JSON map. Set to 0 to disable fallback.';

$string['missingsecret'] = 'The Incubator shared secret is not configured.';
$string['invalidtokenformat'] = 'Invalid launch token format.';
$string['invalidtokenheader'] = 'Invalid launch token header.';
$string['invalidtokensignature'] = 'Invalid launch token signature.';
$string['expiredtoken'] = 'Launch token has expired or is not yet valid.';
$string['invalidtokenpayload'] = 'Launch token payload is invalid.';

$string['invalidtimestamp'] = 'Invalid webhook timestamp.';
$string['invalidsignature'] = 'Invalid webhook signature.';
$string['invalidsyncpayload'] = 'Invalid sync payload.';
$string['invalidemail'] = 'Invalid applicant email.';
$string['usernotfound'] = 'Applicant user was not found and user auto-creation is disabled.';
$string['missingcoursemapping'] = 'No Moodle course mapping found for this program.';
$string['missingcourse'] = 'Mapped Moodle course ID is invalid: {$a}.';
$string['missingmanualinstance'] = 'No enabled manual enrollment instance exists for Moodle course ID: {$a}.';
$string['missingmanualplugin'] = 'Manual enrollment plugin is not available.';
$string['ssolaunchfailed'] = 'Unable to complete LMS launch.';

