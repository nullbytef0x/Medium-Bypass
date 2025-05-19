# Medium Payroll Bypass Extension

## Description

The Medium Payroll Bypass Extension is a browser tool designed to help users access Medium articles that are behind a paywall. It achieves this by redirecting the article from its original Medium URL (or custom domain Medium URL) to an alternative service, `freedium.cfd`, which provides access to the content.

This extension aims to provide a smoother reading experience for users who frequently encounter Medium's metered paywall.

## Features

-   **Automatic Redirection:** If enabled, the extension automatically redirects Medium articles (including those on custom domains) to `freedium.cfd` as you navigate to them. This feature is **disabled by default** upon first installation and can be toggled via the extension popup.
-   **Manual Bypass:** Users can manually trigger a bypass for the current Medium article via the extension's popup. The "Bypass Current Page" button is only enabled if the extension detects the current page as a Medium article.
-   **Context Menu Bypass:** Right-clicking on any page provides a "Bypass Medium" option. If the current page is detected as a Medium article, selecting this option will redirect it.
-   **Smart Medium Detection:** The extension employs multiple methods to detect Medium articles, including checks for:
-   **User-Friendly Popup:**
    -   Toggle switch to enable/disable automatic redirection.
    -   Button to manually bypass the current page.
    -   Clear visual indication if manual bypass is not applicable to the current page.
    -   Includes an attribution to the developer.

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

-   **Extension Icon:** Click the extension's icon in your browser's toolbar to open the popup.
    -   **Enable Auto-Redirect:** Use the toggle switch to turn automatic redirection on or off. By default, this is OFF.
    -   **Bypass Current Page:** If you are on a Medium article, click this button to manually redirect it to `freedium.cfd`. The button will be disabled if the current page is not detected as a Medium article.
-   **Context Menu:** Right-click on a webpage. If it's a Medium article, you'll see a "Bypass Medium" option. Clicking it will redirect the page.
-   **Automatic Redirection:** If you've enabled this feature in the popup, simply navigating to a Medium article will automatically redirect it.

---

Made with <span style="color: #e74c3c;">♥</span> by [Nullbytefox](https://github.com/Nullbytefox)
