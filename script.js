$(document).ready(function() {
    // Add year to copyright
    document.getElementById('copyright').innerHTML += ` ${new Date().getFullYear()}`;
});

// Toggle Dark Mode when the Moon Icon is clicked.
function toggleDarkMode() {
    const stylesheet = document.getElementById('stylesheet');
    const mainImage = document.getElementsByClassName('mainFrame')[0];
    const storageImage = document.getElementById('storage').getElementsByClassName('mainFrame')[0];
    const h1 = document.getElementById('mainHeader');
    h1.style.visibility = 'visible';
    h1.style['padding-top'] = '30vh';

    if (stylesheet.getAttribute('href') === 'style.css') {
        stylesheet.href = 'dark-theme.css';
        mainImage.src = 'Icons/moon.gif';
        mainImage.style.width = '50%';
        storageImage.src = 'Icons/moon.gif';
        storageImage.style.width = '50%';
    } else {
        stylesheet.href = 'style.css';
        mainImage.src = 'Icons/mainIcon.png';
        mainImage.style.width = '75%';
        storageImage.src = 'Icons/mainIcon.png';
        storageImage.style.width = '75%';
    }
}

// Toggle Main Image when clicked.
function toggle(self) {
    if (document.getElementsByClassName('left')[0].innerHTML.includes('mainFrame')) {
        const h1 = document.getElementById('mainHeader');
        const mainImage = document.getElementsByClassName('mainFrame')[0];
        const src = String(self.src).split('Icons/').pop();
    
        switch (src) {
            case 'moon.gif':
            case 'mainIcon.png':
                mainImage.style.width = '75%';
                h1.style['padding-top'] = '10vh';
                mainImage.src = 'Icons/alexeidt.gif';
                h1.style.visibility = 'hidden';
                break;
            case 'python.png':
                mainImage.style.width = '100%';
                h1.style['padding-top'] = '0vh';
                mainImage.src = 'Icons/pythons.gif';
                h1.style.visibility = 'hidden';
                break;
            case 'alexeidt.gif':
            case 'pythons.gif':
                h1.style.visibility = 'visible';
                h1.style['padding-top'] = '30vh';
                if (document.getElementById('stylesheet').getAttribute('href') === 'style.css') {
                    mainImage.src = 'Icons/mainIcon.png';
                    mainImage.style.width = "85%";
                } else {
                    mainImage.src = 'Icons/moon.gif';
                    mainImage.style.width = '50%';
                }
                break;
        }
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