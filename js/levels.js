


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

var id = 0;


var tree;
var gui;



var text;

levels = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    tree = new AVLTree();

    addKeyboard();

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    //  The hero!
    addPlayer();

    //  The baddies!
    this.addAliens();


    gui = new GUI();

    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;


    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(this.setupInvader, this);
    

text = game.add.text(20, 540, 'Cargando...', { fontSize: '28px', fill: '#ffffff'});


    },

    update: function() {

        //  Scroll the background
        starfield.tilePosition.y += 2;

        if (player.alive)
        {
            player.updatePlayer();
            //aliens.updateAliens();

            //  Run collision

            game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);
            tree.updateTree();
        }

    },

    addAliens: function(){
        
        
        for(var i=0;i<15; i++){
            var alien = addDrone(400, 30, i);
            tree.insert(alien);
        }
        tree.reorderTree();

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

            stateText.text = " GAME OVER \n Click to restart";
            stateText.visible = true;

            //the "click to restart" handler
            game.input.onTap.addOnce(this.restart,this);
        }

    },

    render: function() {

        // for (var i = 0; i < aliens.length; i++)
        // {
        //     game.debug.body(aliens.children[i]);
        // }

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
    //    aliens.removeAll();
    //    aliens.createAliens();

        //revives the player
        player.revive();
        //hides the text
        stateText.visible = false;

        tree.update();

    },


// Establecer la explosión
    setupInvader: function(invader) {
        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');

    },

    

}
