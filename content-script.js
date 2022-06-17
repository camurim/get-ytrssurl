;(function() {

    function script() {
        const rssUrl = window["ytInitialData"].metadata.channelMetadataRenderer.rssUrl;
        const channelTitle = window["ytInitialData"].header.c4TabbedHeaderRenderer.title;

        if (confirm("Do you want to copy the RSS URL to clipboard")) {

            let tags = prompt("Enter Newsboat TAGs");

            navigator.clipboard.writeText(rssUrl + ' youtube ' + tags + ' "~' + channelTitle + '"');
            alert("RSS URL Copied:\n\n" + rssUrl + ' youtube ' + tags + ' "~' + channelTitle + '"');
        }
        console.log("CHANNEL TITLE: " + channelTitle);
        console.log("RSS URL:" + rssUrl);
    }

    function inject(fn) {
        const script = document.createElement('script')
        script.text = `(${fn.toString()})();`
        document.documentElement.appendChild(script)
    }

    inject(script)
})()
