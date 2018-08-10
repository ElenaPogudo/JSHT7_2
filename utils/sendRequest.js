'use strict';

const request = require('request-promise-native');

function sendRestRequestWithHeader(opts) {
    let options = {
        uri: opts.uri,
        method: opts.method,
        body: opts.body,
        headers: opts.header,
        json: true,
        resolveWithFullResponse: true,
        simple: false
    };

    return request(options).then((response) => {
        return response;
    });

}

module.exports = sendRestRequestWithHeader;

false;