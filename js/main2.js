Game.Main = function(game){
var map;
	var layer;	
};

	

Game.Main.prototype.create = function(){

// 
	// game.stage.backgroundColor = '#85b5e1';

	map = game.add.tilemap('map',64,64);
    map.addTilesetImage('tileset');
    layer = map.createLayer(0);
    layer.resizeWorld();

	// this.bounds = new Phaser.Rectangle(0, 0, 1000, 440);  //bounds of place
	// this.game.physics.startSystem(Phaser.Physics.ARCADE);
	
	// player = game.add.sprite(100,200, 'hero');
	// player = game.add.sprite(100,200, 'hunter');
	// player.anchor.setTo(0.5,0.5);
	// game.physics.arcade.enable(player);
	// player.body.collideWorldBounds = true; // столкновение игрока со стенами 
	// player.body.gravity.y = 500;
	// player.body.bounce.y=0.2;
	// player.animations.add('left', [0,1,2,3,4,5],12,true);
	// player.animations.add('right', [6,7,8,9,10,11],12,true);
	// player.animations.add('idle', [6],1,true);
	// this.camera.follow(player);

	// platforms = game.add.physicsGroup();
	// platforms.create(300,380,'platform');  //2 цифры - это начальные координаты
	// platforms.create(100,400,'platform');
	// platforms.setAll('body.immovable', true);  //неподвижность платформ

	// cristals = game.add.physicsGroup();
	// cristals.create(200, 300, 'cristal');
	// cristals.create(400, 380, 'cristal');
	// cristals.setAll('body.immovable', true);

	// lives = game.add.group();
	// for(var i=0;i<3;i++){
	// 	lives.create(500+i*40,10,'lives');
	// }

	// enemies = game.add.physicsGroup();
	// enemies.create(520,380,'enemy');
	// // enemies.scale.setTo(2,2);

	// scoreText = game.add.text(10,10, "Your score is: "+this.score+" cristals", 
	// 	{font:"24px Arial", fill:"#fff", align:"center"});

	// cursors = game.input.keyboard.createCursorKeys();
	// jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

Game.Main.prototype.update = function(){
	// game.physics.arcade.collide(player, platforms);
	// game.physics.arcade.overlap(player, cristals, this.killCristal, null, this);
 //    game.physics.arcade.overlap(player, enemies, this.removeLife, null, this);

	// player.body.velocity.x = 0;
	// if(cursors.left.isDown){
	// 	player.animations.play('left');
	// 	player.body.velocity.x = -this.speedPlayer;
	// } 
	// else if(cursors.right.isDown){
	// 	player.animations.play('right');
	// 	player.body.velocity.x = this.speedPlayer;
	// } else{
	// 	// player.animations.stop();
	// 	player.animations.play('idle');
	// }
	// // if (cursors.up.isDown){
 // //    	player.body.velocity.y = -400;
	// // };
	// if(jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)){
	// 	player.animations.play('idle');
	// 	player.body.velocity.y = -this.speedPlayer;
	// }
};

// Game.Main.prototype.killCristal = function(player, cristal){
//     cristal.kill();
//     this.score++;
//     scoreText.text = "Your score is: "+ this.score+ " cristals";
// 	}

// Game.Main.prototype.removeLife = function(player, enemy){
// 	if(lives.children.length == 1){
//       this.game.state.start("Death");
// 	};
//     player.x -= 100;
//     lives.removeChildAt(0);
// 	};

// Game.Main.prototype.shutdown = function(){			//подчищаем за собой)
// 	platforms.destroy();
// 	cristals.destroy();
// 	lives.destroy();
// 	player.destroy();
// 	enemies.destroy();
// };