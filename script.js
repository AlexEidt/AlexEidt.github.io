// Toggle Main Image when clicked.
function toggle(self) {
    if (document.getElementsByClassName('left')[0].innerHTML.includes('mainFrame')) {
        const h1 = document.getElementById('mainHeader');
        const mainImage = document.getElementsByClassName('mainFrame')[0];
        const src = String(self.src).split('Icons/').pop();
    
        switch (src) {
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
                mainImage.style.width = "85%";
                h1.style.visibility = 'visible';
                h1.style['padding-top'] = '30vh';
                mainImage.src = 'Icons/mainIcon.png';
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
    if (leftHeader.length > 0 && leftHeader[0].innerHTML.includes(self.innerHTML || self)) {
        left.innerHTML = document.getElementById('storage').innerHTML;
        left.style.width = '40%';
        document.getElementsByClassName('right')[0].style.width = '60%';
    } else {
        left.innerHTML = document.getElementById(self.innerHTML || self).innerHTML;
        left.style.width = '55%';
        document.getElementsByClassName('right')[0].style.width = '45%';
    }
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