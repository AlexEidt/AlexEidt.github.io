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
    let width = board.width;
    let height = board.height;

    const ctx = board.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    let angleX = e.pageX / window.innerWidth * 4;
    let angleY = e.pageY / window.innerHeight * 4;

    let cosX = Math.cos(angleX);
    let sinX = Math.sin(angleX);
    let cosY = Math.cos(angleY);
    let sinY = Math.sin(angleY);
    let cosZ = Math.cos(angleX * angleY);
    let sinZ = Math.sin(angleX * angleY);

    let m00 = cosY*cosZ;
    let m01 = -cosY*sinZ;
    let m02 = sinY;
    let m10 = cosX*sinZ + sinX*sinY*cosZ;
    let m11 = cosX*cosZ - sinX*sinY*sinZ;
    let m12 = -sinX*cosY;
    let m20 = sinX*sinZ - cosX*sinY*cosZ;
    let m21 = sinX*cosZ + cosX*sinY*sinZ;
    let m22 = cosX*cosY;

    let proj = [];
    for (let v of cube) {
        let rx = m00*v[0] + m01*v[1] + m02*v[2];
        let ry = m10*v[0] + m11*v[1] + m12*v[2];
        let rz = m20*v[0] + m21*v[1] + m22*v[2];

        let z = 1 / (2 - rz);

        let px = rx*z * (width / 2) + (width / 2);
        let py = ry*z * (width / 2) + (height / 2);

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

    // window.requestAnimationFrame(drawCube);
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