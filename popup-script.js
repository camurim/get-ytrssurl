var rssFeed = '';
var btTags = '';
var btEntry = '';
var channelTitle = '';

let btGetChannelId = document.getElementById("btGetChannelId");
let btCopy = document.getElementById("btCopy");
let txChannelTitle = document.getElementById('txChannelTitle');
let txRssFeed = document.getElementById('txRssFeed');
let txNbTags = document.getElementById('txNbTags');
let txNbEntry = document.getElementById('txNbEntry');

document.addEventListener('DOMContentLoaded', () => {
    btGetChannelId.addEventListener("click", () => {
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
                })()
                    .then((result) => {rssFeed = result})
                    .catch((error) => {rssFeed = error});
            } else if (normalUrlRegExp.exec(tabUrl)) {
                rssFeed = userNameOrId;
            }

            txRssFeed.value = rssFeed;
        });
    });

    btCopy.addEventListener("click", () => {
        btTags = txNbTags.value;
        channelTitle = txChannelTitle.value;

        btEntry = `https://www.youtube.com/feeds/videos.xml?channel_id=${rssFeed} youtube ${btTags} "~${channelTitle}"`;
        txNbEntry.value = btEntry;

        navigator.clipboard.writeText(btEntry)
            .then(() => {
                console.log('RSS URL sucessfully copied!');
            })
            .catch(() => {
                console.log(`Something went wrong. URL: ${btEntry}`);
            });
    });
});
