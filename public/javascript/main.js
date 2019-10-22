$("#chkInternetConnection").click( function() {
    var id = parseInt($(this).val(), 10);
    console.log(id);
    if($(this).is(":checked")) {
        console.log('checkbox checked!');
    } else {
        console.log('checkbox NOT checked!');
    }
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
