var obj = {
    urlTxt:     document.querySelector('#url_txt'),
    kindRadio : document.querySelector("#kind_radio").elements,
    list :      document.querySelector("#distinguish_list"),
};
document.querySelector('#save').addEventListener('click', function(){ check() }, false);
init();

function init() {
    var data = JSON.parse(localStorage.getItem('distinguish_session'));
    console.log(data);
    if (!data) var data= [];
    for (var i = 0; i < data.length; i++) {
        obj.list.innerHTML +=
            '<th><tr>' + data[i].url + '</tr><tr>' + data[i].kind + '</tr></th>';
    }
}
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
    console.log(obj.urlTxt.value);
    console.log(checkedValue);
}
function SaveDataToLocalStorage(data) {
    if (!data) return;
    //localStorage['title_txt'] = ('title_txt').value;
    var tmpArr = JSON.parse(localStorage.getItem('distinguish_session'));
    if (!tmpArr) var tmpArr = [];
    tmpArr.push(data);
    alert(tmpArr);
    localStorage.setItem('distinguish_session', JSON.stringify(tmpArr));
    obj.list.innerHTML +=
        '<th><tr>' + data.url + '</tr><tr>' + data.kind + '</tr></th>';
}

