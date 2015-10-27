/**
 * Created by 204071207 on 9/10/15.
 */


var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var commonUtils = require('../utils/commonUtil.js');
var api = supertest('http://localhost:5985/');
//var api = supertest('http://nginx-sync-gateway-admin.grc-apps.svc.ice.ge.com/');

var docId = 'qa-doc-'+commonUtils.generateDocId();
var userId = 'user1';


describe('Command created on server couchdb with the request to be processed', function() {


    it('Create new command should return a 201 response', function(done) {

        console.log('Sending PUT command: '+ docId);

        api.put('predixgo/'+docId)
            .set('Content-Type','application/json')
            .send(
            {
                "type": "command"
                , "~userid": userId
                , "~status": "pending"

                , "request": {
                "uri": "/service1/"+docId
                , "method": "PUT"
                , "headers": {}
                , "body":
                    {
                        "a": 1,
                        "b": 2
                    }
                }
            }        )
            .expect(201)
            .end(function(err, res){

                console.log('Send command response: ',res.body);
                expect(res.body.id).to.equal(docId);
                expect(res.body.ok).to.equal(true);
                expect(res.body).to.have.property('rev');

                done();
            });

    });

    it('Command processed by microservice...', function(done) {

        // give time to process PUT request
        this.timeout(15000);
        setTimeout(done, 15000);
        commonUtils.sleep(10000);

        console.log('Checking status of command: ' + docId);

            api.get('predixgo/' + docId)

                .end(function (err, res) {

                    console.log('Reading response: ', res.body);

                    expect(res.body).to.have.property("~status").to.equal("success");
                    expect(res.body).to.have.property("response");

                    expect(res.body.response.status).to.equal(200);
                    done();
                });
    });

});