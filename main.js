'use strict';

const video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');
const fx = document.getElementById("fx");
const ctxCanvas = canvas.getContext("2d");
const ctxFx = fx.getContext("2d");

const width = 600;
const height = 300;

canvas.width = width;
canvas.height = height;

fx.width = width;
fx.height = height;

var bbb = 0;
const th = 200;

function takepicture() {

    ctxCanvas.drawImage(video, 0, 0, canvas.width, canvas.height);

    bbb++;

    var rt = 0,
        gt = 0,
        bt = 0;

	const latest = ctxCanvas.getImageData(0,0,width,height);
	const noob = ctxCanvas.getImageData(0,0,width,height);

    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {

			var r = latest.data[((y * (latest.width * 4)) + (x * 4)) + 0];
			var g = latest.data[((y * (latest.width * 4)) + (x * 4)) + 1];
			var b = latest.data[((y * (latest.width * 4)) + (x * 4)) + 2];

            ctxFx.fillStyle = "rgba(" + (Math.abs(r - rt) < th ? 255 : 0) + "," + (Math.abs(g - gt) < th ? 255 : 0) + "," + (Math.abs(b - bt) < th ? 255 : 0) + ",255)";

            rt |= b;
            gt |= r;
            bt |= g;
			
			ctxFx.fillRect(x, y, 1, 1);

        }
    }

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