var rssFeed = '';

document.addEventListener('DOMContentLoaded', () => {
    let btGetPageUrl = document.getElementById("btGetPageUrl");
    let txRssFeed = document.getElementById('txRssFeed');

    btGetPageUrl.addEventListener("click", () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            let tab = tabs[0];
            let tabUrl = tab.url;
            let urlArray = tabUrl.split('/');
            let userNameOrId = urlArray[urlArray.length - 1];

            let custonUrlRegExp = /(https?:\/\/)?(www\.)?youtube\.com\/(c|user)\/[\w-]+/;
            let normalUrlRegExp = /(https?:\/\/)?(www\.)?youtube\.com\/channel\/[\w-]+/;

            if (custonUrlRegExp.exec(tabUrl)) {
                (async () => {
                    const apikey ='AIzaSyAf7Y4c-gfjczDGOplpP2EoCdL3ZzmAEQk';

                    let response = await fetch(`https://www.googleapis.com/youtube/v3/channels?key=${apikey}&forUsername=${userNameOrId}&part=id`);
                    let resJson = await response.json();

                    rssFeed = resJson.items[0].id;
                    return rssFeed;
                })().then((result) => {rssFeed = result});
            } else if (normalUrlRegExp.exec(tabUrl)) {
                rssFeed = userNameOrId;
            }

            txRssFeed.value = rssFeed;
        });
    });
});
