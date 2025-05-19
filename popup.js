document.addEventListener('DOMContentLoaded', () => {
  const autoRedirectToggle = document.getElementById('autoRedirectToggle');
  const manualBypassButton = document.getElementById('manualBypassButton');

  // Load the current auto-redirect state
  chrome.storage.sync.get('autoRedirect', (data) => {
    autoRedirectToggle.checked = !!data.autoRedirect;
  });

  // This function will be injected into the active tab to check for Medium indicators
  function detectIfPageIsMedium() {
    // First, check the hostname as a quick win
    if (window.location.hostname.endsWith("medium.com")) {
      return true;
    }
    // Check for Medium-specific meta tags for custom domains
    const metaSelectors = [
      'meta[property="al:ios:app_name"][content="Medium"]',
      'meta[name="twitter:app:name:iphone"][content="Medium"]',
      'meta[name="generator"][content="Medium"]',
      'meta[property="og:site_name"][content="Medium"]'
    ];
    for (const selector of metaSelectors) {
      if (document.querySelector(selector)) return true;
    }
    // Check for a known script URL pattern
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    if (scripts.some(s => s.src && s.src.includes('cdn-client.medium.com'))) {
      return true;
    }
    // Check for window.__APOLLO_STATE__
    if (typeof window.__APOLLO_STATE__ === 'object' && window.__APOLLO_STATE__ !== null) {
      try {
        const keys = Object.keys(window.__APOLLO_STATE__);
        const rootQueryKey = keys.find(k => k.startsWith('ROOT_QUERY'));
        if (rootQueryKey && window.__APOLLO_STATE__[rootQueryKey]?.hasOwnProperty('viewer')) {
          return true;
        }
      } catch (e) { /* ignore */ }
    }
    // Check for oEmbed link
    const oembedLink = document.querySelector('link[rel="alternate"][type="application/json+oembed"]');
    if (oembedLink && oembedLink.href && oembedLink.href.includes('medium.com')) {
      return true;
    }
    // Check for wordmark ID
    const wordmarkDesc = document.getElementById('wordmark-medium-desc');
    if (wordmarkDesc && wordmarkDesc.textContent === 'Medium Logo') {
      return true;
    }
    return false;
  }

  // Determine button state using chrome.scripting.executeScript
  function setButtonStateBasedOnPageType() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id && tabs[0].url) {
        const tabId = tabs[0].id;
        const tabUrl = tabs[0].url;

        if (tabUrl.startsWith('chrome://') || tabUrl.startsWith('about:') || tabUrl.startsWith('chrome-extension://')) {
          manualBypassButton.disabled = true;
          manualBypassButton.style.backgroundColor = '#ccc';
          manualBypassButton.title = "Cannot operate on this page";
          return;
        }

        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            func: detectIfPageIsMedium
          },
          (injectionResults) => {
            if (chrome.runtime.lastError) {
              console.warn("Error executing script:", chrome.runtime.lastError.message);
              manualBypassButton.disabled = true;
              manualBypassButton.style.backgroundColor = '#ccc';
              manualBypassButton.title = "Could not verify page type";
              return;
            }
            // executeScript returns an array of results, one for each frame the script was injected into.
            // We are interested in the main frame's result.
            if (injectionResults && injectionResults[0] && injectionResults[0].result) {
              manualBypassButton.disabled = false;
              manualBypassButton.style.backgroundColor = '#1877f2';
              manualBypassButton.title = "";
            } else {
              manualBypassButton.disabled = true;
              manualBypassButton.style.backgroundColor = '#ccc';
              manualBypassButton.title = "This is not detected as a Medium page";
            }
          }
        );
      } else {
        manualBypassButton.disabled = true;
        manualBypassButton.style.backgroundColor = '#ccc';
        manualBypassButton.title = "Cannot determine current page";
      }
    });
  }

  setButtonStateBasedOnPageType(); // Initial check

  // Handle toggle change
  autoRedirectToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ autoRedirect: autoRedirectToggle.checked });
  });

  // Handle manual bypass button click
  manualBypassButton.addEventListener('click', () => {
    // If this button is clickable, checkPageAndSetButtonState should have enabled it,
    // implying it's considered a Medium page by the content script.
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url) {
        const currentTab = tabs[0];
        try {
            // Construct the bypass URL directly. The page type check is handled by enabling/disabling the button.
            const originalUrl = new URL(currentTab.url);
            const newUrl = `https://freedium.cfd${originalUrl.pathname}${originalUrl.search}${originalUrl.hash}`;
            chrome.tabs.update(currentTab.id, { url: newUrl });
            window.close(); // Close the popup
        } catch (e) {
            console.error("Error constructing bypass URL or updating tab:", e);
        }
      }
    });
  });
});
