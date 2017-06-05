'use strict';

let uuidV4 = require('uuid/v4');

let {
    map, reduce
} = require('bolzano');

let addRecord = (value, x, y) => {
    // clear empty
    clearEmpty(value);

    let startId = uuidV4();
    value.records.push(startId);
    value.recordMap[startId] = {
        left: x,
        top: y,
        value: ''
    };
};

let clearEmpty = (value) => {
    map(value.records, (id) => {
        let record = value.recordMap[id];
        if (!record.value || !record.value.trim()) {
            removeRecord(value, id);
        }
    });
};

let removeRecord = (value, id) => {
    value.records = reduce(value.records, (prev, recordId) => {
        if (id !== recordId) {
            prev.push(recordId);
        }
        return prev;
    }, []);

    delete value.recordMap[id];
};

module.exports = {
    addRecord,
    clearEmpty,
    removeRecord
};
