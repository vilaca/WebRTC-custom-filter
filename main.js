'use strict';

const video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');
const fx = document.getElementById("fx");
const ctxCanvas = canvas.getContext("2d");
const ctxFx = fx.getContext("2d");

canvas.width = 300;
canvas.height = 200;

fx.width = 300*4;
fx.height = 200*4;

var bbb = 0;

function takepicture() {

    ctxCanvas.drawImage(video, 0, 0, canvas.width, canvas.height);

    bbb++;

    var rt = 0,
        gt = 0,
        bt = 0;

    var th = 200;

	var imgDataOld = ctxCanvas.getImageData(0,0,300,200);

    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {

			var r = imgDataOld.data[((y * (imgDataOld.width * 4)) + (x * 4)) + 0];
			var g = imgDataOld.data[((y * (imgDataOld.width * 4)) + (x * 4)) + 1];
			var b = imgDataOld.data[((y * (imgDataOld.width * 4)) + (x * 4)) + 2];

            ctxFx.fillStyle = "rgba(" +
                (Math.abs(r - rt) < th ? 255 : 0) +
                "," +
                (Math.abs(g - gt) < th ? 255 : 0) +
                "," +
                (Math.abs(b - bt) < th ? 255 : 0) +
                ",255)";

            rt |= b;
            gt |= r;
            bt |= g;

			var d = (Math.abs(r - rt) + Math.abs(g - gt) + Math.abs(b - bt)) / 2.5;

            if (bbb % 48 > 24) {
				d = 0;
            } else 
				if (d>=x*4) {
					d = 0; 
            }
            ctxFx.fillRect(x*4-d, y*4, 4+d, 4);
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