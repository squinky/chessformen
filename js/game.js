var field, board, dude, bang, instructions;

var MOVE_SPEED = 20;
var BG_SPEED_X = 4;
var BG_SPEED_Y = 16;

var BANG_TOGGLE = 50;
var gunFiring, gunfireSound;
var bangTimeElapsed = 0;

function initGame(f, b, d, ba)
{
	field = new createjs.Bitmap(f);
	field.x = -128;
	field.y = -400;

	board = new createjs.Bitmap(b);
	board.x = -640;
	board.y = 0;

	dude = new createjs.Bitmap(d);

	bang = new createjs.Bitmap(ba);
	bang.x = ACTUAL_WIDTH/2 - 35;
	bang.y = ACTUAL_HEIGHT/2 - 40;
	bang.alpha = 0;

	instructions = new createjs.Text("WASD TO MOVE\nCLICK TO FIRE", "32px Black Ops One", "#ffffff");
	instructions.textAlign = "right";
	instructions.x = ACTUAL_WIDTH - 40;
	instructions.y = ACTUAL_HEIGHT - 100;
}

function startGame()
{	
	currentScreen = SCREEN_GAME;

	stage.addChild(field);
	stage.addChild(board);
	stage.addChild(bang);
	stage.addChild(dude);
	stage.addChild(instructions);

	stage.addEventListener("stagemousedown", fireGun);
	stage.addEventListener("stagemouseup", stopFiring);
}

function endGame()
{	
	stage.removeAllEventListeners();
	stage.removeAllChildren();
}

function updateGame(timeSinceLastTick)
{
	if (keysPressed[KEY_LEFT])
	{
		if (board.x < 0) board.x += MOVE_SPEED;
		if (field.x < 0) field.x += BG_SPEED_X;
	}
	if (keysPressed[KEY_RIGHT])
	{
		if (board.x > -1280) board.x -= MOVE_SPEED;
		if (field.x > -256) field.x -= BG_SPEED_X;
	}
	if (keysPressed[KEY_UP])
	{
		if (board.y < 500) board.y += MOVE_SPEED;
		if (field.y < 0) field.y += BG_SPEED_Y;
	}
	if (keysPressed[KEY_DOWN])
	{
		if (board.y > -100) board.y -= MOVE_SPEED;
		if (field.y > -450) field.y -= BG_SPEED_Y;
	}

	if (gunFiring)
	{
		if (!gunfireSound) gunfireSound = createjs.Sound.play("gunfire", { loop: -1 });

		bangTimeElapsed += timeSinceLastTick;
		if (bangTimeElapsed >= BANG_TOGGLE)
		{
			if (bang.alpha == 0) bang.alpha = 1;
			else bang.alpha = 0;
			bangTimeElapsed = 0;
		}
	}
	else
	{
		if (gunfireSound)
		{
			gunfireSound.stop();
			gunfireSound = null;
		}

		bang.alpha = 0;
		bangTimeElapsed = 0;
	}
}

function fireGun(event)
{
	gunFiring = true;
}

function stopFiring(event)
{
	gunFiring = false;
}
