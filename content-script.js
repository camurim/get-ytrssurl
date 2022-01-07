;(function() {

    function script() {
        const rssUrl = window["ytInitialData"].metadata.channelMetadataRenderer.rssUrl;
        if (confirm("Do you want to copy the RSS URL to clipboard")) {
            navigator.clipboard.writeText(rssUrl);
            alert("RSS URL Copied: " + rssUrl);
        }
        console.log("RSS URL:" + rssUrl);
    }

    function inject(fn) {
        const script = document.createElement('script')
        script.text = `(${fn.toString()})();`
        document.documentElement.appendChild(script)
    }

    inject(script)
})()
