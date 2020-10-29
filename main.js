const HOME_URL = 'https://www.youtube.com/';

var selected;

window.addEventListener('load', start);

function start() {
  // Checks if its home page
  let url = window.location.href.split('?')[0];
  
  if (url != HOME_URL) {
    return;
  }


  document.addEventListener('keydown', (evt) => processKey(evt));
}

function processKey(event) {
  let videos = Array.from(
    document.querySelectorAll('ytd-rich-item-renderer[class="style-scope ytd-rich-grid-renderer"]')
  // Ignores hidden videos
  ).filter(e => e.style.display !== 'none');
  
  // Checks if input is focused
  if (document.activeElement.tagName === 'INPUT') {
    return;
  }

  let key = event.key;

  let new_video;

  switch(key) {
    // Next video
    case 'n':
      // Checks if last video is selected 
      if (videos.indexOf(selected) != videos.length-1) {
        // Selects next video
        new_video = videos[videos.indexOf(selected)+1];
      }
      break;
    // Previous video
    case 'p':
      // Checks if first video is selected
      if (videos.indexOf(selected) != 0) {
        // Selects previous video
        new_video = videos[videos.indexOf(selected)-1];
      }
      break;
    // Scrolls to top
    case 't':
      window.scrollTo({top: 0});
      break;
    // Scrolls to bottom
    case 'b':
      window.scrollTo({top: document.documentElement.scrollHeight});
      break;
    // Visit video href
    case 'Enter':
      if (selected) {
        selected.querySelector('a').click();
      }
      break;
    default:
      break;
  }

  if (!new_video) {
    return;
  }

  if (selected) {
    unSelect(selected);
  }

  selected = new_video;

  Select(selected);
}

// Reset element
function unSelect(elem) {
  elem.style.border = 'none';
  elem.style.width = `calc( 100% / var(--ytd-rich-grid-items-per-row) - var(--ytd-rich-grid-item-margin) - 0.01px )`;
}

function Select(elem) {
  let menu = document.getElementById('masthead').clientHeight;

  elem.style.width = `calc( 100% / var(--ytd-rich-grid-items-per-row) - var(--ytd-rich-grid-item-margin) - 4.01px )`;
  elem.style.border = '2px solid white';

  // Scrolls to element, while taking into account nav bar height
  window.scrollTo({top: elem.offsetTop-menu});
}
