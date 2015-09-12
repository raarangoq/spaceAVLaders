


var player;
var aliens;
var bullets;
var keyboard;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullets;
var stateText;
var livingEnemies = [];


var gui;

levels = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    addKeyboard();

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    //  The hero!
    addPlayer();

    //  The baddies!
    addAliens();
    aliens.createAliens();


    gui = new GUI();

    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;


    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(this.setupInvader, this);
    
    },

    setupInvader: function(invader) {
        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');

    },

    update: function() {

        //  Scroll the background
        starfield.tilePosition.y += 2;

        if (player.alive)
        {
            player.updatePlayer();
            aliens.updateAliens();

            //  Run collision
            game.physics.arcade.overlap(bullets, aliens, this.collisionHandler, null, this);
            game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);
        }

    },

    render: function() {

        // for (var i = 0; i < aliens.length; i++)
        // {
        //     game.debug.body(aliens.children[i]);
        // }

    },

    collisionHandler: function(bullet, alien) {

        //  When a bullet hits an alien we kill them both
        bullet.kill();
        alien.kill();

        //  Increase the score
        gui.upScore(20);

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(alien.body.x, alien.body.y);
        explosion.play('kaboom', 30, false, true);

        if (aliens.countLiving() == 0)
        {
            gui.upScore(1000);

            enemyBullets.callAll('kill',this);
            stateText.text = " You Won, \n Click to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(this.restart,this);
        }

    },

    enemyHitsPlayer: function(player,bullet) {
        
        bullet.kill();

        live = lives.getFirstAlive();

        if (live)
        {
            live.kill();
        }

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.play('kaboom', 30, false, true);

        // When the player dies
        if (lives.countLiving() < 1)
        {
            player.kill();
            enemyBullets.callAll('kill');

            stateText.text=" GAME OVER \n Click to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(this.restart,this);
        }

    },


    resetBullet: function(bullet) {

        //  Called if the bullet goes out of the screen
        bullet.kill();

    },

    restart: function() {

        //  A new level starts
        
        //resets the life count
        lives.callAll('revive');
        //  And brings the aliens back from the dead :)
        aliens.removeAll();
        aliens.createAliens();

        //revives the player
        player.revive();
        //hides the text
        stateText.visible = false;

    }

}
