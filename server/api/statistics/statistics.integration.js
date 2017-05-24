'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newStatistics;

describe('Statistics API:', function() {
  describe('GET /api/statistics', function() {
    var statistics;

    beforeEach(function(done) {
      request(app)
        .get('/api/statistics')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          statistics = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(statistics).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/statistics', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/statistics')
        .send({
          name: 'New Statistics',
          info: 'This is the brand new statistics!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newStatistics = res.body;
          done();
        });
    });

    it('should respond with the newly created statistics', function() {
      expect(newStatistics.name).to.equal('New Statistics');
      expect(newStatistics.info).to.equal('This is the brand new statistics!!!');
    });
  });

  describe('GET /api/statistics/:id', function() {
    var statistics;

    beforeEach(function(done) {
      request(app)
        .get(`/api/statistics/${newStatistics._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          statistics = res.body;
          done();
        });
    });

    afterEach(function() {
      statistics = {};
    });

    it('should respond with the requested statistics', function() {
      expect(statistics.name).to.equal('New Statistics');
      expect(statistics.info).to.equal('This is the brand new statistics!!!');
    });
  });

  describe('PUT /api/statistics/:id', function() {
    var updatedStatistics;

    beforeEach(function(done) {
      request(app)
        .put(`/api/statistics/${newStatistics._id}`)
        .send({
          name: 'Updated Statistics',
          info: 'This is the updated statistics!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedStatistics = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStatistics = {};
    });

    it('should respond with the updated statistics', function() {
      expect(updatedStatistics.name).to.equal('Updated Statistics');
      expect(updatedStatistics.info).to.equal('This is the updated statistics!!!');
    });

    it('should respond with the updated statistics on a subsequent GET', function(done) {
      request(app)
        .get(`/api/statistics/${newStatistics._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let statistics = res.body;

          expect(statistics.name).to.equal('Updated Statistics');
          expect(statistics.info).to.equal('This is the updated statistics!!!');

          done();
        });
    });
  });

  describe('PATCH /api/statistics/:id', function() {
    var patchedStatistics;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/statistics/${newStatistics._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Statistics' },
          { op: 'replace', path: '/info', value: 'This is the patched statistics!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedStatistics = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedStatistics = {};
    });

    it('should respond with the patched statistics', function() {
      expect(patchedStatistics.name).to.equal('Patched Statistics');
      expect(patchedStatistics.info).to.equal('This is the patched statistics!!!');
    });
  });

  describe('DELETE /api/statistics/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/statistics/${newStatistics._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when statistics does not exist', function(done) {
      request(app)
        .delete(`/api/statistics/${newStatistics._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
