const expect  = require('chai').expect;
const request = require('request');
const assert = require('assert');

const PurchaseClass = require('../classes/purchase');

/*
describe('Page status test', function() {
    it('Main page status', function(done) {
        request('http://localhost:3030' , function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});
*/
describe('Test setting internet-connection', function() {
    it('Internetconnection was true change to false', function() {
        const thisPurchase = new PurchaseClass(true, 0, [], 400);
        thisPurchase.setInternetConnection('true')
        assert.equal(thisPurchase.internetConnection, false);
    });

    it('Internetconnection was false, change to true', function() {
        const thisPurchase = new PurchaseClass(false, 0, [], 0);
        thisPurchase.setInternetConnection('true');
        assert.equal(thisPurchase.internetConnection, true);
    });

    it('Internetconnection set to true, add 200 total price when total price is 0', function() {
        const thisPurchase = new PurchaseClass(false, 0, [], 0);
        thisPurchase.setInternetConnection('true');
        assert.equal(thisPurchase.totalPrice, 200);
    });

    it('Internetconnection was true, set to false, subtract 200 to total price when total price is 200', function() {
        const thisPurchase = new PurchaseClass(true, 0, [], 200);
        thisPurchase.setInternetConnection('false');
        assert.equal(thisPurchase.totalPrice, 0);
    });

    it('Internetconnection was true, set to false, do not subtract 200 to total price when total price is 0', function() {
        const thisPurchase = new PurchaseClass(true, 0, [], 0);
        expect(thisPurchase.setInternetConnection.bind(thisPurchase,'false')).to.throw("ABORT! THIS SHOULD NEVER HAPPEN")
    });

});

describe('Test setting phone lines', function() {
    // Upper boundary tests
    it('Adding the 8th phone line', function() {
        const thisPurchase = new PurchaseClass(false, 7, [], 0);
        thisPurchase.addPhoneLine()
        assert.equal(thisPurchase.phoneLines, 8)
    })
    it('Do not add the 9th phone line', function() {
        const thisPurchase = new PurchaseClass(false, 8, [], 0);
        thisPurchase.addPhoneLine()
        assert.equal(thisPurchase.phoneLines, 8)
    })

    // Lower boundary tests
    it('Removing 1 phone line, when there is only 1', function() {
        const thisPurchase = new PurchaseClass(false, 1, [], 0);
        thisPurchase.subtractPhoneLine()
        assert.equal(thisPurchase.phoneLines, 0)
    })
    it('Try to remove 1 phone line, when there is 0', function() {
        const thisPurchase = new PurchaseClass(false, 0, [], 0);
        thisPurchase.subtractPhoneLine()
        assert.equal(thisPurchase.phoneLines, 0)
    })
})

describe('Test adding and removing cellphone functions', function () {
    // Lower boundary tests?
    it('Adding an iPhone 99 when array is empty', function() {
        phoneModel = 'iPhone 99'
        const thisPurchase = new PurchaseClass(false, 0, [], 0)
        thisPurchase.addCellPhone(phoneModel)
        assert.equal(thisPurchase.cellPhones[0], phoneModel)
    })
    it('Adding an unknown phone when array is empty', function() {
        phoneModel = 'iPhone 99999'
        const thisPurchase = new PurchaseClass(false, 0, [], 0)
        thisPurchase.addCellPhone(phoneModel)
        assert.equal(thisPurchase.cellPhones.indexOf(phoneModel), -1)
    })
    it('Remove iPhone 99 when array is empty', function() {
        phoneModel = 'iPhone 99'
        const thisPurchase = new PurchaseClass(false, 0, [], 0)
        thisPurchase.removeCellPhone(phoneModel)
        //assert.equal(thisPurchase.cellPhones.length, 0)
        assert.deepEqual(thisPurchase.cellPhones, [])
    })
    it('Try removing iPhone 99 when array only contains Huawei 99', function() {
        phoneModelToRemove = 'iPhone 99'
        phoneModelAdded = 'Huawei 99'
        const thisPurchase = new PurchaseClass(false, 0, [phoneModelAdded], 0)
        thisPurchase.removeCellPhone(phoneModelToRemove)
        assert.equal(thisPurchase.cellPhones[0], phoneModelAdded)
    })

    it('Adding all known phone models', function() {
        phoneModelToAdd = ['Motorola G99', 'iPhone 99', 'Samsung Galaxy 99', 'Sony Xperia 99', 'Huawei 99']
        const thisPurchase = new PurchaseClass(false, 0, [], 0)
        for(let i = 0; i < phoneModelToAdd.length; i++){
            thisPurchase.addCellPhone(phoneModelToAdd[i])
        }
        assert.deepEqual(thisPurchase.cellPhones, phoneModelToAdd)     
    })

    it('Adding multiple copies of same phone models', function() {
        phoneModelToAdd = ['Motorola G99', 'iPhone 99', 'Samsung Galaxy 99', 'Sony Xperia 99', 'Huawei 99']
        const thisPurchase = new PurchaseClass(false, 0, [], 0)
        for(let j = 0; j < 2; j++){
            for(let i = 0; i < phoneModelToAdd.length; i++){
                thisPurchase.addCellPhone(phoneModelToAdd[i])
            }
        }
        assert.deepEqual(thisPurchase.cellPhones, phoneModelToAdd.concat(phoneModelToAdd))     
    })

})
describe('Testing the checkout function', function() {
    it('Check if string contains \'Internet connection\'', function() {
        const thisPurchase = new PurchaseClass(true, 0, [], 0)
        assert.equal(thisPurchase.checkout().includes('Internet connection'), true)
    });
});