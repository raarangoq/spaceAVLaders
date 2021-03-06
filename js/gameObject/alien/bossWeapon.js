
function addWeapon(x, y, side){
	var weapon;
	if (side == 'left'){
		weapon = game.add.sprite(x, y, 'leftWeapon');
		addWeaponAnimations(weapon, side);
	}
	else if (side == 'right'){
		weapon = game.add.sprite(x, y, 'rightWeapon');
		addWeaponAnimations(weapon, side);
	}

	weapon.side = side;

    game.physics.enable(weapon, Phaser.Physics.ARCADE);
    weapon.body.colliderWorldBounds = true;
    weapon.body.setSize(20, 20, 40, 60);

	weapon.health = 500;
	weapon.maxHealth = 500;
	weapon.destroyed = false;

	weapon.healthBar = game.add.sprite(22, 30, 'enemyBar');
    weapon.healthBar.width = 50;
    weapon.addChild(weapon.healthBar);

	weapon.destroyWeapon = destroyWeapon;
	weapon.damageWeapon = damageWeapon;
    weapon.damageWeaponByTorpedo = damageWeaponByTorpedo;

    weapon.updateBossWeapon = updateBossWeapon;
    weapon.bossWeaponFiring = bossWeaponFiring;

    return weapon;
}

function addWeaponAnimations(weapon, side){
	if (side == "left"){
		weapon.animations.add('attack', [0, 1, 2, 3, 0], 8, true);
		weapon.animations.add('die', [4, 5, 6, 7, 8, 9, 10], 8);
		weapon.animations.add('burn', [5, 6, 7, 8, 9, 10], 8);
		weapon.play('attack');
	}
	else if (side == "right"){
		weapon.animations.add('attack', [10, 9, 8, 7, 10], 8, true);
		weapon.animations.add('die', [6, 5, 4, 3, 2, 1 ,0], 8);
		weapon.animations.add('burn', [5, 4, 3, 2, 1, 0], 8);
		weapon.play('attack');
		weapon.frame = 10;
	}
}

function updateBossWeapon(){
	game.physics.arcade.overlap(bullets, this, this.damageWeapon, null, this);
    if (torpedo != null)
    	game.physics.arcade.overlap(torpedo, this, this.damageWeaponByTorpedo, null, this);

}

function bossWeaponFiring(){
	weaponBullets.fireWeaponBullet(this);
} 

function damageWeapon(weapon, bullet){
	this.health -= bullets.damage;
	this.healthBar.width = 50 * ( this.health / this.maxHealth);
	bullet.kill();

	if(this.health <= 0)
		this.destroyWeapon();
}

function damageWeaponByTorpedo(torpedo, weapon){
	this.health -= torpedo.damage;
	this.healthBar.width = 50 * ( this.health / this.maxHealth);
	

	//  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(torpedo.body.x, torpedo.body.y);
    explosion.play('kaboom', 30, false, true);

    torpedo.destroy();
	torpedo = null;

	if(this.health <= 0)
		this.destroyWeapon();
}

function destroyWeapon(){
	//  Increase the score
	gui.upScore(150);

	boss.hit_sound.play();

	//  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(this.body.x, this.body.y);
    explosion.play('kaboom', 30, false, true);

	this.destroyed = true;
	this.healthBar.visible = false;
	this.play('die');

	if (leftWeapon.destroyed && rightWeapon.destroyed){
		boss.speedFiring = 750;
		boss.healthBar.visible = true;
	}
}