var title;

function initTitle(bg)
{
	title = new createjs.Bitmap(bg);
}

function showTitle()
{	
	currentScreen = SCREEN_TITLE;

	stage.addChild(title);

	title.addEventListener("click", handleTitleClick);
}

function hideTitle()
{	
	stage.removeAllEventListeners();
	stage.removeAllChildren();
}

function handleTitleClick(event)
{
	hideTitle();
	startGame();
}

function updateTitle(timeSinceLastTick)
{
	if (keysPressed.indexOf(true) > -1) handleTitleClick();
}
