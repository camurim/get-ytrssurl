window.onload = () => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action == 'getRssFeed') {
            alert(request.action);
            const rssFeed = window["ytInitialData"].metadata.channelMetadataRenderer.rssUrl;
            const channelTitle = window["ytInitialData"].header.c4TabbedHeaderRenderer.title;

            console.log("CHANNEL TITLE: " + channelTitle);
            console.log("RSS URL:" + rssFeed);

            sendResponse({rssFeed: rssFeed, channelTitle: channelTitle});
       }
    });
};
