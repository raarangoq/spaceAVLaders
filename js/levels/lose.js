var tower;
var sky;
var link;
var helmet;
var sword;
var stairs;
var image;


var time;

var x_pos;
var y_pos;

var sound;

lose = {
	create: function(){
		sky = game.add.sprite(0, 0, 'sky');
		
		cloud = game.add.sprite(400, 150, 'cloud');
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x= 2;
		cloud = game.add.sprite(200, 300, 'cloud');
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x= 3;


		tower = game.add.sprite(0, 0, 'tower');
		stairs = game.add.sprite(0, 0, 'stairs');
		this.addLink();
		image = game.add.sprite(0, 0, 'lose');
		image.visible = false;

		time = game.time.time;

		game.global.is_playing = false;

		sound = game.add.audio('droping', 0.5);
		sound.play();
	},

	update: function(){
		if(keyboard.enterKey()){
			game.global.level = 1;
			game.global.is_playing = true;
			game.state.start('levels');
		}
		this.playDown();


	},

	addLink: function(){

		this.setPos();
		link = game.add.sprite(x_pos, y_pos, 'linkfail');
		link.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
		link.animations.play('fly');
		game.physics.enable(link, Phaser.Physics.ARCADE);
		link.pivot.setTo(70, 70);
		link.body.gravity.setTo(0, 50);
		link.scale.setTo(0.2, 0.2);		
		link.body.velocity.setTo( 100, -40);
		link.body.angularVelocity = 75;

		sword = game.add.sprite(x_pos, y_pos, 'sword');
		game.physics.enable(sword, Phaser.Physics.ARCADE);
		sword.pivot.setTo(26, 29);
		sword.body.gravity.setTo(0, 30);
		sword.scale.setTo(0.2, 0.2);		
		sword.body.velocity.setTo( 150, -160);
		sword.body.angularVelocity = 1200;

		helmet = game.add.sprite(x_pos, y_pos, 'helmet');
		game.physics.enable(helmet, Phaser.Physics.ARCADE);
		helmet.pivot.setTo(26, 29);
		helmet.body.gravity.setTo(0, 70);
		helmet.scale.setTo(0.2, 0.2);		
		helmet.body.velocity.setTo( 50, -200);
		helmet.body.angularVelocity = 120;

	},

	playDown: function(){
		if(game.time.time - time > 5000 || link.body.y >550){
			image.visible = true;
			link.visible = false;
			enter_dialog.visible = true;
		}
	},

	setPos: function(){
		if(game.global.level == 1){
			x_pos = 365;
			y_pos = 430;
		}
		else if(game.global.level == 2){
			x_pos = 424;
			y_pos = 363;
		}
		else if(game.global.level == 3){
			x_pos = 362;
			y_pos = 302;
		}
		else if(game.global.level == 4){
			x_pos = 422;
			y_pos = 237;
		}
		else if(game.global.level == 5){
			x_pos = 449;
			y_pos = 193;
		}

	}
}