// Toggle Main Image when clicked
function toggle(self) {
    const h1 = document.getElementById('mainHeader');
    const mainImage = document.getElementsByClassName('mainFrame')[0];
    const src = String(self.src).split('Icons/').pop();

    switch (src) {
        case 'mainIcon.png':
            mainImage.style.width = "75%";
            h1.style['padding-top'] = "10vh";
            mainImage.src = 'Icons/alexeidt.gif';
        case 'python.png':
            if (src === 'python.png') {
                mainImage.style.width = "100%";
                h1.style['padding-top'] = "0vh";
                mainImage.src = 'Icons/pythons.gif';
            }
            h1.style.visibility = 'hidden';
            break;
        case 'alexeidt.gif':
        case 'pythons.gif':
            mainImage.style.width = "85%";
            h1.style.visibility = 'visible';
            h1.style['padding-top'] = "30vh";
            mainImage.src = 'Icons/mainIcon.png';
            break;
    }
}