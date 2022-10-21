window.onload = function () {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action == "getRssFeed") {
            const rssUrl = window["ytInitialData"].metadata.channelMetadataRenderer.rssUrl;
            const channelTitle = window["ytInitialData"].header.c4TabbedHeaderRenderer.title;

            console.log("CHANNEL TITLE: " + channelTitle);
            console.log("RSS URL:" + rssUrl);

            sendResponse({rssfeed: rssUrl, channeltitle: channelTitle});
       }
    });
};
