'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var request = require('supertest');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var config = require('../config/database');

var app = require('../app');
before(function(done) {
    mongoose.connection.close(function() {
        console.log('Closed'); // Also. always shows in console
        mongoose.connect(config.databaseTest, function(err) {
            if (err) throw err;
        });
        mockgoose(mongoose);
        done();
    });
});

after(function(done) {
    console.log('Closing'); // Shows in console (always)
    mongoose.connection.close(function() {
        console.log('Closed'); // Also. always shows in console
        done()
    })
});

afterEach(function(done) {
    mockgoose.reset('users');
    done();
});

describe('User routes', function() {
    describe('#signup', function () {

        it('should create a user', function (done) {
            if ( mongoose.isMocked === true ) {
                console.log("Jeej");
            }
            request(app)
                .post('/user/signup')
                .send({username: 'testUnit', password: 'testUnit'})
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(err).to.equal(null);
                    done();
                });
        });

        it('should not create two times that user', function (done) {
            request(app)
                .post('/user/signup')
                .send({username: 'testUnit', password: 'testUnit'})
                //Lil hack
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    request(app)
                        .post('/user/signup')
                        .send({username: 'testUnit', password: 'testUnit'})
                        .expect(500)
                        .end(function (err, res) {
                            assert.isNotNull(err);
                            done();
                        });
                });
        });
    });

    describe('#authenticate', function () {

        beforeEach(function (done) {
            //Create the user
            request(app)
                .post('/user/signup')
                .send({username: 'testUnit', password: 'testUnit'})
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should authenticate the user successful', function (done) {
            request(app)
                .post('/user/authenticate')
                .send({username: 'testUnit', password: 'testUnit'})
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(err).to.equal(null);
                    expect(res.body.success).to.equal(true);
                    expect(res.body.token).that.is.a('string');
                    done();
                });
        });

        it('should authenticate the user unsuccessful with unrecognisable username', function (done) {
            request(app)
                .post('/user/authenticate')
                .send({username: 'testUserDoesntExist', password: 'testPasswordAlsoDoesntExist'})
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(err).to.equal(null);
                    expect(res.body.success).to.equal(false);
                    expect(res.body.msg).to.equal('Authentication failed. User not found.');
                    done();
                });
        });

        it('should authenticate the user unsuccessful with unrecognisable username', function (done) {
            request(app)
                .post('/user/authenticate')
                .send({username: 'testUserDoesntExist', password: 'testPasswordAlsoDoesntExist'})
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(err).to.equal(null);
                    expect(res.body.success).to.equal(false);
                    expect(res.body.msg).to.equal('Authentication failed. User not found.');
                    done();
                });
        });

        it('should authenticate the user unsuccessful with wrong password', function (done) {
            request(app)
                .post('/user/authenticate')
                .send({username: 'testUnit', password: 'testUnit2'})
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(err).to.equal(null);
                    expect(res.body.success).to.equal(false);
                    expect(res.body.msg).to.equal('Authentication failed. Wrong password.');
                    done();
                });
        });
    });
});