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
const TelegrafClient = require('./client').TelegrafClient;
const dgram = require('dgram');
const assert = require('assert');

class TelegrafUDPClient extends TelegrafClient {
    constructor(options) {
        super(options);
        options = options || {};
        this.host = options.host || '127.0.0.1';
        this.port = options.port || 8092;
        this.protocol = options.protocol || 'udp4';
        assert(this.Promise !== undefined);
    }

    _connect(callback) {
        this.socket = dgram.createSocket(this.protocol);
        callback(null, this);
    }

    _send(data, callback) {
        this.socket.send(data, 0, data.length, this.port, this.host, callback);
    }

    _close(callback) {
        this.socket.close(callback);
    }
}

module.exports = {
    TelegrafUDPClient
};
