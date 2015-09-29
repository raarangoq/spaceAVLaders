

function addWorm(x, y, i){
    var worm = addAlien(x, y, i, "leader");
    worm.firingTimer = 0;
    worm.health = 50;

    worm.lastFire = game.time.time;
    worm.speedFiring = 4000;

    worm.updateAlien = updateWorm;
    worm.destroyAlien = destroyWorm;

    addWormAnimations(worm);
    return worm;
}

function addWormAnimations(worm){
    worm.animations.add('fly', [ 0 ], 20, true);
    worm.play('fly');
}

function updateWorm(){
    if( game.physics.arcade.distanceToXY(this,this.x_target, this.y_target) < 5 ) 
        this.body.velocity.setTo(0,0);

    if( game.time.time - this.lastFire > this.speedFiring ){
        enemyBullets.fireAlienBullet(this);
        this.lastFire = game.time.time;
    }
}

function destroyWorm(){
	gui.upScore(75);

	for(var i=0; i<3; i++){
		tree.createAlien(this.body.x, this.body.y, "drone");
	}
	tree.reorderTree();

	this.destroy();
}
