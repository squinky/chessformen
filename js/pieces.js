var chessPieces = [];

function ChessPiece(bmp, x, y, regX, regY, isKing)
{
	this.bmp = new createjs.Bitmap(bmp);
	this.bmp.x = x;
	this.bmp.y = y;
	this.bmp.regX = regX;
	this.bmp.regY = regY;
	this.isKing = isKing;
}

function addChessPiece(bmp, x, y, regX, regY, isKing = false)
{
	chessPieces.push(new ChessPiece(bmp, x, y, regX, regY, isKing));
}
