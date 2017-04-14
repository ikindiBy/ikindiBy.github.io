
Game.Preload = function(game){};

Game.Preload.prototype.preload = function(){

	this.load.tilemap('map', 'images/level0.csv');
	this.load.tilemap('mapTwo', 'images/levelTwo.csv');
	this.load.image('tileset', 'images/tileset.png');

	this.load.image('platform', 'images/uk.JPG');
	this.load.image('cristal', 'images/сristl.png');
	this.load.image('enemy', 'images/wolf-angry.png');
	this.load.image('lives', 'images/hero-small.png');
	this.load.image('button', 'images/wolf-angry.png');
	this.load.image('arrow', 'images/arrow.png');
	this.load.spritesheet('hunter','images/hero-walk-full.png', 78, 124, 16);
	this.load.spritesheet('wolf','images/wolf-walk.png', 100, 51, 10);

	this.load.audio('mainTheme', 'sound/theme.mp3');


	game.stage.backgroundColor = '#85b5e1';
};

Game.Preload.prototype.create = function(){
	this.game.state.start("Main");
};