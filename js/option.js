(function () {
    var qs = function(tag) { return document.querySelector(tag); };
    var obj = {
        urlTxt:     qs('#url_txt'),
        kindRadio:  qs("#kind_radio").elements,
        list:       qs("#distinguish_list"),
        saveBtn:    qs('#save_btn'),
        exportBtn:  qs('#export_btn'),
        importBtn:  qs('#import_btn'),
        popup:      qs('#delete_popup'),
        deleteBtn:  qs('#delete_btn'),
    };
    var saveKey = 'distinguish_data';
    obj.saveBtn.addEventListener('click',   function(){ check(obj, saveKey) }, false);
    obj.exportBtn.addEventListener('click', function(){ exportFile(obj, saveKey) }, false);
    obj.importBtn.addEventListener('click', function(){ importFile(obj, saveKey) }, false);
    var data = JSON.parse(localStorage.getItem(saveKey));
    if (!data) data= [];
    for (var i = 0; i < data.length; i++) {
        obj.list.innerHTML += '<tr><td><input type="checkBox" name="check[]" class="checkbox"></td><th>' + data[i].url + '</th><td>' + data[i].kind + '</td></tr>';
    }

    //popup
    var targets = document.getElementsByClassName('checkbox');
    for(var i = 0; i < targets.length; i++){
        targets[i].addEventListener('click', function () {
             show();
        }, false);
    }
    var flag = false;
    var check = document.list.elements['check[]'];
    var len = check.length;
    function show() {
        console.log("sdf");
        if (!len) {
           flag = check.checked ? true : false;
        }
        for (i = 0; i < len; i++) {
           flag = check[i].checked ? true : false;
           if(flag) break;
        }
        return toggle();
    }

    function toggle() {
      return obj.popup.style.visibility = flag ? "visible" : "hidden";
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
    var data = {
        url: obj.urlTxt.value,
        kind: checkedValue
    };
    save(obj, data, saveKey);
}

function save(obj, data, saveKey) {
    var data = saveDataToLocalStorage(data, saveKey);
    if (data.length === 'undefined') {
        obj.list.innerHTML +=
            '<tr><th>' + data.url + '</th><td>' + data.kind + '</td></tr>';
    } else {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.list.innerHTML +=
                '<tr><th>' + data[i].url + '</th><td>' + data[i].kind + '</td></tr>';
        }
    }
}

function saveDataToLocalStorage(data, saveKey) {
    if (!data) return;
    var tmpArr = JSON.parse(localStorage.getItem(saveKey));
    if (!tmpArr) tmpArr = [];
    tmpArr.push(data);
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
    console.log(json);
    if (json.length ==='undefined') return false;
    console.log(json.length);
    for (var i = 0, len = json.length; i < len; i++) {
        if (!json[i].hasOwnProperty('url'))  return false;
        if (!json[i].hasOwnProperty('kind')) return false;
    }
    return true;
}

(function() {
    })()




