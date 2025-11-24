document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('discord-user');
  const userBtn = document.getElementById('save-user');
  const siteInput = document.getElementById('new-site');
  const siteBtn = document.getElementById('add');
  const list = document.getElementById('site-list');

  // 1. IDENTITY
  chrome.storage.sync.get(['discordUsername'], (result) => {
    if (result.discordUsername) userInput.value = result.discordUsername;
  });

  userBtn.addEventListener('click', () => {
    const val = userInput.value.trim();
    if (val) {
        chrome.storage.sync.set({ discordUsername: val }, () => {
            userBtn.innerText = "SAVED";
            setTimeout(() => userBtn.innerText = "SAVE", 1500);
        });
    }
  });

  // 2. BLOCKLIST
  const DEFAULT_BLOCKED = [
    'twitter.com', 'x.com', 'reddit.com', 'facebook.com', 
    'instagram.com', 'tiktok.com', 'youtube.com', 
    'linkedin.com', 'pinterest.com', 'twitch.tv'
  ];

  chrome.storage.sync.get(['blockedSites'], (result) => {
    const sites = result.blockedSites || DEFAULT_BLOCKED;
    renderList(sites);
  });

  siteBtn.addEventListener('click', () => {
    const site = siteInput.value.trim().toLowerCase();
    if (site) {
      chrome.storage.sync.get(['blockedSites'], (result) => {
        const sites = result.blockedSites || DEFAULT_BLOCKED;
        if (!sites.includes(site)) {
          sites.push(site);
          chrome.storage.sync.set({ blockedSites: sites }, () => {
            renderList(sites);
            siteInput.value = '';
          });
        }
      });
    }
  });

  function renderList(sites) {
    list.innerHTML = '';
    sites.forEach(site => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${site}</span><span class="remove" data-site="${site}">✕</span>`;
      list.appendChild(li);
    });
    document.querySelectorAll('.remove').forEach(el => {
      el.addEventListener('click', (e) => {
        const siteToRemove = e.target.getAttribute('data-site');
        const newSites = sites.filter(s => s !== siteToRemove);
        chrome.storage.sync.set({ blockedSites: newSites }, () => renderList(newSites));
      });
    });
  }
});
