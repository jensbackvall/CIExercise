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