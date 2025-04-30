# Refresh GCP Console

A Chrome extension that captures a configured key press (alt+r, by default) on Google Cloud Console pages and triggers the page-specific data refresh button.

## Overview

There are a few inefficiencies when using the Google Cloud Console to refresh data:

- The refresh button is not always in the same location on different pages
- The refresh button is not visually the same - sometimes an icon, sometimes with text, and in other places "Run Query", etc.
- Using the mouse, locating the refresh button, and clicking refresh feels just that little bit distracting and inefficient.
- Refreshing the entire page is not always the best option, as it takes longer.

This extension helps by identifying the refresh button and automatically clicking it when you press a specific keyboard shortcut.

## Installation

Install the extension from: [Chrome Web Store](https://chromewebstore.google.com/detail/refresh-gcp-console/jpladpnibahabgjfgdfapmifjeghhlhh)

## Developer Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right corner
3. Click "Load unpacked" and select this directory
4. The extension is now installed and will work on any page that matches `https://console.cloud.google.com/*`

## Usage

When browsing the Google Cloud Console:

1. Press your configured keyboard shortcut (default is Alt+R)
2. The extension will locate and click the refresh button on the page

## Options

You can customize the keyboard shortcut by either:

Method 1:

- Clicking the extension icon in your toolbar (opens options page directly)

Method 2:

1. Right-clicking the extension icon in your toolbar
2. Selecting "Options"

Then choose your preferred key combination:

- Alt+R (default)
- Ctrl+R
- Alt+Shift+R
- Ctrl+Shift+R
- Ctrl+Alt+R

## Supported Page Elements

The extension looks for refresh buttons with these selectors:

- `.cm-icon-refresh`
- `cfc-refresh-button`
- `.run-query-button` (in Logging)
