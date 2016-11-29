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

var ARCADE_MODE = true;

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
	initWin(queue.getResult("win"));

	initGame(
		queue.getResult("field"),
		queue.getResult("board"),
		queue.getResult("dude"),
		queue.getResult("bang"),
		queue.getResult("splatter"),
		queue.getResult("blood-1"),
		queue.getResult("blood-2"),
		queue.getResult("blood-3"));

	addChessPiece(queue.getResult("rook"), 638, 100, 30, 136, 2);
	addChessPiece(queue.getResult("knight"), 783, 101, 35, 138, 2);
	addChessPiece(queue.getResult("bishop"), 935, 102, 37, 196, 2);
	addChessPiece(queue.getResult("queen"), 1080, 103, 38, 217, 4);
	addChessPiece(queue.getResult("king"), 1228, 104, 38, 238, 4, true);
	addChessPiece(queue.getResult("bishop"), 1372, 105, 37, 196, 2);
	addChessPiece(queue.getResult("knight"), 1518, 106, 35, 138, 2);
	addChessPiece(queue.getResult("rook"), 1668, 107, 30, 136, 2);
	addChessPiece(queue.getResult("pawn"), 600, 177, 38, 150, 1);
	addChessPiece(queue.getResult("pawn"), 760, 178, 38, 150, 1);
	addChessPiece(queue.getResult("pawn"), 920, 179, 38, 150, 1);
	addChessPiece(queue.getResult("pawn"), 1075, 180, 38, 150, 1);
	addChessPiece(queue.getResult("pawn"), 1236, 181, 38, 150, 1);
	addChessPiece(queue.getResult("pawn"), 1388, 182, 38, 150, 1);
	addChessPiece(queue.getResult("pawn"), 1550, 183, 38, 150, 1);
	addChessPiece(queue.getResult("pawn"), 1705, 184, 38, 150, 1);

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
	if (currentScreen == SCREEN_WIN && ARCADE_MODE)
	{
		updateWin(timeSinceLastTick);
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

