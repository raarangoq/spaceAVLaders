

function addLeader(x, y, i){
    var leader = addAlien(x, y, i, "leader");
    leader.firingTimer = 0;
    leader.health = 150;

    leader.lastFire = game.time.time;
    leader.speedFiring = 1000;

    leader.updateAlien = updateLeader;
    leader.destroyAlien = destroyLeader;

    addLeaderAnimations(leader);
    alienLeader = leader;
    return leader;
}

function addLeaderAnimations(leader){
    leader.animations.add('fly', [ 0 ], 20, true);
    leader.play('fly');
}

function updateLeader(){
    if( game.physics.arcade.distanceToXY(this,this.x_target, this.y_target) < 5 ) 
        this.body.velocity.setTo(0,0);

    if( game.time.time - this.lastFire > this.speedFiring ){
        enemyBullets.fireAlienBullet(this);
        this.lastFire = game.time.time;
    }
}

function destroyLeader(){
	//  Increase the score
	gui.upScore(100);

    winState = true;

	this.destroy();
}
