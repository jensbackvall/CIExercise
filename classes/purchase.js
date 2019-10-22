class PurchaseClass {

    constructor(internetConnection, phoneLines, cellPhones, totalPrice) {
        this.internetConnection = internetConnection;
        this.phoneLines = phoneLines;
        this.cellPhones = cellPhones;
        this.totalPrice = totalPrice;
    }

    // Set the internetconnection to true or false. There can be only one. The price is 200
    setInternetConnection(yesNo) {
        if (yesNo) {
            this.totalPrice += 200;
        } else {
            this.totalPrice -= 200;
        }
        this.internetConnection = yesNo;
        return this.totalPrice;
    }

    // add a phone line. Each phone line costs 150. There can be only 0-8 lines, no more or less
    addPhoneLine() {
        this.phoneLines += 1;
        if (this.phoneLines > 8) {
            this.phoneLines = 8;
        } else {
            this.totalPrice += 150;
        }
        return this.totalPrice;
    }

    // subtract a phone line. Each phone line costs 150. There can be only 0-8 lines, no more or less
    subtractPhoneLine() {
        this.phoneLines -= 1;
        if (this.phoneLines < 0) {
            this.phoneLines = 0;
        } else {
            this.totalPrice -= 150;
        }
        return this.totalPrice;
    }

}

module.exports = PurchaseClass;
