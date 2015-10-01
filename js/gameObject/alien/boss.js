
var leftWeapon;
var rightWeapon;
var kernel;

function addBoss(){
    var boss = game.add.sprite(150, 0, 'leader');
    game.physics.enable(boss, Phaser.Physics.ARCADE);

    boss.firingTimer = 0;
    boss.lastFire = game.time.time;
    boss.speedFiring = 1500;

    
    leftWeapon = addWeapon(100, 0);
    boss.addChild(leftWeapon);

    rightWeapon = addWeapon(300, 0);
    boss.addChild(rightWeapon);

    kernel = addKernel(200, 0);
    kernel.visible = false;
    boss.addChild(kernel);

    boss.hit_sound = game.add.audio('creature');


    boss.updateBoss = updateBoss;

    addBossAnimations(boss);
    return boss;
}

function addBossAnimations(leader){
    leader.animations.add('fly', [ 0 ], 20, true);
    leader.play('fly');
}


function updateBoss(){

    if( game.time.time - this.lastFire > this.speedFiring ){
    	if (!leftWeapon.destroyed)
        	enemyBullets.fireAlienBullet(leftWeapon);
        if (!rightWeapon.destroyed)
        	enemyBullets.fireAlienBullet(rightWeapon);

        if (leftWeapon.destroyed && rightWeapon.destroyed && !kernel.destroyed)
            enemyBullets.fireAlienBullet(kernel);
        this.lastFire = game.time.time;
    }

    if (!leftWeapon.destroyed)
    	leftWeapon.updateBossWeapon();
    
    if (!rightWeapon.destroyed)
    	rightWeapon.updateBossWeapon();

    if (leftWeapon.destroyed && rightWeapon.destroyed && !kernel.destroyed)
    	kernel.updateBossKernel();

}


