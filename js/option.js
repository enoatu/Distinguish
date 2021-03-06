(function () {
    var qs = function(tag) { return document.querySelector(tag); };
    var obj = {
        urlTxt:     qs('#url_txt'),
        kindRadio:  qs("#kind_radio").elements,
        list:       qs("#distinguish_list"),
        saveBtn:    qs('#save_btn'),
        exportBtn:  qs('#export_btn'),
        importBtn:  qs('#import_btn'),
        deleteBtn:  qs('#delete_btn'),
    };
    var saveKey = 'distinguish_data';
    obj.saveBtn.addEventListener('click',   function(){ check(obj, saveKey) }, false);
    obj.exportBtn.addEventListener('click', function(){ exportFile(obj, saveKey) }, false);
    obj.importBtn.addEventListener('click', function(){ importFile(obj, saveKey) }, false);
    obj.deleteBtn.addEventListener('click', function(){ delete_list(obj, saveKey) }, false);

    var data = JSON.parse(localStorage.getItem(saveKey));
    if (!data) data= [];
    for (var i = 0; i < data.length; i++) {
        obj.list.innerHTML += '<tr><td><input type="checkBox" name="check[]" class="checkbox"></td><th>'
            + data[i].url + '</th><td style="background-color:' + pickColor(data[i].kind) + '" >' + data[i].kind + '</td></tr>';
    }
    listMonitor(obj);
})();

function listMonitor(obj) {
    //popup
    var targets = document.getElementsByClassName('checkbox');
    for(var i = 0; i < targets.length; i++){
        targets[i].addEventListener('click', function () {
            show();
        }, false);
    }
    var flag = false;
    var checkbox = document.list.elements['check[]'];
    function show() {
        var len = checkbox.length;
        if (!len) {
           flag = checkbox.checked ? true : false;
        }
        for (i = 0; i < len; i++) {
           flag = checkbox[i].checked ? true : false;
           if(flag) break;
        }
        return toggle();
    }
    function toggle() {
        return obj.deleteBtn.style.visibility = flag ? "visible" : "hidden";
    }
}

function delete_list(obj, saveKey) {
    var tmpArr = JSON.parse(localStorage.getItem(saveKey));
    var checkbox = document.list.elements['check[]'];
    if (typeof checkbox.length === 'undefined') {
        tmpArr = [];
    } else {
        for (var i = 0, len = checkbox.length; i < len; i++) {
            if (checkbox[i].checked) {
                tmpArr.splice(i, 1);
            }
        }
    }
    localStorage.setItem(saveKey, JSON.stringify(tmpArr));
}

function check(obj, saveKey) {
    if (!obj.urlTxt.value) return alert('URLが空です。');
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
    var data = {
        url: obj.urlTxt.value,
        kind: checkedValue,
        bgColor: pickColor(checkedValue)
    };
    save(obj, data, saveKey);
}

function pickColor(val) {
    switch(val) {
        case '開発': return '#00f4ff78';
            break;
        case '検証': return '#ffff00d4';
            break;
        case 'ステージング': return '#ff9a13d4';
            break;
        case '本番': return '#ff4110d4';
            break;
        case 'その他': return '#ffb1f7d4';
            break;
        default: return '#ffb1f7d4';
    }
}

function save(obj, data, saveKey) {
    var data = saveDataToLocalStorage(data, saveKey);
    if (typeof data.length === 'undefined') {
        obj.list.innerHTML +=
            '<tr><td><input type="checkBox" name="check[]" class="checkbox"></td><th>'
            + data.url + '</th><td style="background-color:' + pickColor(data.kind) + '" >' + data.kind + '</td></tr>';

    } else {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.list.innerHTML +=
                '<tr><td><input type="checkBox" name="check[]" class="checkbox"></td><th>'
                + data[i].url + '</th><td style="background-color:' + pickColor(data[i].kind) + '" >' + data[i].kind + '</td></tr>';
        }
    }
    listMonitor(obj);
}

function saveDataToLocalStorage(data, saveKey) {
    if (!data) return;
    var tmpArr = JSON.parse(localStorage.getItem(saveKey));
    if (!tmpArr) tmpArr = [];
    if (typeof data.length === 'undefined') {
        tmpArr.push(data);
    } else {
        for(var i = 0, len = data.length; i < len; i++) {
            tmpArr.push(data[i]);
        }
    }
    localStorage.setItem(saveKey, JSON.stringify(tmpArr));
    return data;
}

function exportFile(obj, saveKey) {
    var filename = "distinguish.json";
    setBlobUrl(
        "download",
        JSON.stringify(JSON.parse(localStorage.getItem(saveKey))),
        filename,
    );
}

function setBlobUrl(id, content, filename) {
    var blob = new Blob([ content ], { "type" : "application/x-msdownload" });
    window.URL = window.URL || window.webkitURL;
    download(window.URL.createObjectURL(blob), filename);
}

function download(uri, filename) {
  filename = filename || 'file';
  var link = document.createElement('a');
  link.download = filename;
  link.href = uri;
  link.click();
}

function importFile(obj, saveKey) {
    obj.importBtn.addEventListener('change', function(e) {
        var result = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(result);
        reader.addEventListener('load', function() {
            //とりあえずparseできない改行コードを除く)
            reader.result.replace(/\u2028|\u2029/g, '');
            var json;
            try {
                json = JSON.parse(reader.result);
            } catch (e) {
                return alert(e + "\n正しいJSONファイルを選択してください。");
            }
            if(!checkJson(json)) return alert('正しいJSONファイルを選択してください。');
            save(obj, json, saveKey);
        });
    });
}

function checkJson(json) {
    if (typeof json.length ==='undefined') return false;
    for (var i = 0, len = json.length; i < len; i++) {
        if (!json[i].hasOwnProperty('url'))  return false;
        if (!json[i].hasOwnProperty('kind')) return false;
    }
    return true;
}
