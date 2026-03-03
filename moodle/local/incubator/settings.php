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

if ($hassiteconfig) {
    $settings = new admin_settingpage(
        'local_incubator',
        get_string('pluginname', 'local_incubator')
    );

    $settings->add(new admin_setting_configpasswordunmask(
        'local_incubator/sharedsecret',
        get_string('sharedsecret', 'local_incubator'),
        get_string('sharedsecret_desc', 'local_incubator'),
        ''
    ));

    $settings->add(new admin_setting_configcheckbox(
        'local_incubator/autocreateusers',
        get_string('autocreateusers', 'local_incubator'),
        get_string('autocreateusers_desc', 'local_incubator'),
        1
    ));

    $settings->add(new admin_setting_configtext(
        'local_incubator/tokenleeway',
        get_string('tokenleeway', 'local_incubator'),
        get_string('tokenleeway_desc', 'local_incubator'),
        '60',
        PARAM_INT
    ));

    $settings->add(new admin_setting_configtext(
        'local_incubator/syncmaxskew',
        get_string('syncmaxskew', 'local_incubator'),
        get_string('syncmaxskew_desc', 'local_incubator'),
        '300',
        PARAM_INT
    ));

    $settings->add(new admin_setting_configtextarea(
        'local_incubator/programmapjson',
        get_string('programmapjson', 'local_incubator'),
        get_string('programmapjson_desc', 'local_incubator'),
        "{\n  \"skill-up\": 12,\n  \"future-now\": 34\n}",
        PARAM_RAW
    ));

    $settings->add(new admin_setting_configtext(
        'local_incubator/defaultcourseid',
        get_string('defaultcourseid', 'local_incubator'),
        get_string('defaultcourseid_desc', 'local_incubator'),
        '0',
        PARAM_INT
    ));

    $ADMIN->add('localplugins', $settings);
}

