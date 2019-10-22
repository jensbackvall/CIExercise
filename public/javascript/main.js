$( document ).ready(function() {
    $("#chkInternetConnection").click(function() {
        var internetConnection = false;
        if($(this).is(":checked")) {
            console.log('checkbox checked!');
            internetConnection = true;
        } else {
            console.log('checkbox NOT checked!');
            internetConnection = false;
        }
        $.ajax({
            type: 'POST', 
            url: '/checkbox-value', 
            data: { internetconnection: internetConnection }, 
            dataType: 'json',
            success: function (data) { 
                console.log("This internet connection value has been sent to backend: ", data);
            }
        });
    });
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
    var selected = e.options[e.selectedIndex];
    document.getElementById("txtChosenCellPhones").remove(selected); 
}   
