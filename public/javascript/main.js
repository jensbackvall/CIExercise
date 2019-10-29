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
            $.ajax({
                type: 'POST', 
                url: '/buy', 
                data: { }, 
                dataType: 'json',
                success: function (data) {
                    var node = document.createElement("p");
                    node.classList.add("popuptext");
                    node.value = "internet";
                    document.getElementById("popupAppend").appendChild(node);
                    console.log(data.thisPurchase);
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
