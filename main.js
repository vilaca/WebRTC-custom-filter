
'use strict';

const canvas = window.canvas = document.querySelector('canvas');
const video = document.querySelector('video');
const fx = document.getElementById("fx");

const ctxCanvas = canvas.getContext("2d");
const ctxFx = fx.getContext("2d");

const width = 320;
const height = 240;
const stretch = 4;

canvas.height = height;
canvas.width = width;

fx.height = height * stretch;
fx.width = width * stretch;

const th = 200;
var bbb = 0;

function takepicture() {

    ctxCanvas.drawImage(video, 0, 0, canvas.width, canvas.height);

    bbb++;

    var rt = 0,
        gt = 0,
        bt = 0;

	const latest = ctxCanvas.getImageData(0,0,width,height);

    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {

			var idx = y * (width * 4) + (x * 4);
			
			var r = latest.data[idx];
			var g = latest.data[++idx];
			var b = latest.data[++idx];

            ctxFx.fillStyle = "rgba(" + (Math.abs(r - rt) < th ? 255 : 0) + "," + (Math.abs(g - gt) < th ? 255 : 0) + "," + (Math.abs(b - bt) < th ? 255 : 0) + ",255)";

            rt |= b;
            gt |= r;
            bt |= g;
			
			ctxFx.fillRect(x * stretch, y * stretch,  stretch,  stretch);
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