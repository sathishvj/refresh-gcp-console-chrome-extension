# Refresh GCP Console

A Chrome extension that captures Alt+R keypresses on Google Cloud Console pages and triggers the refresh button with a visual effect.

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right corner
3. Click "Load unpacked" and select this directory
4. The extension is now installed and will work on any page that matches `https://console.cloud.google.com/*`

## Usage

When browsing the Google Cloud Console:
- Press Alt+R
- The extension will locate the refresh button on the page
- A blue ripple animation will appear on the button
- After 0.5 seconds, the refresh button will be automatically clicked

## Supported Page Elements

The extension looks for refresh buttons with these selectors:
- `.cm-icon-refresh`
- `cfc-refresh-button`
- `.run-query-button` (on logs pages)