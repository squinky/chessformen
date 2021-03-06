var field, board, boardBmp, dude, bang, splatter, instructions;
var blood1, blood2, blood3;
var leftBox, rightBox, topBox, bottomBox;

var MOVE_SPEED = 20;
var BG_SPEED_X = 4;
var BG_SPEED_Y = 16;

var BANG_TOGGLE = 50;
var gunFiring, gunfireSound, targetedPiece;
var bangTimeElapsed = 0;

var SHOTS_TO_BLOOD = 50;
var shotsFired = 0;

function initGame(f, b, d, ba, s, b1, b2, b3)
{
	field = new createjs.Bitmap(f);
	field.x = -128;
	field.y = -400;

	board = new createjs.Container();
	board.x = -640;
	board.y = 0;

	boardBmp = new createjs.Bitmap(b);
	blood1 = new createjs.Bitmap(b1);
	blood2 = new createjs.Bitmap(b2);
	blood3 = new createjs.Bitmap(b3);

	dude = new createjs.Bitmap(d);

	bang = new createjs.Bitmap(ba);
	bang.x = ACTUAL_WIDTH/2 - 35;
	bang.y = ACTUAL_HEIGHT/2 - 40;
	bang.alpha = 0;

	splatter = new createjs.Bitmap(s);
	splatter.x = ACTUAL_WIDTH/2 - 65;
	splatter.y = ACTUAL_HEIGHT/2 - 56;
	splatter.alpha = 0;

	instructions = new createjs.Text("WASD TO MOVE\nCLICK TO FIRE", "32px Black Ops One", "#ffffff");
	instructions.textAlign = "right";
	instructions.x = ACTUAL_WIDTH - 40;
	instructions.y = ACTUAL_HEIGHT - 100;

	leftBox = new createjs.Shape();
	leftBox.graphics.beginFill("#000000").drawRect(-399, 0, 400, ACTUAL_HEIGHT);
	rightBox = new createjs.Shape();
	rightBox.graphics.beginFill("#000000").drawRect(ACTUAL_WIDTH, 0, 400, ACTUAL_HEIGHT);
	topBox = new createjs.Shape();
	topBox.graphics.beginFill("#000000").drawRect(0, -399, ACTUAL_WIDTH, 400);
	bottomBox = new createjs.Shape();
	bottomBox.graphics.beginFill("#000000").drawRect(0, ACTUAL_HEIGHT, ACTUAL_WIDTH, 400);
}

function startGame()
{	
	currentScreen = SCREEN_GAME;

	stage.addChild(field);
	stage.addChild(board);
	stage.addChild(splatter);
	stage.addChild(bang);
	stage.addChild(dude);
	stage.addChild(instructions);

	stage.addChild(leftBox);
	stage.addChild(rightBox);
	stage.addChild(topBox);
	stage.addChild(bottomBox);

	board.addChild(boardBmp);
	for (var i = 0; i < chessPieces.length; i++)
	{
		board.addChild(chessPieces[i].bmp);
	}

	stage.addEventListener("stagemousedown", fireGun);
	stage.addEventListener("stagemouseup", stopFiring);

	createjs.Sound.play("music", { loop: -1 });
}

function endGame()
{	
	stage.removeAllEventListeners();
	stage.removeAllChildren();
	createjs.Sound.removeAllSounds();
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

	targetedPiece = null;
	for (var i = 0; i < chessPieces.length; i++)
	{
		chessPieces[i].move();
		if (chessPieces[i].isTargeted()) targetedPiece = chessPieces[i];
	}

	splatter.alpha = 0;

	if (gunFiring)
	{
		if (targetedPiece)
		{
			targetedPiece.hit();
			splatter.alpha = 1;
			shotsFired++;

			if (shotsFired == SHOTS_TO_BLOOD) stage.addChild(blood1);
			if (shotsFired == SHOTS_TO_BLOOD*2) stage.addChild(blood2);
			if (shotsFired == SHOTS_TO_BLOOD*5) stage.addChild(blood3);
		}

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
