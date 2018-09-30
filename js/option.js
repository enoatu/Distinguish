var obj = {
    urlTxt:     document.querySelector('#url_txt'),
    kindRadio : document.querySelector("#kind_radio").elements,
    list :      document.querySelector("#distinguish_list"),
};
document.querySelector('#save').addEventListener('click', function(){ check() }, false);
(function () {
    var data = JSON.parse(localStorage.getItem('distinguish_data'));
    console.log(data);
    if (!data) var data= [];
    for (var i = 0; i < data.length; i++) {
        obj.list.innerHTML +=
            '<tr><th>' + data[i].url + '</th><td>' + data[i].kind + '</td></tr>';
    }
})();
function check() {
    var checkedValue = null;
    for (var i = 0; i < obj.kindRadio.length; i++) {
        if (obj.kindRadio[i].checked) {
            checkedValue = obj.kindRadio[i].value;
            break;
        }
    }
    if (!checkedValue) {
        alert('項目が選択されていません。');
        return;
    }
    SaveDataToLocalStorage(
        {
            url: obj.urlTxt.value,
            kind: checkedValue
        }
    );
}
function SaveDataToLocalStorage(data) {
    if (!data) return;
    //localStorage['title_txt'] = ('title_txt').value;
    var tmpArr = JSON.parse(localStorage.getItem('distinguish_data'));
    if (!tmpArr) var tmpArr = [];
    tmpArr.push(data);
    localStorage.setItem('distinguish_data', JSON.stringify(tmpArr));
    obj.list.innerHTML +=
        '<tr><th>' + data.url + '</th><td>' + data.kind + '</td></tr>';
}

