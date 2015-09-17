


function addBullets(){
	//  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    bullets.bulletTime = 0;
    bullets.timeBetweenFires = 500;

    bullets.damage = 50;


    bullets.fireBullet = fireBullet;
}


function fireBullet(){
	//  Grab the first bullet we can from the pool
    bullet = bullets.getFirstExists(false);
    if (bullet)
    {
        //  And fire it
        bullet.reset(player.x, player.y + 8);
        bullet.body.velocity.y = -400;
        this.bulletTime = game.time.now + this.timeBetweenFires;
    }
}