var Game = {};
Game.Boot = function(game){};
Game.Boot.prototype.preload = function(){
	this.load.image('button', 'images/wolf-angry.png');
};
Game.Boot.prototype.create = function(){
	this.game.canvas.id = 'canvas';
	game.stage.backgroundColor = "#111122";
    firstText = game.add.text(game.world.centerX, game.world.centerY, "To start game - press on wolf!",
    	{font:"32px Arial", fill:"#fff", align:"center"});
    firstText.anchor.set(0.5);
    button = game.add.button(game.world.centerX, game.world.centerY+80, 'button',
    	this.start,this,this,this);
    button.anchor.set(0.5);
};

Game.Boot.prototype.start = function(){
	this.game.state.start("Preload");
	};