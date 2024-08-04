document.addEventListener('DOMContentLoaded', () => {
    loadPhotos();
  });
  
  function loadPhotos() {
    chrome.storage.sync.get({ photos: [] }, (result) => {
      const photoList1 = document.getElementById('photoList1');
      const photoList2 = document.getElementById('photoList2');
      photoList1.innerHTML = '';
      photoList2.innerHTML = '';
  
      result.photos.forEach((photoUrl, index) => {
        const div = document.createElement('div');
        div.className = 'photo-item';
  
        const img = document.createElement('img');
        img.src = photoUrl;
        img.alt = 'Photo';
  
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        
        const removeImg = document.createElement('img');
        removeImg.src = 'assets/x-button.png'; // Path to your PNG image
        removeImg.alt = 'Remove';
        
        removeBtn.appendChild(removeImg);
        
        removeBtn.addEventListener('click', () => {
          removePhoto(index);
        });
  
        div.appendChild(img);
        div.appendChild(removeBtn);
  
        // Alternate between the two columns
        if (index % 2 === 0) {
          photoList1.appendChild(div);
        } else {
          photoList2.appendChild(div);
        }
      });
    });
  }
  
  function removePhoto(index) {
    chrome.storage.sync.get({ photos: [] }, (result) => {
      const photos = result.photos;
      photos.splice(index, 1); // Remove photo at the given index
  
      chrome.storage.sync.set({ photos: photos }, () => {
        loadPhotos(); // Refresh the list
      });
    });
  }
  