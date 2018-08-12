`use strict`;

const { expect } = require(`chai`);
const sendRequest = require(`../utils/sendRequest`);
const logger = require(`../utils/logger.conf`);
const env = require(`../data/env`);
const requests = require(`../data/requests/requests`);
const badRequests = require(`../data/requests/badRequests`);
const Validator = require(`jsonschema`).Validator;


describe(`Positive tests of ${env.uri}`, () => {
    logger.info(`Start positive tests`);

    requests.map((data) => {
        let response;
        let id = parseInt(data.uri.split(`/`)[2], 10);
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
                expect(response.statusCode).to.eql(data.expStatusCode);
            });

            it(`Message of response`, () => {
                logger.info(`Checking response message`);
                expect(response.statusMessage).to.eql(data.expStatusMessage);
            });

            it(`Is response in json format with right form`, () => {
                logger.info(`Checking response is right json`);
                switch (tab) {
                    case "albums": {
                        let schema = require(`../data/Schems/albumSchema`);
                        expect(val.validate(response.body, schema).errors).to.eql([]);
                        break;
                    }
                    case "comments": {
                        let schema = require('../data/Schems/commentSchema');
                        expect(val.validate(response.body, schema).errors).to.eql([]);
                        break;
                    }
                    case "photos": {
                        let schema = require('../data/Schems/photoSchema');
                        expect(val.validate(response.body, schema).errors).to.eql([]);
                        break;
                    }
                    case "posts": {
                        let schema = require('../data/Schems/postSchema');
                        expect(val.validate(response.body, schema).errors).to.eql([]);
                        break;
                    }
                    case "todos": {
                        let schema = require('../data/Schems/todoSchema');
                        expect(val.validate(response.body, schema).errors).to.eql([]);
                        break;
                    }
                    case "users": {
                        let schema = require('../data/Schems/userSchema');
                        expect(val.validate(response.body, schema).errors).to.eql([]);
                        break;
                    }
                    default : {
                        break;
                    }
                }
            });

            switch (data.method) {
                case "GET" :
                case "PUT" :
                case "PATCH": {

                    it(`Verifying all fields in response body`, () => {
                        logger.info(`Checking response has right fields with correct values, by the way checking that response body haven't field that don't need to`);
                        expect(response.body.postId).to.eql(data.expPostId);
                        expect(response.body.albumId).to.eql(data.expAlbumId);
                        expect(response.body.name).to.eql(data.expName);
                        expect(response.body.email).to.eql(data.expEmail);
                        expect(response.body.body).to.eql(data.expBody);
                        expect(response.body.username).to.eql(data.expUsername);
                        expect(response.body.address).to.eql(data.expAddress);
                        expect(response.body.phone).to.eql(data.expPhone);
                        expect(response.body.website).to.eql(data.expWebsite);
                        expect(response.body.company).to.eql(data.expCompany);
                        expect(response.body.complited).to.eql(data.expComplited);
                        expect(response.body.url).to.eql(data.expUrl);
                        expect(response.body.thumbnailUrl).to.eql(data.expThumbnailUrl);
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

                    it('Verifying all fields in response body and check that id is a number', () => {
                        logger.info('Checking response has right fields and id is a number');
                        expect(response.body.postId).to.eql(data.expPostId);
                        expect(response.body.albumId).to.eql(data.expAlbumId);
                        expect(response.body.name).to.eql(data.expName);
                        expect(response.body.email).to.eql(data.expEmail);
                        expect(response.body.body).to.eql(data.expBody);
                        expect(response.body.username).to.eql(data.expUsername);
                        expect(response.body.address).to.eql(data.expAddress);
                        expect(response.body.phone).to.eql(data.expPhone);
                        expect(response.body.website).to.eql(data.expWebsite);
                        expect(response.body.company).to.eql(data.expCompany);
                        expect(response.body.complited).to.eql(data.expComplited);
                        expect(response.body.url).to.eql(data.expUrl);
                        expect(response.body.thumbnailUrl).to.eql(data.expThumbnailUrl);
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
                expect(response.statusCode).to.eql(data.expStatusCode);
            });

            it(`Message of response`, () => {
                logger.info(`Checking response message`);
                expect(response.statusMessage).to.eql(data.expStatusMessage);
            });

            it('Is response body empty', () => {
                logger.info('Checking response body is empty json');
                let schema = require('../data/Schems/emptySchema');
                expect(val.validate(response.body, schema).errors).to.eql([]);
            });

        });

    });
});