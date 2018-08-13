`use strict`;

const {expect} = require(`chai`);
const sendRequest = require(`../utils/sendRequest`);
const logger = require(`../utils/logger.conf`);
const env = require(`../data/env`);
const requests = require(`../data/requests/requests`);
const badRequests = require(`../data/requests/badRequests`);
const Validator = require(`jsonschema`).Validator;
const helper = require(`../utils/helper`);


describe(`Positive tests of ${env.uri}`, () => {
    logger.info(`Start positive tests`);

    requests.map((data) => {
        let response;
        let tab = data.uri.split(`/`)[1];
        const val = new Validator();

        describe(`${data.testName} test`, () => {
            before(async () => {
                logger.info(`Making request to service`);
                try {
                    data.uri = env.uri + data.uri;
                    response = await sendRequest(data);
                } catch (error) {
                    logger.error(`Some error during receiving response`, error);
                }

            });

            it(`Status of response`, () => {
                logger.info(`Checking response status`);
                expect(response.statusCode).to.eql(Object.values(helper.positiveExpCodeAndMessage(data.method))[0].expStatusCode);
            });

            it(`Message of response`, () => {
                logger.info(`Checking response message`);
                expect(response.statusMessage).to.eql(Object.values(helper.positiveExpCodeAndMessage(data.method))[0].expStatusMessage);
            });

            it(`Is response in json format with right form`, () => {
                logger.info(`Checking response is right json`);
                let whatSchemaToUse = '../data/Schems/'+tab+'Schema';
                let schema = require(whatSchemaToUse);
                expect(val.validate(response.body, schema).errors).to.eql([]);
            });

        });

    });
});

describe(`Negative tests of ${env.uri}`, () => {
    logger.info('Start negative tests');

    badRequests.map((data) => {
        let response;
        const val = new Validator();

        describe(`${data.testName} test`, () => {
            before(async () => {
                logger.info('Making request to service');
                try {
                    data.uri = env.uri + data.uri;
                    response = await sendRequest(data);
                } catch (error) {
                    logger.error('Some error during receiving response', error);
                }

            });

            it(`Status of response`, () => {
                logger.info(`Checking response status`);
                expect(response.statusCode).to.eql(Object.values(helper.negativeExpCodeAndMessage(data))[0].expStatusCode);
            });

            it(`Message of response`, () => {
                logger.info(`Checking response message`);
                expect(response.statusMessage).to.eql(Object.values(helper.negativeExpCodeAndMessage(data))[0].expStatusMessage);
            });

            it('Is response body empty', () => {
                logger.info('Checking response body is empty json');
                let schema = require('../data/Schems/emptySchema');
                expect(val.validate(response.body, schema).errors).to.eql([]);
            });

        });

    });
});