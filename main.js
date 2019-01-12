'use strict';

const canvas = window.canvas = document.querySelector('canvas');
const video = document.querySelector('video');
const fx = document.getElementById("fx");

const ctxCanvas = canvas.getContext("2d");
const ctxFx = fx.getContext("2d");

const width = 800;
const height = 600;

canvas.height = height;
canvas.width = width;

fx.height = height;
fx.width = width;

const th = 200;
var bbb = 0;

const noob = ctxFx.getImageData(0, 0, width, height);

function takepicture() {

    ctxCanvas.drawImage(video, 0, 0, canvas.width, canvas.height);

    bbb++;

    var rt = 0,
        gt = 0,
        bt = 0;

    const latest = ctxCanvas.getImageData(0, 0, width, height);

    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {

            const idx = y * (width * 4) + (x * 4);

            var r = latest.data[idx];
            var g = latest.data[idx + 1];
            var b = latest.data[idx + 2];

            noob.data[idx] = (Math.abs(r - rt) < th ? 255 : 0);
            noob.data[idx + 1] = (Math.abs(g - gt) < th ? 255 : 0);
            noob.data[idx + 2] = (Math.abs(b - bt) < th ? 255 : 0);
            noob.data[idx + 3] = 255;

            rt |= b;
            gt |= r;
            bt |= g;
        }
    }

    ctxFx.putImageData(noob, 0, 0);
};

setInterval(takepicture, 20);

const constraints = {
    audio: false,
    video: true
};

function handleSuccess(stream) {
    video.srcObject = stream;
}

function handleError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);