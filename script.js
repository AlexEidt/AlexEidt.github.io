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