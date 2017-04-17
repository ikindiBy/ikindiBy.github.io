Game.Win = function(game){
	var deathText;
	var button
};

Game.Win.prototype.create = function(){
    game.stage.backgroundColor = "#015501";
    deathText = game.add.text(game.world.centerX, game.world.centerY, "You are win!",
    	{font:"48px Arial", fill:"#fff", align:"center"});
    deathText.anchor.set(0.5);
    button = game.add.button(game.world.centerX, game.world.centerY+80, 'button',
    this.restart,this,this,this);
    this.camera.follow(deathText);
    this.camera.follow(button);
    button.anchor.set(0.5);
};

Game.Win.prototype.restart = function(){
	this.game.state.start("Main");
};