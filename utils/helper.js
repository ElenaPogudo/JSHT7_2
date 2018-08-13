'use strict';

function positiveExpCodeAndMessage(method) {
    if (method === "POST"){
        return require('../data/expects/201Created');
    }
    else{
        return require('../data/expects/200OK');
    }
}


function negativeExpCodeAndMessage(request) {
    if (request.testName.indexOf('Wrong uri request')===0){
        return require('../data/expects/404NotFound');
    }
    else if(request.testName.indexOf('Wrong body')===0){
        return require('../data/expects/400BadRequest');
    }
    else{
            return require('../data/expects/405NotAllowed');
    }
}

module.exports.positiveExpCodeAndMessage = positiveExpCodeAndMessage;
module.exports.negativeExpCodeAndMessage = negativeExpCodeAndMessage;
