
var enemyBullet;

function addAliensBullets(){
	// The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    enemyBullets.damage = 30;

    enemyBullets.fireAlienBullet = fireAlienBullet;
}


function fireAlienBullet(alien){
 
	 //  Grab the first bullet we can from the pool
    enemyBullet = this.getFirstExists(false);

    if (enemyBullet && !game.physics.arcade.isPaused)
    {
        // And fire the bullet from this enemy
        enemyBullet.reset(alien.body.x, alien.body.y);
        game.physics.arcade.moveToObject(enemyBullet, player, 120);
    }
}