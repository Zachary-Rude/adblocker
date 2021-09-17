var enabled = true;
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (enabled) {
      console.log("blocking:", details.url);
    }
    return {
      cancel: enabled
    };
  }, {
    urls: blocked_domains
  },
  //{urls: ["<all_urls>"]}, /* replace with list of blacklisted urls */
  ["blocking"]
);

chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.setUninstallURL('https://ad-blocker.zacharyrude.repl.co/uninstall.html');
  }
});


chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    { code: `let ads = document.querySelectorAll("[class*=ad], [class*=doubleclick], [class*=Banner], [class*=banner], [class*=Ad], [id*=ad], [id*=doubleclick], [id*=Banner], [id*=banner], [id*=Ad]");
ads.forEach(ad => {
  ad.style.display = "none !important";
});` }
  );
});
