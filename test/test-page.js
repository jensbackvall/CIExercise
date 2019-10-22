const expect  = require('chai').expect;
const request = require('request');
const assert = require('assert');

const PurchaseClass = require('../classes/purchase');


describe('Page status test', function() {
    it('Main page status', function(done) {
        request('http://localhost:3030' , function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});

describe('Test setting internet-connection', function() {
    it('Test if the internetconnection boolean is false', function() {
        const thisPurchase = new PurchaseClass(false, 0, [], 0);
        assert.equal(thisPurchase.internetConnection, false);
    });

    it('Test if the internetconnection changes to true', function() {
        const thisPurchase = new PurchaseClass(false, 0, [], 0);
        thisPurchase.setInternetConnection(true);
        assert.equal(thisPurchase.internetConnection, true);
    });

    it('Test if the internetconnection changes the total price to 200', function() {
        const thisPurchase = new PurchaseClass(false, 0, [], 0);
        thisPurchase.setInternetConnection(true);
        assert.equal(thisPurchase.totalPrice, 200);
    });

});
