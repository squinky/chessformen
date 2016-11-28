var win;

function initWin(bg)
{
	win = new createjs.Bitmap(bg);
}

function showWin()
{	
	currentScreen = SCREEN_WIN;

	stage.addChild(win);
}
