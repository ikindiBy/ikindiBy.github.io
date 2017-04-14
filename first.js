

    var game = new Phaser.Game(1280, 640, Phaser.CANVAS, 'phaser-example');
     // ,{preload:preload, create:create, update:update, render:render })
     var fieldGame;
     var player;

     var mainState = {
     	preload:function(){
     		game.load.image('backroundGame', 'images/background.jpg');
     		game.load.image('player', 'images/plr.png');
     	},
     	create:function(){
     		fieldGame = game.add.tileSprite(0, 0, 1280, 640, 'backroundGame');  //наверное это про бесшовный фон
     	    background = -2;  // for speed moving of fone
     	    player = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'player');
     	    game.physics.enable(player, Phaser.Physics.ARCADE);

     	    cursors = game.input.keyboard.createCursorKeys();

     	},
     	update:function(){
     		player.body.velocity.x = 0;
     		fieldGame.tilePosition.x += background;
     		if(cursors.left.isDown){
     			player.body.velocity.x = -350;
     		}
     		if(cursors.right.isDown){
     			player.body.velocity.x = 350;
     		}
     	}
     }

     game.state.add('mainState', mainState);
     game.state.start('mainState');