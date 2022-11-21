$(document).ready(function() {
    // Add year to copyright
    document.getElementById('copyright').innerHTML += ` ${new Date().getFullYear()}`;

    drawCube({pageX: 0, pageY: 0});
});

let cube = [];
for (let i = 0; i < 8; i++) {
    var n = i.toString(2);
    n = "000".substring(n.length) + n;
    
    cube.push([
        parseFloat(n[0]) - 0.5,
        parseFloat(n[1]) - 0.5,
        parseFloat(n[2]) - 0.5
    ])
}

function drawCube(e) {
    const board = document.getElementById('canvas');
    const width = board.width;
    const height = board.height;

    const ctx = board.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    const angleX = e.pageX / window.innerWidth * 3;
    const angleY = e.pageY / window.innerHeight * 3;

    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosZ = Math.cos(angleX + angleY);
    const sinZ = Math.sin(angleX + angleY);

    const m00 = cosY*cosZ;
    const m01 = -cosY*sinZ;
    const m02 = sinY;
    const m10 = cosX*sinZ + sinX*sinY*cosZ;
    const m11 = cosX*cosZ - sinX*sinY*sinZ;
    const m12 = -sinX*cosY;
    const m20 = sinX*sinZ - cosX*sinY*cosZ;
    const m21 = sinX*cosZ + cosX*sinY*sinZ;
    const m22 = cosX*cosY;

    let proj = [];
    for (let v of cube) {
        const rx = m00*v[0] + m01*v[1] + m02*v[2];
        const ry = m10*v[0] + m11*v[1] + m12*v[2];
        const rz = m20*v[0] + m21*v[1] + m22*v[2];

        const z = 1 / (2 - rz);

        const px = rx*z * (width / 2) + (width / 2);
        const py = ry*z * (width / 2) + (height / 2);

        proj.push([px, py]);
    }

    ctx.strokeStyle = 'rgba(0, 0, 0, 255)';
    ctx.lineWidth = 4;
    for (let i = 0; i < 4; i++) {
        drawLine(ctx, proj[i], proj[i + 4]);
    }
    for (let i = 0; i < 8; i += 2) {
        drawLine(ctx, proj[i], proj[i + 1]);
    }
    for (let i = 0; i < 2; i++) {
        drawLine(ctx, proj[i], proj[i + 2]);
        drawLine(ctx, proj[i + 4], proj[i + 6]);
    }
}

function drawLine(ctx, a, b) {
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
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