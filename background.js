// Handle extension icon click by opening options page
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});