
var enemyBullet;



function addAliensBullets(){
	// The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(20, 'enemyBullet');
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
        enemyBullet.reset(alien.body.x + 10, alien.body.y + 32);
        if (tree.count > 18)
            game.physics.arcade.moveToObject(enemyBullet, player, 300);
        else
            game.physics.arcade.moveToObject(enemyBullet, player, 120);
    }
}


function addBossWeaponBullets(){
    // The enemy's bullets
    weaponBullets = game.add.group();
    weaponBullets.enableBody = true;
    weaponBullets.physicsBodyType = Phaser.Physics.ARCADE;
    weaponBullets.createMultiple(20, 'bossWeaponBullet');
    weaponBullets.setAll('anchor.x', 0.5);
    weaponBullets.setAll('anchor.y', 1);
    weaponBullets.setAll('outOfBoundsKill', true);
    weaponBullets.setAll('checkWorldBounds', true);

    weaponBullets.damage = 50;

    weaponBullets.fireWeaponBullet = fireAlienBullet;
}



function addBossBullets(){
    // The enemy's bullets
    bossBullets = game.add.group();
    bossBullets.enableBody = true;
    bossBullets.physicsBodyType = Phaser.Physics.ARCADE;
    bossBullets.createMultiple(20, 'bossBullet');
    bossBullets.setAll('anchor.x', 0.5);
    bossBullets.setAll('anchor.y', 1);
    bossBullets.setAll('outOfBoundsKill', true);
    bossBullets.setAll('checkWorldBounds', true);

    bossBullets.damage = 90;

    bossBullets.fireBossBullet = fireBossBullet;
}

function fireBossBullet(){
    //  Grab the first bullet we can from the pool
    enemyBullet = this.getFirstExists(false);

    if (enemyBullet && !game.physics.arcade.isPaused)
    {
        // And fire the bullet from this enemy
        enemyBullet.reset(boss.body.x + 50, boss.body.y + 130);
        if (tree.count > 18)
            game.physics.arcade.moveToObject(enemyBullet, player, 300);
        else
            game.physics.arcade.moveToObject(enemyBullet, player, 120);
    }
}