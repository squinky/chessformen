var win;
var winTimeElapsed = 0;

function initWin(bg)
{
	win = new createjs.Bitmap(bg);
}

function showWin()
{	
	currentScreen = SCREEN_WIN;

	stage.addChild(win);
}

function updateWin(timeSinceLastTick)
{
	winTimeElapsed += timeSinceLastTick;
	if (winTimeElapsed > 10000)
	{
		window.location.reload(true);
	}
}
