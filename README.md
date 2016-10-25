# TelegrafJS

A Promise-based TCP/UDP client for sending application metrics
to Telegraf/InfluxDB.

## Install

```bash
npm install --save telegrafjs
```

## Example

```js
const telegraf = require('telegrafjs');
const Measurement = telegraf.Measurement;
const Int = telegraf.Int;
const Float = telegraf.Float;
const TelegrafUDPClient = telegraf.TelegrafUDPClient;
const TelegrafTCPClient = telegraf.TelegrafTCPClient;

let m1 = new Measurement(
    "metric-name",
    { tag1: "tagval1" },
    {
        integer_field: new Int(integer_field),
        float_field: new Float(10.1),
        boolean_field: true,
        string_field: "yoohoo"
    }
);

let client = new TelegrafUDPClient(); // or TelegrafTCPClient()
client.connect()
.then(() => {
    return client.sendMeasurement(m1);
})
.then(() => {
    client.close();
});
```

## Links

 - [Telegraf] (https://docs.influxdata.com/telegraf/v1.0/) Telegraf
 - [InfluxDB] (https://docs.influxdata.com/influxdb/v1.0/) InfluxDB

## License

Apache 2.0
