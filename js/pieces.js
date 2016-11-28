var chessPieces = [];

var CHESS_PIECE_HEALTH = 10;

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

ChessPiece.prototype.isTargeted = function()
{
	var p = this.bmp.globalToLocal(ACTUAL_WIDTH/2, ACTUAL_HEIGHT/2);
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
