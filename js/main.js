chrome.runtime.sendMessage({method: 'getItem', key: 'distinguish_data'}, function (response) {
    if (!response) return;
    init(response.data);
});

function init (data) {
    if (!data) var data = [];
    var current_url = location.href;
    for (var i = 0; i < data.length; i++) {
        if(!current_url.indexOf(data[i].url)){
            displayBox(data[i]);
            break;
        }
    }
}

function displayBox(data) {
    $('body').append('<div id="distinguish_display_box"><p>' + data.kind + '</p></div>');
    $("#distinguish_display_box").draggable({
        containment: 'body',
        axis: 'y'
    });
}


