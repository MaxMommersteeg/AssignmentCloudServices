'use strict';

var expect = require('chai').expect;
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

var app = require('../app');
var showData = require('./init');

describe('Show routes', function() {
    describe('#Get requests', function() {

        it('should get show based on imdbId', function(done) {
            request(app)
                .post('/shows')
                .send(showData.show)
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                });

            request(app)
                .get('/shows/tt0903747')
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                    expect(res.body.title).to.equal('Breaking Bad');
                    done();
                });
        });

        it('should not get show based on not existing imdbId', function(done) {

            request(app)
                .get('/shows/tt012345678')
                .expect(404)
                .end(function(err, res) {
                    if(err) return done(err);
                    expect(res.body.msg).to.equal('imdbId does not exist');
                    done();
                });
        });

        it('should give 1 shows back in paginate', function(done) {

            request(app)
                .post('/shows')
                .send(showData.show)
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                });

            request(app)
                .get('/shows/paginate/50/1')
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body).to.have.lengthOf(1);
                    done();
                });
        });

        it('should give episodes of shows back', function(done) {
            request(app)
                .post('/shows')
                .send(showData.show)
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                });

            request(app)
                .get('/shows/tt0903747/episodes')
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                    expect(res.body.episodes).to.be.instanceof(Array);
                    expect(res.body.episodes).to.have.lengthOf(62);
                    done();
                });
        });
    });
});