import '../styles/index.scss';

(function() {
	let CANVAS = document.getElementById('canvas'),
		CONTEXT = CANVAS.getContext('2d'),
		bird = new Image(),
		floor = new Image(),
		pipeTop = new Image(),
		pipeBottom = new Image(),
		background = new Image(),
		zoom = 2,
		gap = 80,
		birdPosition = {x: 0, y: 0},
		v = 0, //начальная скорость прыжка
		a = 0.25, //ускорение падения
		t = 0, //таймер прыжка
		y = 0; //начальная позиция прыжка

	bird.src = require('../images/bird-center.png');
	floor.src = require('../images/floor.png');
	pipeTop.src = require('../images/pipe-top.png');
	pipeBottom.src = require('../images/pipe-bottom.png');
	background.src = require('../images/background.png');
	CONTEXT.mozImageSmoothingEnabled = false;
	CONTEXT.webkitImageSmoothingEnabled = false;
	CONTEXT.msImageSmoothingEnabled = false;
	CONTEXT.imageSmoothingEnabled = false;

	const render = () => {
		birdPosition.y = y + v * t + a * Math.pow(t, 2) / 2;
		CONTEXT.drawImage(background, 0, 0, background.width * zoom, background.height * zoom);
		CONTEXT.drawImage(bird, birdPosition.x, birdPosition.y, bird.width * zoom, bird.height * zoom);
		CONTEXT.drawImage(bird, birdPosition.x, birdPosition.y, bird.width * zoom, bird.height * zoom);
		CONTEXT.drawImage(floor, 0, CANVAS.height - floor.height * zoom, floor.width * zoom, floor.height * zoom);
		requestAnimationFrame(render);
		t += 1;
	}

	const bounce = () => {
		v = -5;
		t = 0;
		y = birdPosition.y;
	}

	document.addEventListener('keydown', bounce);

	background.onload = render;
})();