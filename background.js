chrome.runtime.onMessage.addListener((message) => {
  if (message.action !== 'searchWord') return;

  const word = message.word;
  const urls = [
    `https://es.wiktionary.org/wiki/${encodeURIComponent(word)}`,
    `https://www.google.es/search?tbm=isch&q=${encodeURIComponent(word)}`,
    `https://es.forvo.com/search/${encodeURIComponent(word)}/`,
    `https://www.linguee.com/english-spanish/search?source=spanish&query=${encodeURIComponent(word)}`
  ];

  chrome.storage.local.get('searchTabIds', result => {
    const oldTabIds = result.searchTabIds || [];
    oldTabIds.forEach(id => id && chrome.tabs.remove(id));

    const newTabIds = [];
    urls.forEach((url, i) => {
      chrome.tabs.create({ url, active: i === 0 }, tab => {
        newTabIds[i] = tab.id;
        if (i === urls.length - 1) {
          chrome.storage.local.set({ searchTabIds: newTabIds });
        }
      });
    });
  });
});