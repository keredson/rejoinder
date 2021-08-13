window.onload = function() {
  document.getElementById('play_button').onclick = function() {
    new Audio(chrome.runtime.getURL("rejoinder.mp3")).play();
    return false;
  }
}
