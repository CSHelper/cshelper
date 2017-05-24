'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var statisticsCtrlStub = {
  index: 'statisticsCtrl.index',
  show: 'statisticsCtrl.show',
  create: 'statisticsCtrl.create',
  upsert: 'statisticsCtrl.upsert',
  patch: 'statisticsCtrl.patch',
  destroy: 'statisticsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var statisticsIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './statistics.controller': statisticsCtrlStub
});

describe('Statistics API Router:', function() {
  it('should return an express router instance', function() {
    expect(statisticsIndex).to.equal(routerStub);
  });

  describe('GET /api/statistics', function() {
    it('should route to statistics.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'statisticsCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/statistics/:id', function() {
    it('should route to statistics.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'statisticsCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/statistics', function() {
    it('should route to statistics.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'statisticsCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/statistics/:id', function() {
    it('should route to statistics.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'statisticsCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/statistics/:id', function() {
    it('should route to statistics.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'statisticsCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/statistics/:id', function() {
    it('should route to statistics.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'statisticsCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
