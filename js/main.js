chrome.runtime.sendMessage({method: 'getItem', key: 'distinguish_data'}, function (response) {
    if (!response) return;
    init(response.data);
});

function init (data) {
    if (!data) var data = [];
    var current_url = location.href;
    for (var i = 0, len = data.length; i < len; i++) {
        if (!current_url.indexOf(data[i].url)) {
            displayBox(data[i]);
            break;
        }
    }
}

function displayBox(data) {
    var bg = (typeof data.bgColor ==='undefined') ? '#F00' : data.bgColor;
    $('body').append(
        "<div id='distinguish_display_box' style = 'background-color: " + bg + "'><p>" + data.kind + "</p></div>"
    );
    $("#distinguish_display_box").draggable({
        containment: 'body',
        axis: 'y'
    });
}


