//console.log("");
//var url = location.href;
//Object.keys(obj).forEach(function (key) {
//    if (url == obj[key]) {
//    var checked = "";
//    var kind = document.getElementsByName("kind");
//    for (let i = 0; i < kind.length; i++) {
//        if(kind[i].checked){
//            checked = kind[i].value;
//            break;
//        }
//    }
//    console.log(key + " : " + obj[key]);
//    console.log("checked " + checked);
//        return;
//    }
//});
//
$(function() {
    $('body').append('<div id="distinguish_display_box"><p>本 番</p></div>');
    $("#distinguish_display_box").draggable({
        containment: 'body',
        axis: 'y'
    });
});


