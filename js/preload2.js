
Game.Preload = function(game){};
// var map;
// 	var layer;

Game.Preload.prototype.preload = function(){

    // game.load.tilemap('map', 'images/level.json', null, Phaser.Tilemap.TILED_JSON);
//  game.load.image('tiles', 'assets/tileset.png');

	this.load.tilemap('map', 'images/level1.csv');
	// this.load.tilemap('map', 'images/level1.csv');
	this.load.image('tileset', 'images/tileset.png');

	game.stage.backgroundColor = '#112233';
};

Game.Preload.prototype.create = function(){
	this.game.state.start("Main");
};