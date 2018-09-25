var toggle = true;
var script01 = function()
{
    //if (toggle) {
    //    chrome.browserAction.setIcon({
    //        path: "../img/icon_disable19.png"
    //    });
    //    console.log("icon");
    //    alert("icon");
    //    toggle = false;
    //}  else {
    //    chrome.browserAction.setIcon({
    //        path: "/img/icon19.png"
    //    });
    //    toggle = true;
    //    alert("拡張機能を実行しました");
    //}
    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.create({"url": "option.html" });
    });

};
(function()
{
    chrome.browserAction.onClicked.addListener(script01);
})();

