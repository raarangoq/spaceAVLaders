
function addWeapon(x, y){
	var weapon = game.add.sprite(x, y, 'leader');
    game.physics.enable(weapon, Phaser.Physics.ARCADE);
    weapon.body.colliderWorldBounds = true;

	weapon.health = 100;
	weapon.destroyed = false;

	weapon.destroyWeapon = destroyWeapon;
	weapon.damageWeapon = damageWeapon;
    weapon.damageWeaponByTorpedo = damageWeaponByTorpedo;

    weapon.updateBossWeapon = updateBossWeapon;

    return weapon;
}


function updateBossWeapon(){
	game.physics.arcade.overlap(bullets, this, this.damageWeapon, null, this);
    if (torpedo != null)
    	game.physics.arcade.overlap(torpedo, this, this.damageWeaponByTorpedo, null, this);

}

function damageWeapon(weapon, bullet){
	this.health -= bullets.damage;
	bullet.kill();

	if(this.health <= 0)
		this.destroyWeapon();
}

function damageWeaponByTorpedo(torpedo, weapon){
	this.health -= torpedo.damage;
	torpedo.destroy();
	torpedo = null;

	if(this.health <= 0)
		this.destroyWeapon();
	
}

function destroyWeapon(){
	//  Increase the score
	gui.upScore(1000);

	boss.hit_sound.play();

	//  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(this.body.x, this.body.y);
    explosion.play('kaboom', 30, false, true);

	this.destroyed = true;

	if (leftWeapon.destroyed && rightWeapon.destroyed)
		kernel.visible = true;
}