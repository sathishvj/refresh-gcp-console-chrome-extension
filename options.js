// Saves options to chrome.storage when a radio button is clicked
function saveOptions(event) {
  const keyCombo = event.target.value;
  
  chrome.storage.sync.set(
    { keyCombo: keyCombo },
    function() {
      // Update status to let user know options were saved
      const status = document.getElementById('status');
      status.style.visibility = 'visible';
      setTimeout(function() {
        status.style.visibility = 'hidden';
      }, 1500);
    }
  );
}

// Restores radio button state using the preferences stored in chrome.storage
function restoreOptions() {
  chrome.storage.sync.get(
    { keyCombo: 'alt+r' }, // Default to Alt+R
    function(items) {
      const radioButton = document.querySelector(`input[value="${items.keyCombo}"]`);
      if (radioButton) {
        radioButton.checked = true;
      }
    }
  );
}

// Initialize the page and add event listeners to radio buttons
document.addEventListener('DOMContentLoaded', function() {
  // Restore saved options
  restoreOptions();
  
  // Add click event listeners to all radio buttons
  const radioButtons = document.querySelectorAll('input[name="keyCombo"]');
  radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', saveOptions);
  });
});