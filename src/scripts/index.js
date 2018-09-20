import '../styles/index.scss';

let CANVAS = document.getElementById('canvas'),
	CONTEXT = getContext('2d'),
	bird = new Image(),
	floor = new Image(),
	pipeTop = new Image(),
	pipeBottom = new Image(),
	background = new Image();

bird.src = '../images/bird-center.png';
floor.src = '../images/floor.png';
pipeTop.src = '../images/pipe-top.png';
pipeBottom.src = '../images/pipe-bottom.png';
background.src = '../images/background.png';

