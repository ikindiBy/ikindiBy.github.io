Game.Main = function(game){
	var map, layer;
	var player;
	var platforms;
	var cursors;
	var jumpButton;
	var cristals, scoreCrist;
	this.score = 0;
	var scoreText;
	var lives;
	var wolf_1;
	this.speedPlayer = 300;
	this.speedJump = 300;
	var controls;
	this.shootTime = 0;
	var arrows;
	this.lastDirection = true;
	var lastY, sound, timeStartGame;
	this.rightDirectionWolf = false;
    this.level = 1;
};

	

Game.Main.prototype.create = function(game){
	this.score = 0;
	timeStartGame = this.time.now;
	game.stage.backgroundColor = '#85b5e1';
	sound = game.add.audio('mainTheme');
	sound.loopFull(0.7);


	map = game.add.tilemap('map',64,64); 
    map.addTilesetImage('tileset');

    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(0,2);
    map.setTileIndexCallback(5,this.removeLife,this);
    map.setTileIndexCallback(6,this.nextLevel,this);

	this.bounds = new Phaser.Rectangle(0, 0, 1200, 510);  //bounds of place
	this.game.physics.startSystem(Phaser.Physics.ARCADE);

	player = game.add.sprite(20,300, 'hunter');
	player.scale.setTo(0.7,0.7);
	player.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true; // столкновение игрока со стенами 
	player.body.gravity.y = 500;
	player.body.bounce.y=0.1;
	player.animations.add('left', [0,1,2,3,4,5],12,true);
	player.animations.add('right', [6,7,8,9,10,11],12,true);
	player.animations.add('idle_R', [6],1,true);
	player.animations.add('idle_L', [5],1,true);
	player.animations.add('flying_L', [4],1,true);
	player.animations.add('flying_R', [7],1,true);
	player.animations.add('shooting', [12,13,14,15], 4,true);
	this.camera.follow(player);
	controls={
		right:this.input.keyboard.addKey(Phaser.Keyboard.D ),
		left:this.input.keyboard.addKey(Phaser.Keyboard.A ),
		up:this.input.keyboard.addKey(Phaser.Keyboard.W),
		shoot:this.input.keyboard.addKey(Phaser.Keyboard.Q)
	};

	platforms = game.add.physicsGroup();
	platforms.create(100,400,'platform');
	platforms.setAll('body.immovable', true);  //неподвижность платформ

	cristals = game.add.physicsGroup();
	cristals.create(250, 380, 'cristal');
	cristals.create(400, 240, 'cristal');
	cristals.create(530, 330, 'cristal');
	cristals.create(650, 300, 'cristal');
	cristals.create(900, 320, 'cristal');
	cristals.create(800, 400, 'cristal');
	cristals.setAll('body.immovable', true);

	lives = game.add.group();
	for(var i=0;i<3;i++){
		lives.create(650+i*40,10,'lives');
	};
	lives.fixedToCamera = true;

	enemies = game.add.physicsGroup();

	scoreCrist = game.add.group();
	scoreCrist.create(20, 10,'cristal');
	scoreCrist.scale.setTo(0.7,0.7);
	scoreText = game.add.text(45,10, ": "+this.score +"", 
		{font:"24px Arial", fill:"#fff", align:"center"});
	scoreText.fixedToCamera = true;
	scoreCrist.fixedToCamera = true;

	cursors = game.input.keyboard.createCursorKeys();
	jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	wolf_0 = new EnemyWolf(0,game,200, player.y+120,70);
	wolf_1 = new EnemyWolf(0,game,820, player.y+120,160);
	wolf_2 = new EnemyWolf(0,game,1080, player.y+60,160);
	
	arrows = game.add.group();
	arrows.enableBody = true;
	arrows.physicsBodyType = Phaser.Physics.ARCADE;
	arrows.createMultiple(15, 'arrow');
	arrows.setAll('anchor.x', 0.5);
    arrows.setAll('anchor.y', 1);
    arrows.setAll('scale.x', 0.5);
    arrows.setAll('scale.y', 0.5);
    arrows.setAll('outOfBoundsKill', true);
    arrows.setAll('checkWorldBounds', true);
};

