
function addKernel(x, y){
	var kernel = game.add.sprite(x, y, 'leader');
    game.physics.enable(kernel, Phaser.Physics.ARCADE);
    kernel.body.colliderWorldBounds = true;

	kernel.health = 150;
	kernel.destroyed = false;

	kernel.lastSpam = game.time.time;
	kernel.timeToSpamChild = 5000;

	kernel.destroyKernel = destroyKernel;
	kernel.damageKernel = damageKernel;
	kernel.damageKernelByTorpedo = damageKernelByTorpedo;
    kernel.updateBossKernel = updateBossKernel;

    return kernel;
}


function updateBossKernel(){
	if( !game.physics.arcade.isPaused && !this.destroyed && game.time.time - this.lastSpam > this.timeToSpamChild ){
    	tree.createAlien(this.body.x, this.body.y + 20, "drone");
    	tree.reorderTree();
    	this.lastSpam = game.time.time;
    }

    game.physics.arcade.overlap(bullets, this, this.damageKernel, null, this);
    if (torpedo != null)
    	game.physics.arcade.overlap(torpedo, this, this.damageKernelByTorpedo, null, this);

}

function damageKernel(weapon, bullet){
	this.health -= bullets.damage;
	bullet.kill();

	if(this.health <= 0)
		this.destroyKernel();
}

function damageKernelByTorpedo(torpedo, weapon){
	this.health -= torpedo.damage;
	torpedo.destroy();
	torpedo = null;

	if(this.health <= 0)
		this.destroyKernel();
	
}

function destroyKernel(){
	//  Increase the score
	gui.upScore(5000);

	boss.hit_sound.play();

	//  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(this.body.x, this.body.y);
    explosion.play('kaboom', 30, false, true);

	this.destroyed = true;
	winState = true;
}