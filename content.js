// Content script runs on all pages (due to manifest <all_urls>)
// It will listen for messages from the popup or background script to check if the page is a Medium article.

function isMediumPage() {
  // First, check the hostname as a quick win
  if (window.location.hostname.endsWith("medium.com")) {
    return true;
  }

  // Check for Medium-specific meta tags for custom domains
  const metaSelectors = [
    'meta[property="al:ios:app_name"][content="Medium"]',
    'meta[name="twitter:app:name:iphone"][content="Medium"]',
    'meta[name="generator"][content="Medium"]', // Another common one
    'meta[property="og:site_name"][content="Medium"]' // OpenGraph site name
  ];

  for (const selector of metaSelectors) {
    if (document.querySelector(selector)) {
      return true;
    }
  }
  
  // Check for a known script URL pattern
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  if (scripts.some(s => s.src && s.src.includes('cdn-client.medium.com'))) {
    return true;
  }

  // Check for window.__APOLLO_STATE__ which is very common for Medium sites
  if (typeof window.__APOLLO_STATE__ === 'object' && window.__APOLLO_STATE__ !== null) {
    // Further refinement: check for specific keys within __APOLLO_STATE__ if needed
    // For example, looking for a root query that typically contains "post" or "viewer"
    // This can help avoid false positives if other sites also use Apollo with a similar global var name.
    // For now, its presence is a strong hint.
    // Let's check for a common structure:
    try {
        const keys = Object.keys(window.__APOLLO_STATE__);
        const rootQueryKey = keys.find(k => k.startsWith('ROOT_QUERY'));
        if (rootQueryKey && window.__APOLLO_STATE__[rootQueryKey]?.hasOwnProperty('viewer')) {
             // console.log("Medium detected by __APOLLO_STATE__ with viewer");
            return true;
        }
    } catch(e) { /* ignore errors inspecting __APOLLO_STATE__ */ }
  }
  
  // Check for specific link rel="alternate" type="application/json+oembed" href containing "medium.com"
  const oembedLink = document.querySelector('link[rel="alternate"][type="application/json+oembed"]');
  if (oembedLink && oembedLink.href && oembedLink.href.includes('medium.com')) {
    return true;
  }

  // Check for the specific wordmark description element
  const wordmarkDesc = document.getElementById('wordmark-medium-desc');
  if (wordmarkDesc && wordmarkDesc.textContent === 'Medium Logo') {
    return true;
  }

  return false;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkIfMediumPage") {
    sendResponse({ isMedium: isMediumPage() });
    return true; // Indicates that the response will be sent asynchronously (or synchronously)
  }
  // Keep the old getArticleDetails for compatibility or future use, though it's not currently used by popup
  if (request.action === "getArticleDetails") {
    console.log("Received request for article details from popup/background.");
    sendResponse({ title: document.title, url: window.location.href, isMedium: isMediumPage() });
    return true;
  }
});

// Log to confirm content script is active (optional, for debugging)
// console.log("Medium Bypass Extension content script loaded and active on:", window.location.hostname);
