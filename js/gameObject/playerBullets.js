


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
    bullets.bulletsForMachineGun = 0;

    bullets.damage = 25;
    bullets.speed = 400;


    bullets.fireBullet = fireBullet;
    bullets.activateMachineGun = activateMachineGun;
}


function fireBullet(){
	//  Grab the first bullet we can from the pool
    bullet = this.getFirstExists(false);
    if (bullet)
    {
        //  And fire it
        bullet.reset(player.x, player.y + 8);
        bullet.body.velocity.y = -this.speed;
        this.bulletTime = game.time.now + this.timeBetweenFires;

        this.bulletsForMachineGun--;
    }

    if( this.bulletsForMachineGun <= 0 )
        this.timeBetweenFires = 500;
}

function activateMachineGun(){
    this.bulletsForMachineGun = 20;
    this.timeBetweenFires = 180;
}

function addTorpedo(){
    torpedo = game.add.sprite( player.body.x, player.body.y - 20 , 'ship');
    game.physics.enable(torpedo, Phaser.Physics.ARCADE);
    torpedo.body.colliderWorldBounds = true;
    torpedo.body.acceleration.y = -300;

    torpedo.damage = 150;

    return torpedo;
}