Game.Main.prototype.update = function(){
	player.body.velocity.x = 0;

	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(player, layer);
	game.physics.arcade.collide(arrows, layer, this.killArrow);
	game.physics.arcade.collide(player, wolf_0.wolf, this.removeLife, null, this);
	game.physics.arcade.collide(player, wolf_1.wolf, this.removeLife, null, this);
	game.physics.arcade.collide(player, wolf_2.wolf, this.removeLife, null, this);
	game.physics.arcade.overlap(player, cristals, this.killCristal, null, this);


	if (cursors.left.isDown){
		if ( player.body.onFloor() || player.body.touching.down) {
			player.animations.play('left');
			player.body.velocity.x = -this.speedPlayer;
			this.lastDirection = false;	
		} else {
			player.animations.play('flying_L');
			player.body.velocity.x = -this.speedPlayer;
			this.lastDirection = false;
		}
	} 
	else if(cursors.right.isDown ){
		if ( player.body.onFloor() || player.body.touching.down) {
			player.animations.play('right');
			player.body.velocity.x = this.speedPlayer;
			this.lastDirection = true;
		} else {
			player.animations.play('flying_R');
			player.body.velocity.x = this.speedPlayer;
			this.lastDirection = true;
		}
		
	} else{
		if (!this.lastDirection) {
			player.animations.play('idle_L');
		} else {
    		player.animations.play('idle_R');
		};	
	};

	if(jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)){
		player.body.velocity.y = -this.speedJump;
	};

	if(controls.shoot.isDown){
		if (!this.lastDirection) {
			player.animations.play('shooting');
			this.shootArrowLeft();
		} else {
			player.animations.play('shooting');
			this.shootArrow();
		};
		
	};

	if(checkOverlap(arrows,wolf_1.wolf)) wolf_1.wolf.kill();	
	if(checkOverlap(arrows,wolf_0.wolf)) wolf_0.wolf.kill();	
	if(checkOverlap(arrows,wolf_2.wolf)) wolf_2.wolf.kill();	

var a = this.time.now - timeStartGame;
	if (a >= i*2000 && a <i*4000){
		wolf_0.wolf.animations.play('walk_L');
		wolf_1.wolf.animations.play('walk_L');
		wolf_2.wolf.animations.play('walk_L');
} else {
		wolf_0.wolf.animations.play('walk_R');
	}
};

Game.Main.prototype.killCristal = function(player, cristal){
    cristal.kill();
    this.score++;
    scoreText.text = ": "+ this.score;
	};

Game.Main.prototype.killArrow = function(arrow, layer){
    arrow.kill();
	};


Game.Main.prototype.removeLife = function(player, enemy){
	if(lives.children.length == 1){
		sound.stop();
      this.game.state.start("Death");
	};
    player.x -= 100;
    player.y -= 100;
    lives.removeChildAt(0);
	};

Game.Main.prototype.shutdown = function(){			
	platforms.destroy();
	cristals.destroy();
	lives.destroy();
	player.destroy();
	enemies.destroy();
};

Game.Main.prototype.shootArrow = function(){
	if(this.time.now > this.shootTime){
		arrow = arrows.getFirstExists(false);
		if(arrow){
			arrow.reset(player.x, player.y);
			arrow.body.velocity.x = 600;
			this.shootTime = this.time.now + 200;
		}
	}
};

Game.Main.prototype.shootArrowLeft = function(){
	if(this.time.now > this.shootTime){
		arrow = arrows.getFirstExists(false);
		if(arrow){
			arrow.reset(player.x, player.y);
			arrow.body.velocity.x = -600;
			this.shootTime = this.time.now + 200;
			
		}
	}
};

Game.Main.prototype.nextLevel = function(){
	sound.stop();
    this.game.state.start("LevelTwo");
};


EnemyWolf = function(index,game,x,y,distance){
	var chengDirection = false;
	this.wolf = game.add.sprite(x,y,'wolf');
	this.wolf.animations.add('walk_R', [0,1,2,3],8,true);
	this.wolf.animations.add('walk_L', [5,6,7,8],8,true);
	this.wolf.anchor.setTo(0.5,0.5);
	this.wolf.name = index.toString();

	game.physics.enable(this.wolf,Phaser.Physics.ARCADE);
	this.wolf.body.immovable = true;
	this.wolf.body.collideWorldBounds = true;
	this.wolf.body.allowGravity = false;

	this.wolfTween = game.add.tween(this.wolf).to({x:this.wolf.x+distance},2000,'Linear',true,0,100,true);
};

checkOverlap = function(spriteA, spriteB){
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA,boundsB);
};

