
const productivePatterns = ["stackoverflow.com", "github.com", "codepen.io"];
const unproductivePatterns = ["facebook.com", "twitter.com", "instagram.com"];

let lastUrl = null, lastTime = Date.now();

async function updateTime() {
  const now = Date.now();
  chrome.storage.local.get("times", data => {
    const times = data.times || {};
    const site = new URL(lastUrl).hostname;
    const delta = now - lastTime;
    times[site] = (times[site] || 0) + delta;
    chrome.storage.local.set({ times });
    lastTime = now;
  });
}

chrome.tabs.onActivated.addListener(activeInfo => {
  updateTime();
  chrome.tabs.get(activeInfo.tabId, tab => {
    lastUrl = tab.url || "";
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    updateTime();
    lastUrl = tab.url || "";
  }
});

chrome.windows.onFocusChanged.addListener(winId => {
  updateTime();
  lastUrl = ""; // pause timer when unfocused
});

chrome.alarms.create("periodicUpdate", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "periodicUpdate") updateTime();
});
