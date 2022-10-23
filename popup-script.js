const apikey ='AIzaSyAf7Y4c-gfjczDGOplpP2EoCdL3ZzmAEQk';

const btGetChannelId = document.getElementById("btGetChannelId");
const btCopy = document.getElementById("btCopy");
const txChannelTitle = document.getElementById('txChannelTitle');
const txRssFeed = document.getElementById('txRssFeed');
const txNbTags = document.getElementById('txNbTags');
const txNbEntry = document.getElementById('txNbEntry');

var rssFeed = '';
var btTags = '';
var btEntry = '';
var channelTitle = '';

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
                    let response = await fetch(`https://www.googleapis.com/youtube/v3/channels?key=${apikey}&forUsername=${userNameOrId}&part=id`);
                    let resJson = await response.json();

                    rssFeed = resJson.items[0].id;
                    return rssFeed;
                })()
                    .then((result) => {rssFeed = result})
                    .catch((error) => {console.log(`Error: ${error}`)});
            } else if (normalUrlRegExp.exec(tabUrl)) {
                rssFeed = userNameOrId;
            }

            if (!rssFeed) {
                (async () => {
                    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&q=${userNameOrId}&type=channel`);
                    let resJson = await response.json();

                    rssFeed = resJson.items[0].id.channelId;
                    return rssFeed;
                })()
                    .then((result) => {rssFeed = result})
                    .catch((error) => {console.log(`Error: ${error}`)});
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
