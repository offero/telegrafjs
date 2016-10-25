'use strict';

/*
* Copyright 2016 Chris Kirkos
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

const assert = require('assert');
const measurement = require('../lib/measurement');
const Measurement = measurement.Measurement;
const Int = measurement.Int;
const Float = measurement.Float;
const TelegrafUDPClient = require('../lib').TelegrafUDPClient;
const TelegrafTCPClient = require('../lib').TelegrafTCPClient;

function connectSendClose() {
    for(let client of [new TelegrafUDPClient(), new TelegrafTCPClient()]) {
        var m1 = new Measurement(
            "metric-name",
            {tag1: "tagval1"},
            {
                integer_field: new Int(10), float_field: new Float(10.1),
                boolean_field: true, string_field: "yoohoo"
            }
        );

        client.connect()
        .then(() => {
            console.log("connected");
            return client.sendMeasurement(m1);
        })
        .then(res => {
            console.log("Success");
            return client.close();
        })
        .then(() => {
            console.log("Done");
        })
        .catch(err => {
            console.error(err);
            console.error(err.stack);
            assert(false, err);
        });
    }
}

connectSendClose();
