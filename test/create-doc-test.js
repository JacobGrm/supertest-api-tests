/**
 * Created by 204071207 on 9/10/15.
 */


var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var commonUtils = require('../utils/commonUtil.js');

//var api = supertest('http://nginx-sync-gateway-admin.grc-apps.svc.ice.ge.com/');
var api = supertest('http://localhost:5985/');

var docId = 'qa-doc-'+commonUtils.generateDocId();


describe('User document creation tests', function() {


    it('Create new document should return a 201 response', function(done) {

        console.log('Creating new document: '+ docId);

        api.put('predixgo/'+docId)
            .set('Content-Type','application/json')
            .send({
                "key": docId
            })
            .expect(201)
            .end(function(err, res){

                console.log('Create document response: ',res.body);
                expect(res.body.id).to.equal(docId);
                expect(res.body.ok).to.equal(true);
                expect(res.body).to.have.property('rev');
                done();
            });

    });


    it('Attempt to create duplicate document should return a 409 response', function(done) {

        console.log('Attempt to create duplicate document: '+ docId);

        api.put('predixgo/'+docId)
            .set('Content-Type','application/json')
            .send({
                "key": docId
            })
            .expect(409)
            .end(function(err, res){

                console.log('Create duplicate response: ',res.body);

                expect(res.body.error).to.equal('conflict');
                expect(res.body.reason).to.equal('Document exists');
                done();
            });

    });


});