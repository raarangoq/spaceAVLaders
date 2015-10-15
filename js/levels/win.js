


var tower;
var sky;
var link;
var stairs;
var cloud;

var time;

var x_pos;
var y_pos;
var x_target;
var y_target;


win = {
	create: function(){
		sky = game.add.sprite(0, 0, 'sky');

		cloud = game.add.sprite(400, 150, 'cloud');
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x= 2;
		cloud = game.add.sprite(200, 300, 'cloud');
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x= 3;

		tower = game.add.sprite(0, 0, 'tower');
		this.addLink();
		stairs = game.add.sprite(0, 0, 'stairs');

		time = game.time.time;

		game.global.level++;
		game.global.is_playing = false;	
	},

	update: function(){
		if(keyboard.enterKey()){
			this.nextLevel();
		}
		this.playUp();

	},

	addLink: function(){

		this.setPos();
		link = game.add.sprite(x_pos, y_pos, 'link');
		game.physics.enable(link, Phaser.Physics.ARCADE);

		if(game.global.level == 1 || game.global.level ==3)
			link.scale.setTo(-0.2, 0.2);
		else
			link.scale.setTo(0.2, 0.2);

		this.setTarget();
		game.physics.arcade.moveToXY(link, x_target, y_target, 60);
	},

	nextLevel: function(){
		game.global.is_playing = true;
		game.state.start('levels');
	},

	playUp: function(){
		var local_time = game.time.time - time;

		if(game.physics.arcade.distanceToXY(link, x_target, y_target) <= 1)
			link.body.velocity.setTo(0, 0);

		if(local_time > 5000){
			this.nextLevel();
		}
		
	},

	setPos: function(){
		if(game.global.level == 1){
			x_pos = 385;
			y_pos = 425;
		}
		else if(game.global.level == 2){
			x_pos = 415;
			y_pos = 363;
		}
		else if(game.global.level == 3){
			x_pos = 385;
			y_pos = 302;
		}
		else if(game.global.level == 4){
			x_pos = 348;
			y_pos = 237;
		}
	},

	setTarget: function(){
		if(game.global.level == 1){
			x_target = 440;
			y_target = 360;
		}
		else if(game.global.level == 2){
			x_target = 362;
			y_target = 298;
		}
		else if(game.global.level == 3){
			x_target = 440;
			y_target = 230;
		}
		else if(game.global.level == 4){
			x_target = 348;
			y_target = 190;
		}
	}
}