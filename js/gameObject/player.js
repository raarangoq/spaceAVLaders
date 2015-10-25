

var live;

function addPlayer(){
	player = game.add.sprite(400, 500, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);

    addBullets();
//    player.health = 100;
    player.munition = 15;
    player.haveTorpedo = false;

    player.timeWithoutMunition = game.time.time;
    player.timeForNewMunition = 40000;

    player.timeWithVelocity = 5000;
    player.timeVelocityActivated = game.time.time - 5000;
    player.speed = 200;
    player.highSpeed = 500;

    player.hit_sound = game.add.audio('hit', 0.3);

    player.playerFiresBullet = playerFiresBullet;
    player.updatePlayer = updatePlayer;
    player.activateAbility = activateAbility;
    player.activateVelocity = activateVelocity;
    player.updateAbility = updateAbility;
    player.playerTakeDamage = playerTakeDamage;
    player.playerTakeDamageWeapon = playerTakeDamageWeapon;
    player.playerTakeDamageBoss = playerTakeDamageBoss;
    player.checkHealth = checkHealth;

    player.setWinState = setWinState;

    addPlayerAnimations(player);
}

function addPlayerAnimations(player){
    player.animations.add('move', [ 0, 1, 2, 3 ], 9, true);
    player.animations.add('attack', [ 4, 3, 2], 9);
}

function updatePlayer(){
    if (this.alive && !winState){

        this.body.velocity.setTo(0, 0);
        
        if (game.time.time - this.timeVelocityActivated < this.timeWithVelocity){
            this.speed = 500;
        }
        else{
            this.speed = 200;
            gui.changeAbility(false, "velocity");
         }   

        

        if ( keyboard.leftKey() && this.body.x>50){
            this.body.velocity.x = -this.speed;
        }
        else if ( keyboard.rightKey() && this.body.x<730){
            this.body.velocity.x = this.speed;
        }

        
        if (game.time.now - bullets.bulletTime > 0){
            if (this.body.velocity.x != 0){
                this.animations.play('move');
            }
            else{
                this.animations.stop('move');
            }
        }
        
        

        if ( keyboard.spaceKey() ){
            if ( this.haveTorpedo ){
                torpedo = addTorpedo();
                this.haveTorpedo = false;
            }
            else
                this.playerFiresBullet();
        }


        if ( this.munition <= 0 ) {
texta.text = "Time for munition: " + 
                Math.round((  this.timeForNewMunition - (game.time.time - this.timeWithoutMunition)  ) / 1000);

            if (game.time.time - this.timeWithoutMunition > this.timeForNewMunition){
                this.munition = 1;
                item_munition = addItem(400, 0, "munition");
            }

        }
        else 
            texta.text = "";
 
    }
    this.updateAbility();
}

function playerFiresBullet() {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bullets.bulletTime && this.munition > 0)
    {
        bullets.fireBullet();
        this.munition--;
        this.animations.play('attack');

        if ( this.munition <= 0 ){
            this.timeWithoutMunition = game.time.time;
            this.timeForNewMunition = 5000 + (Math.random() * 5000);
        }
    }
}

function checkHealth(){
    if (game.global.health <= 0){
        this.hit_sound.play();
        game.global.lives--;
        if (game.global.lives > 0)
            game.global.health = 100;
        else
            game.global.health = 0;

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.play('kaboom', 30, false, true);
    }
}

function playerTakeDamage(){
    game.global.health -= enemyBullets.damage;

    this.checkHealth();
}

function playerTakeDamageWeapon(){
    game.global.health -= weaponBullets.damage;

    this.checkHealth();
}

function playerTakeDamageBoss(){
    game.global.health -= bossBullets.damage;

    this.checkHealth();
}

function updateAbility(){

    if ( torpedo != null && torpedo.body != null && torpedo.body.y < -20 ){
        torpedo.destroy();
        torpedo = null;
    }

}

function activateAbility(type){
    gui.upScore(50);
    if (type == "munition"){
        this.munition += 15;
    }
    else if( type == "machineGun" ){
        bullets.activateMachineGun();
    }
    else if( type == "torpedo" ){
        this.haveTorpedo = true;
    }  
    else if ( type == "velocity"){
        this.activateVelocity();
    }   
}

function activateVelocity(){
    this.timeVelocityActivated = game.time.time;
}

function setWinState(){
    winState = true;
    timeOfWin = game.time.time;

    if (game.global.level <= 6){
        game.physics.arcade.moveToXY(this, 300, -100, 200);
        this.animations.play('move');
    }
    else{
        this.body.velocity.setTo(0, 0);
        link.body.position = this.body.position;
    }
}