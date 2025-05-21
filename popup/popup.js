// Get elements from popup
const bypassButton = document.getElementById('bypassButton');
const currentUrlElement = document.getElementById('currentUrl');

// Get the active tab when popup is opened
async function getCurrentTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
  } catch (error) {
    console.error("Error getting current tab:", error);
    return null;
  }
}

// Check if URL is a Medium URL
function isMediumUrl(url) {
  const mediumPatterns = [
    /^https?:\/\/(.*\.)?medium\.com\/.*/i,
    /^https?:\/\/medium\.com\/.*/i,
    /^https?:\/\/(.*\.)?towardsdatascience\.com\/.*/i,
    /^https?:\/\/(.*\.)?betterprogramming\.pub\/.*/i
  ];
  
  return mediumPatterns.some(pattern => pattern.test(url));
}

// Initialize the popup
async function initPopup() {
  try {
    
    // Get current tab
    const tab = await getCurrentTab();
    if (tab) {
      currentUrlElement.textContent = tab.url;
      
      // Enable/disable bypass button based on URL
      if (isMediumUrl(tab.url)) {
        bypassButton.disabled = false;
        bypassButton.textContent = "Bypass This Page";
      } else {
        bypassButton.disabled = true;
        bypassButton.textContent = "Not a Medium Page";
      }
    }
  } catch (error) {
    console.error("Error initializing popup:", error);
  }
}

// Handle bypass button click
bypassButton.addEventListener('click', () => {
  try {
    chrome.runtime.sendMessage({ action: "bypassCurrentPage" }, (response) => {
      if (chrome.runtime.lastError) {
        console.warn("Error bypassing page:", chrome.runtime.lastError);
        return;
      }
      
      // Only close if successful
      if (response && response.success) {
        window.close();
      }
    });
  } catch (error) {
    console.error("Error in bypass button click handler:", error);
  }
});

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', initPopup);
