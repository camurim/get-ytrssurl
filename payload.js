var script = document.createElement('script');
script.src = chrome.runtime.getURL('content-script.js')
script.onload = function() {
  this.remove();
};
(document.head || document.documentElement).appendChild(script);
