document.addEventListener('DOMContentLoaded',function() {
    var btGetFeed = document.getElementById("getFeed");
    btGetFeed.addEventListener("click", () => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, {action: "getRssFeed"}, function (response) {
                //response = response || {};
                //console.log(response.rssFeed + ' youtube  "~' + response.channelTitle + '"');
            });
        });
    });
});
