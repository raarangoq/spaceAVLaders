
var leftWeapon;
var rightWeapon;
var kernel;

function addBoss(){
    var boss = game.add.sprite(250, -150, 'boss');
    game.physics.enable(boss, Phaser.Physics.ARCADE);
    boss.body.colliderWorldBounds = true;
    boss.body.setSize(100, 100, 114, 26);

    boss.firingTimer = 0;
    boss.lastFire = game.time.time;
    boss.speedFiring = 3000;

    leftWeapon = addWeapon(-20, 33, 'left');
    boss.addChild(leftWeapon);
    rightWeapon = addWeapon(240, 34, 'right');
    boss.addChild(rightWeapon);

    boss.health = 450;
    boss.maxHealth = 450;
    boss.destroyed = false;
    boss.lastSpam = game.time.time;
    boss.timeToSpamChild = 5000;

    boss.healthBar = game.add.sprite(100,  20, 'enemyBar');
    boss.healthBar.width = 120;
    boss.healthBar.visible = false;
    boss.addChild(boss.healthBar);

    boss.checkedStop = false;

    boss.hit_sound = game.add.audio('creature');


    boss.updateBoss = updateBoss;
    boss.destroyBoss = destroyBoss;
    boss.damageBoss = damageBoss;
    boss.damageBossByTorpedo = damageBossByTorpedo;

    addBossAnimations(boss);
    game.physics.arcade.moveToXY(boss, 250, 0, 150);

    addBossWeaponBullets();
    addBossBullets();
    return boss;
}

function addBossAnimations(boss){
    boss.animations.add('move', [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], 20, true);
    boss.animations.add('attack', [9, 10, 11, 12, 13, 14], 20, true);
    boss.animations.add('die', [16, 17, 18, 19], 10);

    boss.play('move');
}

function updateBoss(){
    if (!boss.checkedStop && game.physics.arcade.distanceToXY(this, 250, 0) < 5){
        this.body.velocity.setTo(0, 0);
//        this.animations.stop(null, true);
        this.play('attack');
        boss.checkedStop = true;
    }

    if( game.time.time - this.lastFire > this.speedFiring ){
    	if (!leftWeapon.destroyed)
        	leftWeapon.bossWeaponFiring();
        if (!rightWeapon.destroyed)
        	rightWeapon.bossWeaponFiring();

        if (!this.destroyed)
            bossBullets.fireBossBullet(this);

        this.lastFire = game.time.time;
    }

    if (!leftWeapon.destroyed)
    	leftWeapon.updateBossWeapon();
    if (!rightWeapon.destroyed)
    	rightWeapon.updateBossWeapon();


    if( !game.physics.arcade.isPaused && game.global.lives > 0 && 
        !this.destroyed && game.time.time - this.lastSpam > this.timeToSpamChild ){
        tree.createAlien(this.body.x + 40, this.body.y + 130, "drone");
        tree.reorderTree();
        this.lastSpam = game.time.time;
    }

    game.physics.arcade.overlap(bullets, this, this.damageBoss, null, this);
    if (torpedo != null)
        game.physics.arcade.overlap(torpedo, this, this.damageBossByTorpedo, null, this);

    if(tree.count > 18 || (leftWeapon.destroyed && rightWeapon.destroyed)){
        this.speedFiring = 1000;
        this.timeToSpamChild = 2500;
    }
    else
        this.speedFiring = 3000;
}

function damageBoss(weapon, bullet){
    bullet.kill();
    if (!leftWeapon.destroyed || !rightWeapon.destroyed)
        return;

    this.health -= bullets.damage;
    this.healthBar.width = 120 * ( this.health / this.maxHealth);
    
    if(this.health <= 0)
        this.destroyBoss();
}

function damageBossByTorpedo(torpedo, weapon){
    
    if (leftWeapon.destroyed && rightWeapon.destroyed){
        this.health -= torpedo.damage;
        this.healthBar.width = 120 * ( this.health / this.maxHealth);
    }

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(torpedo.body.x, torpedo.body.y);
    explosion.play('kaboom', 30, false, true);

    if(this.health <= 0)
        this.destroyBoss();
    
    torpedo.destroy();
    torpedo = null;
}

function destroyBoss(){
    //  Increase the score
    gui.upScore(300 + (50 * tree.count));

    boss.hit_sound.play();
    this.play('die');
    this.children[0].visible = false;
    this.children[1].visible = false;
    this.healthBar.visible = false;

    this.destroyed = true;
    player.setWinState();

}

