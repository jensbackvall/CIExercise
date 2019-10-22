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

    addCellPhone(modelName) {
        this.cellPhones.push(modelName)
        price = 0
        switch(modelName) {
            case 'Motorola G99': price = 800;
                break;
            case 'iPhone 99': price = 6000;
                break;
            case 'Samsung Galaxy 99': price = 1000;
                break;
            case 'Sony Xperia 99': price = 900;
                break;
            case 'Huawei 99': price = 900;
                break;
            default: this.cellPhones.pop()                   
        }
        return this.totalPrice += price        
    }

    removeCellPhone(modelName) {
        const index = this.cellPhones.indexOf(modelName)
        if(index === -1) {
            return this.totalPrice
        }
        this.cellPhones.splice(index,-1)

        price = 0
        switch(modelName) {
            case 'Motorola G99': price = 800;
                break;
            case 'iPhone 99': price = 6000;
                break;
            case 'Samsung Galaxy 99': price = 1000;
                break;
            case 'Sony Xperia 99': price = 900;
                break;
            case 'Huawei 99': price = 900;
                break;
        }
        return this.totalPrice -= price        
    }

    checkout() {
        bill = 'Monthly bill \n'
        monthSubTotal = 0
        if(this.internetConnection === true) {
            monthSubTotal += 200
            bill += '\n Internet connection: ' + + ',- Dkk'
        }
        if(this.phoneLines > 0) {
            monthSubTotal += this.phoneLines * 150
            bill += '\n ' + String(this.phoneLines) + ' Phone line(s): ' 
                            + String(this.phoneLines * 150) + ',- Dkk'
        }
        bill += '\n Monthly Total: ' + String(monthSubTotal) + ',- Dkk'

        for (let i = 0; i < this.cellPhones; i++){
            switch(this.cellPhones[i]) {
                case 'Motorola G99': 
                    bill += '\n Motorola G99: 800,- Dkk';
                    break;
                case 'iPhone 99':
                    bill += '\n iPhone: 6000,- Dkk';
                    break;
                case 'Samsung Galaxy 99':
                    bill += '\n Samsung Galaxy 99: 1000,- Dkk';
                    break;
                case 'Sony Xperia 99':
                    bill += '\n Sony Xperia 99: 900,- Dkk';
                    break;
                case 'Huawei 99':
                    bill += '\n Huawei 99: 900,- Dkk';
                    break;
        }
    }
        bill += '\n Total: ' + this.totalPrice + ',- Dkk'
        return bill;
    }
}

module.exports = PurchaseClass;