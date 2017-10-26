var app = require('../server');
var request = require('supertest');
var Client = require('../clientModel');

after(function(done) {
  Client.findOneAndRemove({"client": "android", "version": "7", "key": "font-size", "value": "12"}, function(err, client) {
    if (err) {
      console.log(err);
    }
    done();
  });
});

describe('unit test for routes', function() {

  after(function(done){
    done();
  });

  describe('create post test', function() {
  	it('should add android client without problem', function(done) {
      request(app)
        .post('/config')
        .set('Accept', 'application/json')
        .send({"client": "android", "version": "7", "key": "font-size", "value": "12"})
        .expect(201, {}, done);
    });
  });

  describe('create get test', function() {
    it('should get android client without problem', function(done) {
      request(app)
      .get('/config/android/7')
      .set('Accept', 'application/json')
      .expect(200,{
          'font-size': '12',
        }, done);
    });
  });

});
