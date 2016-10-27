'use strict';

class ConsoleLogger {
    constructor() {
        this.log = console.log;
        this.debug = console.log;
        this.error = console.error;
        this.info = console.info;
        this.warn = console.warn;
    }
}

class TelegrafClient {
    constructor(options) {
        options = options || {};
        this.Promise = options.Promise || Promise;
        this.logger = options.logger || new ConsoleLogger();
    }

    connected() {
        throw new Error("This method must be overridden");
    }

    connect() {
        if(this.connected()) {
            return this.Promise.resolve(this);
        }

        let success, fail;
        let p = new this.Promise((resolve, reject) => {
            success = resolve;
            fail = reject;
        });

        let callback = (err, res) => {
            if(err) {
                return fail(err);
            }
            return success(res);
        };

        this._connect(callback);
        return p;
    }

    sendMeasurement(measurement) {
        let success, fail;
        let p = new this.Promise((resolve, reject) => {
            success = resolve;
            fail = reject;
        });

        let callback = (err, res) => {
            if(err) {
                return fail(err);
            }
            return success(res);
        };

        return this.connect()
        .then(() => {
            const data = new Buffer(measurement.toString() + this.delim);
            this._send(data, callback);
            return p;
        });
    }

    close() {
        let success, fail;
        let p = new this.Promise((resolve, reject) => {
            success = resolve;
            fail = reject;
        });

        let callback = (err, res) => {
            if(err) {
                return fail(err);
            }
            return success(res);
        };

        this._close(callback);
        return p;
    }
}

module.exports = {
    TelegrafClient
};
