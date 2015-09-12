


function addAliens(){
	aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    aliens.firingTimer = 0;

    addAliensBullets();

    aliens.createAliens = createAliens;
    aliens.descend = descend;
    aliens.enemyFires = enemyFires;
    aliens.updateAliens = updateAliens;
}


function createAliens() {
    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var alien = this.create(x * 48, y * 50, 'invader');
            alien.anchor.setTo(0.5, 0.5);
            alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            alien.play('fly');
            alien.body.moves = false;
        }
    }
    this.x = 100;
    this.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(this).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
    tween.onLoop.add(this.descend, this);
}

function descend() {
    aliens.y += 10;
}

function enemyFires() {
	enemyBullets.fireAlienBuller();
   
}

function updateAliens(){
	if (game.time.now > this.firingTimer)
    {
        this.enemyFires();
    }
}