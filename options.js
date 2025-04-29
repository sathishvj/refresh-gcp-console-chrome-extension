// Saves options to chrome.storage
function saveOptions() {
  const keyCombo = document.querySelector('input[name="keyCombo"]:checked').value;
  
  chrome.storage.sync.set(
    { keyCombo: keyCombo },
    function() {
      // Update status to let user know options were saved
      const status = document.getElementById('status');
      status.style.visibility = 'visible';
      setTimeout(function() {
        status.style.visibility = 'hidden';
      }, 2000);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get(
    { keyCombo: 'alt+r' }, // Default to Alt+R
    function(items) {
      document.querySelector(`input[value="${items.keyCombo}"]`).checked = true;
    }
  );
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);