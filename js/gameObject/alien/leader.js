

function addLeader(x, y, i){
    var leader = addAlien(x, y, i, "leader");
    leader.firingTimer = 0;
    leader.health = 250;
    leader.maxHealth = 250;

    leader.lastFire = game.time.time;
    leader.speedFiring = 1000;

    leader.updateAlien = updateLeader;
    leader.destroyAlien = destroyLeader;

    addLeaderAnimations(leader);
    return leader;
}

function addLeaderAnimations(leader){
    leader.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
    leader.play('fly');
}

function updateLeader(){
    if( game.physics.arcade.distanceToXY(this,this.x_target, this.y_target) < 5 ) 
        this.body.velocity.setTo(0,0);

    if( game.time.time - this.lastFire > this.speedFiring){
        enemyBullets.fireAlienBullet(this);
        this.lastFire = game.time.time;
    }

    if (tree.count > 18)
        this.speedFiring = 500;
    else
        this.speedFiring = 1000;
}

function destroyLeader(){
	//  Increase the score
	gui.upScore(100 + (50 * tree.count));
    this.hit_sound.play();
    player.setWinState();


	this.destroy();
}
