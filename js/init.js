var stage;
var ACTUAL_WIDTH = 1024;
var ACTUAL_HEIGHT = 640;
var ASPECT_RATIO = 16/10;

var currentScreen;
var SCREEN_LOADING = 0;
var SCREEN_TITLE = 1;
var SCREEN_GAME = 2;
var SCREEN_WIN = 3;

var queue;
var lastTickTime;
var loadText;

var keysPressed = [];
var KEY_LEFT = 65;
var KEY_UP = 87;
var KEY_RIGHT = 68;
var KEY_DOWN = 83;

window.addEventListener('resize', resize, false);

function init()
{
	stage = new createjs.Stage("gameCanvas");
	stage.enableMouseOver();
	createjs.Touch.enable(stage);
	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(40);
	resize();
	
	showLoadingScreen();

	this.document.onkeydown = keydown;
	this.document.onkeyup = keyup;
	
	queue = new createjs.LoadQueue(true);
	queue.installPlugin(createjs.Sound);
	queue.on("complete", loadingComplete, this);
	queue.loadManifest("manifest.json");
}

function showLoadingScreen()
{
	currentScreen = SCREEN_LOADING;
	loadText = new createjs.Text("LOADING: 0%", "32px Black Ops One", "#ffffff");
	loadText.textAlign = "center";
	loadText.x = ACTUAL_WIDTH/2;
	loadText.y = ACTUAL_HEIGHT/2 - 16;
	stage.addChild(loadText);
}

function loadingComplete()
{
	stage.removeChild(loadText);

	initTitle(queue.getResult("title"));
	initGame(queue.getResult("field"), queue.getResult("board"), queue.getResult("dude"), queue.getResult("bang"));

	showTitle();
}

function tick()
{
	var timeSinceLastTick = createjs.Ticker.getTime() - lastTickTime;
	lastTickTime = createjs.Ticker.getTime();

	if (currentScreen == SCREEN_LOADING)
	{
		loadText.text = "LOADING: "+Math.floor(queue.progress*100)+"%";
	}
	if (currentScreen == SCREEN_TITLE)
	{
		updateTitle(timeSinceLastTick);
	}
	if (currentScreen == SCREEN_GAME)
	{
		updateGame(timeSinceLastTick);
	}
	
	stage.update();
}

function keydown(event)
{
    keysPressed[event.keyCode] = true;
}

function keyup(event)
{
    keysPressed[event.keyCode] = false;
}

function resize()
{	
	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight; 
	   
	if (stage.canvas.width/stage.canvas.height < ASPECT_RATIO)
	{
		stage.scaleX = stage.canvas.width/ACTUAL_WIDTH;
		stage.scaleY = stage.scaleX;
		stage.y = (stage.canvas.height-(ACTUAL_HEIGHT*stage.scaleY))/2
		stage.x = 0;
	}
	else
	{
		stage.scaleY = stage.canvas.height/ACTUAL_HEIGHT;
		stage.scaleX = stage.scaleY;
		stage.x = (stage.canvas.width-(ACTUAL_WIDTH*stage.scaleX))/2
		stage.y = 0;
	}
}

