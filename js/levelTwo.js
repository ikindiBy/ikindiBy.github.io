Game.LevelTwo = function(game){
	var map, layer;
	var player;
	var platforms;
	var cursors;
	var jumpButton;
	var cristals, scoreCrist;
	this.score = 0;
	var scoreText;
	var lives;
	var wolf_0, wolf_1,wolf_2,wolf_3,wolf_4,wolf_5,wolf_6,wolf_7,wolf_8,wolf_9,wolf_10;
	this.speedPlayer = 300;
	this.speedJump = 300;
	var controls;
	this.shootTime = 0;
	var arrows;
	this.lastDirection = true;
	var lastY, sound, timeStartGame;
	this.arrWolfs=[];
	this.rightDirectionWolf = false;
    this.level = 1;
};

	

Game.LevelTwo.prototype.create = function(game){
	this.score = 0;
	timeStartGame = this.time.now;
	game.stage.backgroundColor = '#85b5e1';
	sound = game.add.audio('mainTheme');
	sound.loopFull(0.8);


	map = game.add.tilemap('mapTwo',64,64); 
    map.addTilesetImage('tileset');

    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(0,2);
    map.setTileIndexCallback(5,this.removeLife,this);
    map.setTileIndexCallback(6,this.nextLevel,this);

	this.bounds = new Phaser.Rectangle(0, 0, 1200, 510);  //bounds of place
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	// this.physics.arcade.gravity.y = 1400;

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

	cristals = game.add.physicsGroup();
	cristals.create(250, 380, 'cristal');
	cristals.create(400, 240, 'cristal');
	cristals.create(530, 330, 'cristal');
	cristals.create(650, 300, 'cristal');
	cristals.create(900, 240, 'cristal');
	cristals.create(800, 200, 'cristal');
	cristals.create(1800, 240, 'cristal');
	cristals.create(2800, 240, 'cristal');
	cristals.create(2400, 240, 'cristal');
	cristals.create(3000, 280, 'cristal');
	cristals.create(3400, 240, 'cristal');
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

	wolf_0 = new EnemyWolf(0,game,220, 424, 170);
	wolf_1 = new EnemyWolf(0,game,500, 360,220);
	wolf_2 = new EnemyWolf(0,game,950, 424,200);
	wolf_3 = new EnemyWolf(0,game,1400, 360,80);
	wolf_4 = new EnemyWolf(0,game,1580, 292,110);
	wolf_5 = new EnemyWolf(0,game,1780, 292,100);
	wolf_6 = new EnemyWolf(0,game,2200, 424,120);
	wolf_7 = new EnemyWolf(0,game,2670, 360,120);
	wolf_8 = new EnemyWolf(0,game,3050, 424,180);
	wolf_9 = new EnemyWolf(0,game,3220, 424,120);
	wolf_10 = new EnemyWolf(0,game,3420, 360,140);

	this.arrWolfs.push(wolf_0);
	this.arrWolfs.push(wolf_1);
	this.arrWolfs.push(wolf_2);
	this.arrWolfs.push(wolf_3);
	this.arrWolfs.push(wolf_4);
	this.arrWolfs.push(wolf_5);
	this.arrWolfs.push(wolf_6);
	this.arrWolfs.push(wolf_7);
	this.arrWolfs.push(wolf_8);
	this.arrWolfs.push(wolf_9);
	this.arrWolfs.push(wolf_10);
	
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

Game.LevelTwo.prototype.update = function(){
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

this.arrWolfs.forEach(function(item){
if(checkOverlap(arrows,item.wolf)) item.wolf.kill();	
});

var a = this.time.now - timeStartGame;
	if (a >= 2000 && a <4000 || a>= 6000 && a <8000){
		this.arrWolfs.forEach(function(item){
    	item.wolf.animations.play('walk_L');
    });
    } else {
		this.arrWolfs.forEach(function(item){
    	item.wolf.animations.play('walk_R');
    });
	};

	if (player.x == 3600) this.game.state.start("Boot");
};

Game.LevelTwo.prototype.killCristal = function(player, cristal){
    cristal.kill();
    this.score++;
    scoreText.text = ": "+ this.score;
	};

Game.LevelTwo.prototype.killArrow = function(arrow, layer){
    arrow.kill();
	};


Game.LevelTwo.prototype.removeLife = function(player, enemy){
	if(lives.children.length == 1){
      this.game.state.start("Death");
	};
    player.x -= 100;
    player.y -= 100;
    lives.removeChildAt(0);
	};

Game.LevelTwo.prototype.shutdown = function(){			
	platforms.destroy();
	cristals.destroy();
	lives.destroy();
	player.destroy();
	enemies.destroy();
};

Game.LevelTwo.prototype.shootArrow = function(){
	if(this.time.now > this.shootTime){
		arrow = arrows.getFirstExists(false);
		if(arrow){
			arrow.reset(player.x, player.y);
			arrow.body.velocity.x = 600;
			this.shootTime = this.time.now + 200;
		}
	}
};

Game.LevelTwo.prototype.shootArrowLeft = function(){
	if(this.time.now > this.shootTime){
		arrow = arrows.getFirstExists(false);
		if(arrow){
			arrow.reset(player.x, player.y);
			arrow.body.velocity.x = -600;
			this.shootTime = this.time.now + 200;
			
		}
	}
};

Game.LevelTwo.prototype.nextLevel = function(){
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

