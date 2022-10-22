document.addEventListener('DOMContentLoaded', async () => {
    var btGetPageUrl = document.getElementById("btGetPageUrl");
    btGetPageUrl.addEventListener("click", () => {
        chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
            let tab = tabs[0];
            tabUrl = tab.url;
            let custonUrlRegExp = /(https?:\/\/)?(www\.)?youtube\.com\/(c|user)\/[\w-]+/;
            let normalUrlRegExp = /(https?:\/\/)?(www\.)?youtube\.com\/channel\/[\w-]+/;

            if (custonUrlRegExp.exec(tabUrl)) {
                // api key: AIzaSyAf7Y4c-gfjczDGOplpP2EoCdL3ZzmAEQk
                alert('Custon')
            } else if (normalUrlRegExp.exec(tabUrl)) {
                alert('Normal')
            }

        });
    });
});
