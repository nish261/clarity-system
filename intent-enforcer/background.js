const WEBHOOK_URL = "https://discord.com/api/webhooks/1441737912483057805/_O0NQN9pv08VEOBK1L6jMNXnmIX2QQC1rzagU_3bXdC2y5l64CFGudaXz443Xb_zePe7";

const DEFAULT_BLOCKED = [
    'twitter.com', 'x.com', 'reddit.com', 'facebook.com', 
    'instagram.com', 'tiktok.com', 'youtube.com', 
    'linkedin.com', 'pinterest.com', 'twitch.tv'
];

// 1. WATCHER
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if ((changeInfo.status === 'complete' || changeInfo.url) && tab.url) {
    chrome.storage.sync.get(['blockedSites'], (result) => {
      const blocked = result.blockedSites || DEFAULT_BLOCKED;
      const url = new URL(tab.url);

      if (blocked.some(domain => url.hostname.includes(domain))) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['jolt.js']
        }).catch(() => {});
      }
    });
  }
});

// 2. REPORTER
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "LOG_TO_DISCORD") {

    chrome.storage.sync.get(['discordUsername'], (data) => {
        let rawUser = data.discordUsername || "Anonymous";
        let userTag = rawUser;

        // SMART FIX: If it's a User ID (all numbers), format for Real Ping <@ID>
        if (/^\d+$/.test(rawUser)) {
            userTag = `<@${rawUser}>`;
        } else if (!rawUser.startsWith("@") && rawUser !== "Anonymous") {
            // Just visual text if it's a name
            userTag = `@${rawUser}`;
        }

        const message = `user ${userTag} spent ${request.timeText} on ${request.website} for the purpose: ${request.intent}`;

        fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
              content: message,
              allowed_mentions: { parse: ["users"] } 
          })
        }).then(res => console.log("Discord sent:", res.status))
          .catch(err => console.error("Discord error:", err));
    });
  }
});
