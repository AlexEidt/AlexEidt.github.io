$(document).ready(function() {
    // Add year to copyright
    document.getElementById('copyright').innerHTML += ` ${new Date().getFullYear()}`;

    // Move background with mouse.
    // Code from: https://css-tricks.com/moving-backgrounds-with-mouse-position/
    const background = document.querySelector(".left");
    background.addEventListener("mousemove", (e) => {
        background.style.backgroundPositionX = -e.offsetX + "px";
    });
});

// Toggle background image on left side on click.
function toggleBackground() {
    const background = document.getElementsByClassName('left')[0];
    switch (background.style.backgroundImage) {
        case 'url("canyon.jpg")':
            background.style.backgroundImage = 'url("road.jpg")';
            break;
        case 'url("road.jpg")':
            background.style.backgroundImage = 'url("rocks.jpg")';
            break;
        case 'url("rocks.jpg")':
            background.style.backgroundImage = 'url("forest.jpg")';
            break;
        case 'url("forest.jpg")':
        default:
            background.style.backgroundImage = 'url("canyon.jpg")';
            break;
    }
}

// Create Image carousels given a list of file names.
function createCarousel(projectName, files, ID) {
    const carouselID = `${ID ? ID : projectName}-Slideshow`;
    const markerID = `${ID ? ID : projectName}-Marker`;
    const src = document.getElementById(carouselID).src;
    let idx = files.indexOf(String(src).split('/').pop());
    idx = idx == files.length - 1 ? 0 : idx + 1;
    document.getElementById(carouselID).src = `Projects/${projectName}/${files[idx]}`;
    if (idx == 0) {
        document.getElementById(markerID).style.width = `${Math.floor(100 / files.length)}%`;
    } else {
        let width = document.getElementById(markerID).style.width;
        width = parseInt(width.slice(0, -1));
        document.getElementById(markerID).style.width = `${width + Math.floor(100 / files.length)}%`;
    }
}

// Toggle Left side of screen when Link is clicked.
function toggleLeft(self, id) {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w < 550) {
        return null;
    }
    const left = document.getElementsByClassName('left')[0];
    if (self !== 'Timeline') {
        // Scroll to top of left container on click.
        left.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
        });
    }
    if (left.innerHTML.includes('mainFrame')) {
        document.getElementById('storage').innerHTML = left.innerHTML;
    }
    const leftHeader = left.getElementsByClassName('left-header');
    if (leftHeader.length > 0 && leftHeader[0].innerHTML.includes(self.innerText || self)) {
        left.innerHTML = document.getElementById('storage').innerHTML;
        left.style = '';
        document.getElementsByClassName('right')[0].style = '';
    } else {
        left.innerHTML = document.getElementById(self.innerText || self).innerHTML;
        left.style.width = '55%';
        document.getElementsByClassName('right')[0].style.width = '45%';
    }
    // If returning to timeline, auto scroll to location on timeline.
    if (self === 'Timeline') {
        document.getElementById(`${id} ID`).scrollIntoView({
            block: 'center'
        });
    }
}

// Remove styles on small page styles to allow CSS media query to work.
window.onresize = function() {
    // w -> Width of page.
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const left = document.getElementsByClassName('left')[0];
    if (w < 550) {
        left.style = '';
        document.getElementsByClassName('right')[0].style = '';
        if (!left.innerHTML.includes('mainFrame')) {
            left.innerHTML = document.getElementById('storage').innerHTML;
        }
    }
};