(function () {
    var qs = function(tag) { return document.querySelector(tag); };
    var obj = {
        urlTxt:     qs('#url_txt'),
        kindRadio:  qs("#kind_radio").elements,
        list:       qs("#distinguish_list"),
        saveBtn:    qs('#save_btn'),
        exportBtn:  qs('#export_btn'),
        importBtn:  qs('#import_btn'),
    };
    var saveKey = 'distinguish_data';
    obj.saveBtn.addEventListener('click',   function(){ check(obj, saveKey) }, false);
    obj.exportBtn.addEventListener('click', function(){ exportFile(obj, saveKey) }, false);
    obj.importBtn.addEventListener('click', function(){ importFile(obj, saveKey) }, false);

    var data = JSON.parse(localStorage.getItem(saveKey));
    if (!data) data= [];
    for (var i = 0; i < data.length; i++) {
        obj.list.innerHTML += '<tr><th>' + data[i].url + '</th><td>' + data[i].kind + '</td></tr>';
    }
})();

function check(obj, saveKey) {
    var checkedValue = null;
    for (var i = 0, len = obj.kindRadio.length; i < len; i++) {
        if (obj.kindRadio[i].checked) {
            checkedValue = obj.kindRadio[i].value;
            break;
        }
    }
    if (!checkedValue) {
        alert('項目が選択されていません。');
        return;
    }
    var data = SaveDataToLocalStorage(
        saveKey,
        {
            url: obj.urlTxt.value,
            kind: checkedValue
        }
    );
    obj.list.innerHTML +=
        '<tr><th>' + data.url + '</th><td>' + data.kind + '</td></tr>';
}

function SaveDataToLocalStorage(saveKey, data) {
    if (!data) return;
    var tmpArr = JSON.parse(localStorage.getItem(saveKey));
    if (!tmpArr) tmpArr = [];
    tmpArr.push(data);
    localStorage.setItem(saveKey, JSON.stringify(tmpArr));
    return data;
}

function exportFile(obj, saveKey) {
    var filename = "distinguish.json";
    $("#export").click(function() {  // 出力ボタンを押した場合は、setBlobUrl関数に値を渡して実行
        setBlobUrl(
            "download",
            JSON.parse(localStorage.getItem('distinguish_data')),
            filename,
        );
    });
}

function importFile(obj, saveKey) {

}

function setBlobUrl(id, content) {
    var blob = new Blob([ content ], { "type" : "application/x-msdownload" });
 // Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
    window.URL = window.URL || window.webkitURL;
    $("#" + id).attr("href", window.URL.createObjectURL(blob));
    $("#" + id).attr("download", "tmp.txt");
}
