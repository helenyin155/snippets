chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "saveImage",
      title: "Save Image",
      contexts: ["image"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveImage" && info.srcUrl) {
      chrome.storage.sync.get({ photos: [] }, (result) => {
        const photos = result.photos;
        photos.push(info.srcUrl);
  
        chrome.storage.sync.set({ photos: photos }, () => {
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'images/icon48.png',
            title: 'Photo Saver',
            message: 'Photo saved!'
          });
        });
      });
    }
  });
  