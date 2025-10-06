document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search');
  const wordInput = document.getElementById('word');

  searchButton.addEventListener('click', () => {
    const word = wordInput.value.trim();
    if (!word) return;
    chrome.runtime.sendMessage({ action: 'searchWord', word });
  });

  wordInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') searchButton.click();
  });
});