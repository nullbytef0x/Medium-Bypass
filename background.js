// Function to create the context menu item
function createContextMenu() {
  chrome.contextMenus.create({
    id: "bypass-medium",
    title: "Bypass Medium",
    contexts: ["page"],
  });
}

// Listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
  // Set a default state for auto-redirect (optional, can be managed via popup)
  chrome.storage.sync.set({ autoRedirect: false }); // Changed default to false
});

// Listener for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "bypass-medium" && tab && tab.id && tab.url) {
    // Ask content script if it's a Medium page
    chrome.tabs.sendMessage(tab.id, { action: "checkIfMediumPage" }, (response) => {
      if (chrome.runtime.lastError) {
        if (!chrome.runtime.lastError.message.includes("Receiving end does not exist")) {
          // Log other errors, but be quieter about the common "receiving end" issue
          console.warn("Error sending message for context menu click:", chrome.runtime.lastError.message);
        }
        return;
      }
      if (response && response.isMedium) {
        const bypassUrl = constructBypassUrlFromTabUrl(tab.url);
        if (bypassUrl) {
          chrome.tabs.update(tab.id, { url: bypassUrl });
        }
      }
    });
  }
});

// Helper function to construct the bypass URL, callable after page type is confirmed
function constructBypassUrlFromTabUrl(originalUrlString) {
  try {
    const originalUrl = new URL(originalUrlString);
    // The actual check for whether it *is* a Medium page should happen before calling this
    return `https://freedium.cfd${originalUrl.pathname}${originalUrl.search}${originalUrl.hash}`;
  } catch (e) {
    console.error("Invalid URL for bypass construction:", originalUrlString, e);
    return null;
  }
}


// Listener for tab updates to potentially auto-redirect
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Ensure the tab has a URL and the update is complete.
  // Also check if `tab.url` is defined, as `changeInfo` might not always include it early.
  if (changeInfo.status === 'complete' && tab && tab.url) {
    chrome.storage.sync.get("autoRedirect", (data) => {
      if (data.autoRedirect) {
        // Don't try to redirect if already on freedium.cfd
        if (tab.url.startsWith('https://freedium.cfd/')) {
          return;
        }

        // Ask content script if it's a Medium page
        chrome.tabs.sendMessage(tabId, { action: "checkIfMediumPage" }, (response) => {
          if (chrome.runtime.lastError) {
            if (!chrome.runtime.lastError.message.includes("Receiving end does not exist")) {
              // Log other errors, but be quieter about the common "receiving end" issue for auto-redirect
              console.warn("Error sending message for auto-redirect on:", tab.url, chrome.runtime.lastError.message);
            }
            return; // Silently fail if content script isn't ready for auto-redirect
          }

          if (response && response.isMedium) {
            const bypassUrl = constructBypassUrlFromTabUrl(tab.url);
            if (bypassUrl && bypassUrl !== tab.url) { // Ensure it's a different URL
              chrome.tabs.update(tabId, { url: bypassUrl });
            }
          }
        });
      }
    });
  }
});
