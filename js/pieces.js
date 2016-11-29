var chessPieces = [];

var CHESS_PIECE_HEALTH = 10;
var MOVE_BUFFER = 100;

function ChessPiece(bmp, x, y, regX, regY, healthMultiplier, isKing)
{
	this.bmp = new createjs.Bitmap(bmp);
	this.bmp.x = x;
	this.bmp.y = y;
	this.bmp.regX = regX;
	this.bmp.regY = regY;
	this.health = healthMultiplier*CHESS_PIECE_HEALTH;
	this.isKing = isKing;
}

ChessPiece.prototype.move = function()
{
	var p = board.localToLocal(this.bmp.x, this.bmp.y, stage);
	
	if (p.x > ACTUAL_WIDTH/2 - MOVE_BUFFER && p.x < ACTUAL_WIDTH/2 + MOVE_BUFFER &&
		p.y > ACTUAL_HEIGHT/2 && p.y < ACTUAL_HEIGHT/2 + MOVE_BUFFER*3)
	{
		if (p.x < ACTUAL_WIDTH/2 && this.bmp.x > ACTUAL_WIDTH/2) this.bmp.x--;
		if (p.x > ACTUAL_WIDTH/2 && this.bmp.x < 2304 - ACTUAL_WIDTH/2) this.bmp.x++;
		if (p.y - MOVE_BUFFER*2 < ACTUAL_HEIGHT/2 && this.bmp.y > 20) this.bmp.y--;
		if (p.x - MOVE_BUFFER*2 > ACTUAL_HEIGHT/2 && this.bmp.y < 960 - ACTUAL_HEIGHT/2) this.bmp.y++;
	}
}

ChessPiece.prototype.isTargeted = function()
{
	var p = stage.localToLocal(ACTUAL_WIDTH/2, ACTUAL_HEIGHT/2, this.bmp);
	return this.bmp.hitTest(p.x, p.y);
}

ChessPiece.prototype.hit = function()
{
	this.health--;
	if (this.health <= 0)
	{
		this.bmp.parent.removeChild(this.bmp);
		chessPieces.splice(chessPieces.indexOf(this), 1);

		if (this.isKing)
		{
			endGame();
			showWin();
		}
	}
}

function addChessPiece(bmp, x, y, regX, regY, healthMultiplier, isKing = false)
{
	chessPieces.push(new ChessPiece(bmp, x, y, regX, regY, healthMultiplier, isKing));
}
