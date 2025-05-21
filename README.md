# Medium Payroll Bypass Extension

## Description

The Medium Payroll Bypass Extension is a browser tool designed to help users access Medium articles that are behind a paywall. It achieves this by redirecting the article from its original Medium URL (or custom domain Medium URL) to an alternative service, `freedium.cfd`, which provides access to the content.

This extension aims to provide a smoother reading experience for users who frequently encounter Medium's metered paywall.

## Features

-   **Manual Bypass:** Users can manually trigger a bypass for the current Medium article via the extension's popup. The "Bypass Current Page" button is only enabled if the extension detects the current page as a Medium article.
-   **Context Menu Integration:** Right-clicking on any page provides a "Bypass Medium" option. If the current page is detected as a Medium article, selecting this option will redirect it to freedium.cfd.
-   **Smart Medium Detection:** The extension employs pattern matching to detect various Medium articles, including:
    -   Regular medium.com articles
    -   Custom subdomain Medium articles
    -   Medium-hosted publication articles
-   **User-Friendly Interface:**
    -   Clean, intuitive popup design
    -   Clear visual indication of current page status
    -   One-click bypass functionality
    -   Easy access through browser toolbar or context menu

## How to Install

Since this extension is not (yet) on the Chrome Web Store, you need to load it as an unpacked extension:

1.  **Download or Clone:** Ensure you have all the extension files in a single directory on your computer.
2.  **Open Extensions Page:**
    *   In Chrome, navigate to `chrome://extensions/`.
    *   In Edge, navigate to `edge://extensions/`.
    *   For other Chromium-based browsers, find the equivalent extensions management page.
3.  **Enable Developer Mode:** Look for a "Developer mode" toggle switch (usually in the top-right corner of the extensions page) and make sure it is enabled.
4.  **Load Unpacked:**
    *   Click the "Load unpacked" button.
    *   A file dialog will open. Navigate to and select the directory where you saved the extension files.
5.  **Extension Ready:** The "Medium Payroll Bypass" extension should now appear in your list of installed extensions and be active.

## How to Use

### Extension Popup
Click the extension's icon in your browser's toolbar to open the popup interface:

![Extension Popup Interface](img/Screenshot%202025-05-21%20110752.png)

### Context Menu
Right-click on any Medium article to see the bypass option:

![Context Menu Bypass Option](img/Screenshot%202025-05-21%20113820.png)

When you right-click on a webpage that contains a Medium article, you'll see a "Bypass Medium" option. Clicking it will redirect the page to the freedium.cfd version.

![Extension Menu](img/Screenshot%202025-05-21%20110859.png)
---

Made with <span style="color: #e74c3c;">♥</span> by [Nullbytefox](https://github.com/Nullbytefox)
