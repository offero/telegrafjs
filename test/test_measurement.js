'use strict';
const assert = require('assert');
const measurement = require('../lib/measurement');
const Measurement = measurement.Measurement;
const Int = measurement.Int;
const Float = measurement.Float;

function testMeasurementStrings() {
    var m1 = new Measurement(
        "metric-name",
        {tag1: "tagval1"},
        {
            integer_field: new Int(10), float_field: new Float(10.1),
            boolean_field: true, string_field: "yoohoo"
        }
    );

    var generated = m1.toString();

    var expected = 'metric-name,tag1=tagval1'
                   + ' boolean_field=T,float_field=10.1,integer_field=10i,'
                   + 'string_field="yoohoo"'
                   + ' ' + m1.time.toString();

    assert.equal(generated, expected, `generated!=expected:\n${generated}\n${expected}`);

    var m2 = new Measurement(
        'something with=weird,chars',
        {'tag, 1': 'tagval=1'},
        {'string field': 'quote"inside'},
        10000000
    );

    generated = m2.toString();

    expected = 'something\\ with=weird\\,chars,'
               + 'tag\\,\\ 1=tagval\\=1'
               + ' string\\ field="quote\\"inside"'
               + ' 10000000';

    assert.equal(generated, expected, `generated!=expected:\n${generated}\n${expected}`);
}

testMeasurementStrings();
