// Toggle Main Image when clicked
function toggle() {
    const s = document.getElementsByClassName('mainFrame')[0];
    const h1 = document.getElementById('mainHeader');
    if (String(s.src).endsWith('Icons/mainIcon.png')) {
        s.src = 'Icons/alexeidt.gif';
        s.style.width = "75%";
        h1.style.visibility = 'hidden';
        h1.style['padding-top'] = "10vh";
    } else {
        s.src = 'Icons/mainIcon.png';
        s.style.width = "85%";
        h1.style.visibility = 'visible';
        h1.style['padding-top'] = "30vh";
    }
}