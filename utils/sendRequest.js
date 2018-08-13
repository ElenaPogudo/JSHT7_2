'use strict';

const request = require('request-promise-native');

function sendRestRequestWithHeader(opts) {
    let options = {
        uri: opts.uri,
        method: opts.method,
        body: opts.body,
        headers:[ {
            "User-Agent": "Request-Promise"
        }],
        json: true,
        resolveWithFullResponse: true,
        simple: false
    };

    return request(options).then((response) => {
        return response;
    });

}

module.exports = sendRestRequestWithHeader;
