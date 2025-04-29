// Add styles for animation
const style = document.createElement("style");
style.textContent = `
  @keyframes rippleEffect {
    0% {
      transform: scale(0);
      opacity: 0.6;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .ripple {
    position: absolute;
    background-color: rgba(0, 0, 255, 1.0);
    border-radius: 50%;
    width: 100%;
    height: 100%;
    transform: scale(0);
    animation: rippleEffect 0.5s linear;
    pointer-events: none;
    z-index: 9999;
  }
`;
document.head.appendChild(style);

// Default key combo if settings not loaded yet
let userKeyCombo = "alt+r";

// Load user preferences for key combination
chrome.storage.sync.get({ keyCombo: "alt+r" }, function (items) {
  userKeyCombo = items.keyCombo;
});

// Listen for storage changes to update key combo without page reload
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === "sync" && changes.keyCombo) {
    userKeyCombo = changes.keyCombo.newValue;
  }
});

document.addEventListener("keydown", function (event) {
  const rKeyCode = 82; // 'r' key

  if (event.keyCode !== rKeyCode) {
    return;
  }

  let currentCombo = "";
  if (event.ctrlKey && event.altKey && !event.shiftKey) {
    currentCombo = "ctrl+alt+r";
  } else if (event.ctrlKey && event.shiftKey && !event.altKey) {
    currentCombo = "ctrl+shift+r";
  } else if (event.altKey && event.shiftKey && !event.ctrlKey) {
    currentCombo = "alt+shift+r";
  } else if (event.ctrlKey && !event.altKey && !event.shiftKey) {
    currentCombo = "ctrl+r";
  } else if (event.altKey && !event.ctrlKey && !event.shiftKey) {
    currentCombo = "alt+r";
  } else {
    return; // Not a combo we're handling
  }

  // console.log( "GCP Refresh Console: current combo: " + currentCombo + "; user combo: " + userKeyCombo);

  // If the current combo doesn't match user's setting, do nothing
  if (currentCombo !== userKeyCombo) {
    return;
  }

  event.preventDefault();
  performRefresh();
});

function getRefreshButton() {
  let refreshButton = document.querySelector(".cm-icon-refresh");
  if (!refreshButton) {
    refreshButton = document.querySelector("cfc-refresh-button");
  }
  if (
    !refreshButton &&
    window.location.href.startsWith(
      "https://console.cloud.google.com/logs/query"
    )
  ) {
    refreshButton = document.querySelector(".run-query-button");
  }

  return refreshButton;
}

function performRefresh() {
  // Prevent the default refresh behavior

  const refreshButton = getRefreshButton();

  if (!refreshButton) {
    console.warn(
      "GCP Refresh Console: No refresh button found. Current URL: " +
        window.location.href
    );
    return;
  }

  // Add visual effect before clicking
  const buttonRect = refreshButton.getBoundingClientRect();

  // Create container for the ripple effect
  const rippleContainer = document.createElement("div");
  rippleContainer.style.position = "absolute";
  rippleContainer.style.top = buttonRect.top + "px";
  rippleContainer.style.left = buttonRect.left + "px";
  rippleContainer.style.width = buttonRect.width + "px";
  rippleContainer.style.height = buttonRect.height + "px";
  rippleContainer.style.overflow = "hidden";
  rippleContainer.style.borderRadius = "50%";
  rippleContainer.style.pointerEvents = "none";
  rippleContainer.style.zIndex = "9999";

  // Create the ripple element
  const ripple = document.createElement("div");
  ripple.className = "ripple";

  rippleContainer.appendChild(ripple);
  document.body.appendChild(rippleContainer);

  // Click after animation completes
  setTimeout(() => {
    refreshButton.click();
    rippleContainer.remove();
    console.log(
      "GCP Refresh Console: Refresh button clicked. Current URL: " +
        window.location.href
    );
  }, 500);
}
