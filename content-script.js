;(function() {

    function script() {
        const rssUrl = window["ytInitialData"].metadata.channelMetadataRenderer.rssUrl;
        const channelTitle = window["ytInitialData"].header.c4TabbedHeaderRenderer.title;

        if (confirm("Do you want to copy the RSS URL to clipboard")) {

            let tags = prompt("Enter Newsboat TAGs");

            navigator.clipboard.writeText(rssUrl + ' youtube ' + tags + ' "~' + channelTitle + '"')
                     .then(() => {
                         alert('RSS URL sucessfully copied!');
                     })
                    .catch(() => {
                        alert('Something went wrong. URL: ' + rssUrl + ' youtube ' + tags + ' "~' + channelTitle + '"');
                    });
        }
        console.log("CHANNEL TITLE: " + channelTitle);
        console.log("RSS URL:" + rssUrl);
    }
})()
