
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
    boss.speedFiring = 1500;

    leftWeapon = addWeapon(-15, 33, 'left');
    boss.addChild(leftWeapon);
    rightWeapon = addWeapon(247, 34, 'right');
    boss.addChild(rightWeapon);

    boss.health = 150;
    boss.destroyed = false;
    boss.lastSpam = game.time.time;
    boss.timeToSpamChild = 5000;


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
    boss.animations.add('attack', [ 10, 11, 12, 13, 14, 15, 16 ], 20, true);
    boss.animations.add('die', [ 17, 18, 19, 20, 21 ], 10);

    boss.play('move');
}

var checkedStop = false;
function updateBoss(){
    if (!checkedStop && game.physics.arcade.distanceToXY(this, 250, 0) < 5){
        this.body.velocity.setTo(0, 0);
        this.animations.stop(null, true);
        this.animations.play('attack');
        checkedStop = true;
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


    if( !game.physics.arcade.isPaused && !this.destroyed && game.time.time - this.lastSpam > this.timeToSpamChild ){
        tree.createAlien(this.body.x + 40, this.body.y + 130, "drone");
        tree.reorderTree();
        this.lastSpam = game.time.time;
    }

    game.physics.arcade.overlap(bullets, this, this.damageBoss, null, this);
    if (torpedo != null)
        game.physics.arcade.overlap(torpedo, this, this.damageBossByTorpedo, null, this);
}

function damageBoss(weapon, bullet){
    bullet.kill();
    if (!leftWeapon.destroyed || !rightWeapon.destroyed)
        return;

    this.health -= bullets.damage;
    
    if(this.health <= 0)
        this.destroyBoss();
}

function damageBossByTorpedo(torpedo, weapon){
    
    if (leftWeapon.destroyed && rightWeapon.destroyed)
        this.health -= torpedo.damage;

    if(this.health <= 0)
        this.destroyBoss();
    
    torpedo.destroy();
    torpedo = null;
}

function destroyBoss(){
    //  Increase the score
    gui.upScore(5000);

    boss.hit_sound.play();
    this.play('die');

    this.destroyed = true;
    winState = true;
}

