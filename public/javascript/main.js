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
                console.log("This internet connection value has been sent to backend: ", data.totalprice);
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
                    console.log("This internet connection value has been sent to backend: ", data.totalprice);
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
                    console.log("This internet connection value has been sent to backend: ", data.totalprice);
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
}

function remove(){
    var e = document.getElementById("txtChosenCellPhones");
    document.getElementById("txtChosenCellPhones").remove(e.selectedIndex); 
}

$( document ).ready(function() {
    //buy
    $("#buyBtn").click(function() {
        document.getElementById("buyPopup").style.display = "block";
      });
    //Close ALL popups 
    $(".closePopup").click(function() {
        document.getElementById("buyPopupNone").style.display = "none";
        document.getElementById("buyPopup").style.display = "none";
    });

    $("#closePopupNone").click(function() {
        document.getElementById("buyPopupNone").style.display = "none";
        document.getElementById("buyPopup").style.display = "none";
    });
});
