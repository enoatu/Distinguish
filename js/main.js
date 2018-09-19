$(function() {
    $('body').append('<div id="distinguish_display_box"><p>本 番</p></div>');
        // #div1繧壇rag蜿ｯ閭ｽ縺ｫ
    $("#distinguish_display_box").draggable({
        containment: 'body',
        axis: 'y'
    });
});

