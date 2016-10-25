'use strict';

class TelegrafClient {
    constructor(options) {
        options = options || {};
        this.Promise = options.Promise || Promise;
        this.connected = false;
    }

    connect() {
        if(this.connected) {
            return this.Promise.resolve(this);
        }

        let success, fail;
        let p = new this.Promise((resolve, reject) => {
            success = resolve;
            fail = reject;
        });

        let callback = (err, res) => {
            if(err) {
                this.connected = false;
                return fail(err);
            }
            this.connected = true;
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
            this.connected = false;
            return success(res);
        };

        this._close(callback);
        return p;
    }
}

module.exports = {
    TelegrafClient
};
