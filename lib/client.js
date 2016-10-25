'use strict';

class TelegrafClient {
    constructor(options) {
        options = options || {};
        this.Promise = options.Promise || Promise;
    }

    connect() {
        let success, fail;
        let p = new this.Promise((resolve, reject) => {
            success = resolve;
            fail = reject;
        });

        let callback = (err, res) => {
            if(err) { return fail(err); }
            return success(res);
        };

        this._connect(callback);
        return p;
    }

    sendMeasurement(measurement) {
        if(this.socket === undefined) {
            throw new Error("Not connected");
        }

        let success, fail;
        let p = new this.Promise((resolve, reject) => {
            success = resolve;
            fail = reject;
        });

        let callback = (err, res) => {
            if(err) { return fail(err); }
            return success(res);
        };

        const data = new Buffer(measurement.toString() + '\n');

        this._send(data, callback);
        return p;
    }

    close() {
        let success, fail;
        let p = new this.Promise((resolve, reject) => {
            success = resolve;
            fail = reject;
        });

        let callback = (err, res) => {
            if(err) { return fail(err); }
            return success(res);
        };

        this._close(callback);
        return p;
    }
}

module.exports = {
    TelegrafClient
};
