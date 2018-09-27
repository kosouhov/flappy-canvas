import '../styles/index.scss';

(function() {
	let CANVAS = document.getElementById('canvas'),
		CONTEXT = CANVAS.getContext('2d'),
		bird = new Image(),
		floor = new Image(),
		pipeTop = new Image(),
		pipeBottom = new Image(),
		background = new Image(),
		m = document.getElementById('message'),
		points = 0,
		zoom = 2,
		gap = 100,
		birdPosition = {},
		v = 0, //начальная скорость прыжка
		a = 0.35, //ускорение падения
		t = 0, //таймер прыжка
		y = 0, //начальная позиция прыжка
		gameState = 'startScreen',
		pipes = [];

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
		for (var i = 0; i < pipes.length; i++) {
			CONTEXT.drawImage(pipeTop, pipes[i].x, pipes[i].y, pipeTop.width * zoom, pipeTop.height * zoom);
			CONTEXT.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeTop.height * zoom + gap, pipeBottom.width * zoom, pipeBottom.height * zoom);
			//
			if ((birdPosition.x + bird.width * zoom > pipes[i].x) && (birdPosition.x < pipes[i].x + pipeTop.width * zoom)) {
				if ((birdPosition.y < pipes[i].y + pipeTop.height * zoom) || (birdPosition.y + bird.height * zoom > pipes[i].y + pipeTop.height * zoom + gap)) {
					gameState = 'gameOver';
					message('Game over');
				}
			}
			pipes[i].x -= 2;
			if (pipes[i].x == 128) {
				pipes.push({
					x: CANVAS.width,
					y: Math.floor(Math.random() * 200) - 270
				});
				points++;
				message(points + ' points');
			}
		}
		CONTEXT.drawImage(floor, 0, CANVAS.height - floor.height * zoom, floor.width * zoom, floor.height * zoom);
		gameState == 'gameProcess' ? requestAnimationFrame(render) : false;
		t += 1;
	}

	const bounce = () => {
		v = -5;
		t = 0;
		y = birdPosition.y;
	}

	const setZero = () => {
		birdPosition = {
			x: (CANVAS.width - bird.width * zoom) / 2,
			y: (CANVAS.height - bird.height * zoom) / 2
		};
		points = 0;
		pipes = [];
		pipes[0] = {
			x: CANVAS.width,
			y: -170
		};
		v = 0;
		t = 0;
		y = birdPosition.y;
	}

	const keydown = () => {
		switch (gameState) {
			case 'gameProcess':
				bounce();
				break;
			case 'startScreen':
				gameState = 'gameProcess';
				setZero();
				render();
				break;
			case 'gameOver':
				gameState = 'startScreen';
				setZero();
				render();
		}
	}

	const message = (mess) => {
		m.innerHTML = mess;
	}

	background.onload = function() {
		setZero();
		render();
		document.addEventListener('keydown', keydown);
		document.addEventListener('touchstart', keydown);
	}

})();