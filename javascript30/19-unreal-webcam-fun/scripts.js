const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(error => console.error('Something wrong!!!', error));
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    console.log(width, height);
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        //pixels = redEffect(pixels);
        // pixels = rgbSplit(pixels);
        pixels = greenScreen(pixels);
        // ctx.globalAlpha = .1;
        ctx.putImageData(pixels,0,0);

    }, 16)
};

function takePhoto() {
    snap.currentTim = 0;
    snap.play();

    const data = canvas.toDataURL('type/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="It's my photo"/>`
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] + 100; //red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; //green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i]; //red
        pixels.data[i + 500] = pixels.data[i + 1]; //green
        pixels.data[i - 550] = pixels.data[i + 2]; //blue
    }
    return pixels;
}

function greenScreen(pixels) {
    let levels = {};
    document.querySelectorAll('.rgb input').forEach(input => {
        levels[input.name] = input.value;
        console.log(levels)
    });
    let red, green, blue, alpha;
    for (let i = 0; i < pixels.data.length; i += 4) {
        red = pixels.data[i]; //red
        green = pixels.data[i + 1]; //green
        blue = pixels.data[i + 2]; //blue
        alpha = pixels.data[i + 3]; //alpha

        if (red >= levels.rmin && red <= levels.rmax
        && green >= levels.gmin && green <= levels.gmax
        && blue >= levels.bmin && blue <= levels.bmax) {
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);