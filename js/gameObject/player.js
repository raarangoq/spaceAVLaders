



function addPlayer(){
	player = game.add.sprite(400, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);

    addBullets();
    player.ability = "";
    player.timeForUseItem = game.time.time;
    player.timeToLoseItem = 10000;


    player.playerFiresBullet = playerFiresBullet;
    player.updatePlayer = updatePlayer;
    player.activateAbility = activateAbility;
    player.updateAbility = updateAbility;

}

function playerFiresBullet() {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bullets.bulletTime)
    {
        bullets.fireBullet();
    }
}

function updatePlayer(){
    if (player.alive){
     
        //  Reset the player, then check for movement keys
        player.body.velocity.setTo(0, 0);

        if ( keyboard.leftKey() && player.body.x>50)
        {
            player.body.velocity.x = -200;
        }
        else if ( keyboard.rightKey() && player.body.x<730)
        {
            player.body.velocity.x = 200;
        }


        //  Firing?
        if ( keyboard.spaceKey() )
        {
            this.playerFiresBullet();
        }

        if ( !game.physics.arcade.isPaused && keyboard.gKey() )
            this.activateAbility();

        this.updateAbility();
    }
}

function updateAbility(){
    if ( game.time.time - this.timeForUseItem > this.timeToLoseItem )
        this.ability = "";

    if ( torpedo != null && torpedo.body != null && torpedo.body.y < -20 ){
        torpedo.destroy();
        torpedo = null;
    }

}

function activateAbility(){
    if( this.ability == "machineGun" ){
        bullets.activateMachineGun();
        this.ability = "";
    }
    else if( this.ability == "torpedo" ){
        torpedo = addTorpedo();
        this.ability = "";
    }

        
}