const validateIcon = (url) => {
    if(url.startsWith("https://www.google.com"))
        chrome.action.setIcon({ path: "/icon-tagged.png" })
    else 
        chrome.action.setIcon({ path: "/icon-default.png" })
};

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab && tab.url) {
            validateIcon(tab.url);
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        validateIcon(changeInfo.url);
    }
});  