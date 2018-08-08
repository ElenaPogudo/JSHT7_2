'use strict';

const {expect} = require('chai');
const sendRequest = require('../utils/sendRequest');
const logger = require('../utils/logger.conf');
const env = require('../data/env');
const requests = require('../data/requests');
const Validator = require('jsonschema').Validator;


describe(`Positive tests of ${env.uri}`, () => {
    logger.info('Start positive tests');

    requests.map((data) => {
        let response;
        let id = parseInt(data.uri.split('/')[2], 10);
        const val = new Validator();
        let schema = data.responseSchema;

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

            it('Status and message of response', () => {
                logger.info('Checking response status and message');
                expect(response.statusCode).to.eql(data.expStatusCode);
                expect(response.statusMessage).to.eql(data.expStatusMessage);
            });

            it('Is response in json format', () => {
                logger.info('Checking response is right json');
                expect(val.validate(response.body, schema).errors).to.eql([]);
            });

            switch (data.method) {
                case "GET" :
                case "PUT" :
                case "PATCH": {

                    it('Verifying id, userId and title', () => {
                        expect(response.body.id).to.eql(id);
                        expect(response.body.userId).to.eql(data.expUserId);
                        expect(response.body.title).to.eql(data.expTitle);
                    });

                    break;
                }
                default:
                case "DELETE": {

                    break;
                }
                case "POST": {

                    it('Verifying userId, title and check that id is a number', () => {
                        expect(response.body.id).to.be.a('number');
                        expect(response.body.userId).to.eql(data.expUserId);
                        expect(response.body.title).to.eql(data.expTitle);
                    });

                    break;
                }
            }

        });

    });
});
