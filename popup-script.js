const apikey ='AIzaSyAf7Y4c-gfjczDGOplpP2EoCdL3ZzmAEQk';

const btGetChannelId = document.getElementById("btGetChannelId");
const btCopy = document.getElementById("btCopy");
const txChannelTitle = document.getElementById('txChannelTitle');
const txChannelId = document.getElementById('txChannelId');
const txNbTags = document.getElementById('txNbTags');
const txNbEntry = document.getElementById('txNbEntry');
const channelPages = ['featured','videos','playlists','community','channels','about'];

var channelId = '';
var channelTitle = '';
var nbTags = '';
var nbEntry = '';

document.addEventListener('DOMContentLoaded', () => {
    btGetChannelId.addEventListener("click", async () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            let tab = tabs[0];
            let tabUrl = tab.url;
            let tabTitle = tab.title;
            let urlArray = tabUrl.split('/');
            let userNameOrId = urlArray[urlArray.length - 1];

            if (channelPages.includes(userNameOrId))
                userNameOrId = urlArray[urlArray.length - 2];

            let custonUrlRegExp = /(https?:\/\/)?(www\.)?youtube\.com\/(c|user)\/[\w-]+/;
            let normalUrlRegExp = /(https?:\/\/)?(www\.)?youtube\.com\/channel\/[\w-]+/;
            let channelTitleRegExp = /(\(\d+\)) ([\w+ +]*) (- YouTube)/;
            let channelTitleMatches = tabTitle.match(channelTitleRegExp);

            channelTitle = channelTitleMatches[2];

            if (custonUrlRegExp.exec(tabUrl)) {
                (async () => {
                    let response = await fetch(`https://www.googleapis.com/youtube/v3/channels?key=${apikey}&forUsername=${userNameOrId}&part=id`);
                    let resJson = await response.json();

                    let channelId = resJson.items[0].id;
                    return channelId;
                })()
                    .then((result) => {channelId = result})
                    .catch((error) => {console.log(`Error: ${error}`)});

                if (!channelId || channelId.trim() == '') {
                    (async () => {
                        let response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&q=${userNameOrId}&type=channel`);
                        let resJson = await response.json();

                        let channelId = resJson.items[0].id.channelId;
                        let channelTitle = resJson.items[0].snippet.title;

                        if (!channelId) {
                            response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&q=${channelTitle}&type=channel`);
                            resJson = await response.json();
                            channelId = resJson.items[0].id.channelId;
                            channelTitle = resJson.items[0].snippet.title;
                        }

                        return {channelId, channelTitle};
                    })()
                        .then((result) => {channelId = result.channelId; channelTitle = result.channelTitle})
                        .catch((error) => {console.log(`Error: ${error}`)});
                }
            } else if (normalUrlRegExp.exec(tabUrl)) {
                channelId = userNameOrId;
                channelTitle = channelTitleMatches[2];
            } else {
                channelId = 'This is not an YouTube channel page';
            }

            txChannelId.value = channelId;
            if (channelTitle)
                txChannelTitle.value = channelTitle;
        });
    });

    btCopy.addEventListener("click", async () => {
        nbTags = txNbTags.value;
        channelTitle = txChannelTitle.value;

        nbEntry = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId} youtube ${nbTags} "~${channelTitle}"`;
        txNbEntry.value = nbEntry;

        navigator.clipboard.writeText(nbEntry)
            .then(() => {
                console.log('RSS URL sucessfully copied!');
            })
            .catch(() => {
                console.log(`Something went wrong. URL: ${nbEntry}`);
            });
    });
});
