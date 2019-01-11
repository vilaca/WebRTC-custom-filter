'use strict';

const video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');
canvas.width = 300;
canvas.height = 200;

const fx = document.getElementById("fx");

fx.width = 300*4;
fx.height = 200*4;

canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

var bbb = 0;

function takepicture() {

    var ctxCanvas = canvas.getContext("2d");

    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    var ctxFx = fx.getContext("2d");

    bbb++;

    var rt = 0,
        gt = 0,
        bt = 0;

    var th = 200;

    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {

            var imgDataOld = ctxCanvas.getImageData(x, y, 1, 1);
            
			var r = imgDataOld.data[0];
            var g = imgDataOld.data[1];
            var b = imgDataOld.data[2];

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