window.onload = function() {
  document.getElementById('play_button').onclick = function() {
    new Audio(chrome.runtime.getURL("rejoinder.mp3")).play();
    return false;
  }
  document.getElementById('rejoinder_version').textContent = 'v' + chrome.runtime.getManifest().version;
}
