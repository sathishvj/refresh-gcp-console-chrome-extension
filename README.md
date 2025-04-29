# Refresh GCP Console

A Chrome extension that captures keyboard shortcuts on Google Cloud Console pages and triggers the refresh button with a visual effect.

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right corner
3. Click "Load unpacked" and select this directory
4. The extension is now installed and will work on any page that matches `https://console.cloud.google.com/*`

## Usage

When browsing the Google Cloud Console:
1. Press your configured keyboard shortcut (default is Alt+R)
2. The extension will locate the refresh button on the page
3. A blue ripple animation will appear on the button
4. After 0.5 seconds, the refresh button will be automatically clicked

## Options

You can customize the keyboard shortcut by:
1. Right-clicking the extension icon in your toolbar
2. Selecting "Options"
3. Choosing your preferred key combination:
   - Ctrl+R
   - Alt+R (default)
   - Alt+Shift+R
   - Ctrl+Shift+R
   - Ctrl+Alt+R

## Supported Page Elements

The extension looks for refresh buttons with these selectors:
- `.cm-icon-refresh`
- `cfc-refresh-button`
- `.run-query-button` (on logs pages)