var chai = require('chai');

var should = chai.should();

var Followup = require("../functions/ProyectoServices_Followup");

describe('Followup', () => {

  before(function (done) {
    done()
  });

  after(function (done) {
    done();
  });

    it('it check all pending', function(done){
      Followup.handler({},{},function(err,res){
        done();
      })

    });

});
