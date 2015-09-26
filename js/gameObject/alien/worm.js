

function addWorm(x, y, i){
    var worm = addAlien(x, y, i, "leader");
    worm.scale.setTo(2, 2);
    worm.firingTimer = 0;
    worm.health = 50;

    worm.lastFire = game.time.time;
    worm.speedFiring = 500;

    worm.updateAlien = updateWorm;
    worm.destroyAlien = destroyWorm;

    addWormAnimations(worm);
    alienWorms.push(worm);
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
		var alien = addDrone(this.body.x, this.body.y, tree.nextId);
    	tree.insert(alien);
	}
	tree.reorderTree();

	this.destroy();
}
