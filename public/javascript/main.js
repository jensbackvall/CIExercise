var phonelines = 0;
$( document ).ready(function() {
    $("#chkInternetConnection").click(function() {
        var internetConnection = '';
        if($(this).is(":checked")) {
            console.log('checkbox checked!');
            internetConnection = true;
        } else {
            console.log('checkbox NOT checked!');
            internetConnection = false;
        }
            console.log(typeof(internetConnection))
        $.ajax({
            type: 'POST', 
            url: '/checkbox-value', 
            data: { internetconnection: internetConnection }, 
            dataType: 'json',
            success: function (data) { 
                $("#totalpricetext").text("Total price: "+data.totalprice+" DKK");
            }
        });
    });

    $("#txtPhoneLines").on('change',(function() {
        console.log($("#txtPhoneLines").val())
        if (phonelines+1==$("#txtPhoneLines").val()){
            phonelines++;
            $.ajax({
                type: 'POST', 
                url: '/addphoneline', 
                data: { }, 
                dataType: 'json',
                success: function (data) { 
                    $("#totalpricetext").text("Total price: "+data.totalprice+" DKK");
                }
            });
        }else if (phonelines-1==$("#txtPhoneLines").val()){
            phonelines--;
            $.ajax({
                type: 'POST', 
                url: '/subtractphoneline', 
                data: { }, 
                dataType: 'json',
                success: function (data) { 
                    $("#totalpricetext").text("Total price: "+data.totalprice+" DKK");
                }
            });
        }
    }));
});


function add(){
    var e = document.getElementById("txtCellPhones");
    var selected = e.options[e.selectedIndex];
    var node = document.createElement("option");
    node.value = selected.value;
    node.text = selected.text;
    document.getElementById("txtChosenCellPhones").appendChild(node);
    $.ajax({
        type: 'POST', 
        url: '/addcellphone', 
        data: { 'cellphone': node.text }, 
        dataType: 'json',
        success: function (data) { 
            $("#totalpricetext").text("Total price: "+data.totalprice+" DKK");
        }
    });
}

function remove(){
    var e = document.getElementById("txtChosenCellPhones");
    var selected = e.options[e.selectedIndex];
    $.ajax({
        type: 'POST', 
        url: '/removecellphone', 
        data: { 'cellphone': selected.text }, 
        dataType: 'json',
        success: function (data) { 
            $("#totalpricetext").text("Total price: "+data.totalprice+" DKK");
        }
    });
    document.getElementById("txtChosenCellPhones").remove(e.selectedIndex);
}

$( document ).ready(function() {
    //buy
    $("#buyBtn").click(function() {
        if ("Total price: 0 DKK"==$("#totalpricetext").text()){
            document.getElementById("buyPopupNone").style.display = "block";
        }else{
            document.getElementById("buyPopup").style.display = "block";
            $("#popupAppend").html('');
            $.ajax({
                type: 'POST', 
                url: '/buy', 
                data: { }, 
                dataType: 'json',
                success: function (data) {
                    console.log(data.thisPurchase);
                    if (data.thisPurchase.internetConnection){
                        var node = document.createElement("p");
                        node.classList.add("popuptext");
                        var textnode = document.createTextNode("Internet - 200 Dkk"); 
                        node.appendChild(textnode);
                        document.getElementById("popupAppend").appendChild(node);
                    }
                    if (data.thisPurchase.phoneLines != 0){
                        var node = document.createElement("p");
                        node.classList.add("popuptext");
                        var textnode = document.createTextNode(data.thisPurchase.phoneLines+" phonelines - "+(data.thisPurchase.phoneLines*150)+" Dkk"); 
                        node.appendChild(textnode);
                        document.getElementById("popupAppend").appendChild(node);
                    }
                    if (data.thisPurchase.cellPhones.length != 0){
                        data.thisPurchase.cellPhones.forEach(element => {
                            var bill = "";
                            switch(element) {
                                case 'Motorola G99': 
                                    bill = 'Motorola G99 - 800 Dkk';
                                    break;
                                case 'iPhone 99':
                                    bill = 'iPhone - 6000 Dkk';
                                    break;
                                case 'Samsung Galaxy 99':
                                    bill = 'Samsung Galaxy 99 - 1000 Dkk';
                                    break;
                                case 'Sony Xperia 99':
                                    bill += 'Sony Xperia 99 - 900 Dkk';
                                    break;
                                case 'Huawei 99':
                                    bill += 'Huawei 99 - 900 Dkk';
                                    break;
                            }
                            var node = document.createElement("p");
                            node.classList.add("popuptext");
                            var textnode = document.createTextNode(bill); 
                            node.appendChild(textnode);
                            document.getElementById("popupAppend").appendChild(node);
                        });
                    }
                    var node = document.createElement("p");
                            node.classList.add("popuptext");
                            var textnode = document.createTextNode("Total price of "+data.thisPurchase.totalPrice+" Dkk"); 
                            node.appendChild(textnode);
                            document.getElementById("popupAppend").appendChild(node);
                }
            });
        }
      });
    //Close ALL popups 
    $(".closePopup").click(function() {
        document.getElementById("buyPopupNone").style.display = "none";
        document.getElementById("buyPopup").style.display = "none";
    });

    $(".closePopupNone").click(function() {
        document.getElementById("buyPopupNone").style.display = "none";
        document.getElementById("buyPopup").style.display = "none";
    });
});
