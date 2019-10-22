$("#chkInternetConnection").click( function() {
    var id = parseInt($(this).val(), 10);
    console.log(id);
    if($(this).is(":checked")) {
        console.log('checkbox checked!');
    } else {
        console.log('checkbox NOT checked!');
    }
});

