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

function nowNano() {
    let time = process.hrtime();
    let time_ns = (time[0] * 1e9) + time[1];
    return time_ns;
}

const comma = ',';
const comma_re = /,/g;
const escaped_comma = '\\,';
const space = ' ';
const space_re = / /g;
const escaped_space = '\\ ';
const escape = '\\';
const equals_re = /=/g;
const escaped_equals = '\\=';
const single_slash_re = /\\/g;
const underscore = '_';
const quote_re = /"/g;
const escaped_quote = '\\"';

function formatMeasurementName(s) {
    s = s.replace(comma_re, escaped_comma);
    s = s.replace(space_re, escaped_space);
    return s;
}

function formatTag(s) {
    s = s.replace(single_slash_re, underscore);
    s = s.replace(comma_re, escaped_comma);
    s = s.replace(equals_re, escaped_equals);
    s = s.replace(space_re, escaped_space);
    return s;
}

function isInteger(n) {
   return n % 1 === 0;
}

class Type {
    constructor() {}
}

class Int extends Type {
    constructor(v) {
        super();
        this.v = v;
    }
    toString() {
        return `${this.v}i`;
    }
}

class Float extends Type {
    constructor(v) {
        super();
        this.v = v;
    }
    toString() {
        return `${this.v}`;
    }
}

function formatFieldValue(v) {
    if(v instanceof Type) {
        return v.toString();
    }

    const typeofv = typeof(v);

    if(typeofv === 'number') {
        return `${v}`;
    }

    if(typeofv === 'string') {
        v = v.replace(quote_re, escaped_quote);
        return `"${v}"`;
    }

    if(typeofv === 'boolean') {
        return v && 'T' || 'F';
    }

    throw new Error(`Invalid field. value: ${v} type: ${typeof(v)}`);
}

function formatTags(tags) {
    let tagValues = [];
    for(let k of Object.keys(tags).sort()) {
        tagValues.push(`${formatTag(k)}=${formatTag(tags[k])}`);
    }
    return tagValues.join(',');
}

function formatFields(fields) {
    let fieldValues = [];
    for(let k of Object.keys(fields).sort()) {
        fieldValues.push(`${formatTag(k)}=${formatFieldValue(fields[k])}`);
    }
    return fieldValues.join(',');
}

class Measurement {
    constructor(name, tags, fields, time) {
        this.name = name;
        this.tags = tags || {};
        this.fields = fields || {};
        this.time = time || nowNano();
    }

    toString() {
        let elements = [];
        let element1 = formatMeasurementName(this.name);
        if(Object.keys(this.tags).length > 0) {
            element1 += `,${formatTags(this.tags)}`;
        }
        elements.push(element1);
        let element2 = formatFields(this.fields);
        let element3 = this.time && this.time.toString();
        return [element1, element2, element3].join(' ');
    }
}

module.exports = {
    Measurement,
    formatMeasurementName,
    formatTag,
    formatFieldValue,
    Int,
    Float,
    nowNano
};
