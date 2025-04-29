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

document.addEventListener("keydown", function (event) {
  // Check if Alt+R is pressed (keyCode 82 is 'r')
  if (!(event.altKey && event.keyCode === 82)) {
    return;
  }

  // Prevent the default refresh behavior
  event.preventDefault();

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

  if (refreshButton) {
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
  } else {
    console.warn(
      "GCP Refresh Console: No refresh button found. Current URL: " +
        window.location.href
    );
  }
});
