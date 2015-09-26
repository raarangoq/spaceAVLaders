


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

var items;
var torpedo;


var tree;
var gui;


var pauseImage;
var winImage;
var loseImage;

var winState = false;


var text;
var texta;



levels = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    tree = new AVLTree();

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
    

    items = addItem(400, 300, "torpedo");


    winImage = game.add.sprite(0, 0, 'win');
    winImage.visible = false;
    loseImage = game.add.sprite(0, 0, 'lose');
    loseImage.visible = false;

text = game.add.text(20, 540, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
//texta = game.add.text(20, 40, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});

    },

    update: function() {

        //  Scroll the background
        starfield.tilePosition.y += 2;

        tree.updateTree();

        if (player.alive)
        {
            player.updatePlayer();
            //  Run collision

            if ( !winState )
                game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);
            game.physics.arcade.overlap(items, player, this.setAbility);
        }
        else{
            if( keyboard.enterKey() )
                this.restart();
        }

        if( winState ){
            if( tree.root != null )
                tree.alienToDestroy = tree.root.alien;

            winImage.visible = true;
            if( keyboard.enterKey() )
                this.restart();
        }

    },

    addAliens: function(){
        tree.createAlien(400, 30, "leader");
        for(var i=0;i<6; i++){
            tree.createAlien(400, 30, "drone");
        }
        tree.createAlien(400, 30, "mother");

        tree.reorderTree();
        addAliensBullets();
    },

    setAbility: function(item, player){
        gui.upScore(3000);
        items.takeItem();
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

            loseImage.visible = true;
        }

    },

    render: function() {
 text.text = player.ability;

    },

    resetBullet: function(bullet) {

        //  Called if the bullet goes out of the screen
        bullet.kill();

    },

    restart: function() {
        winState = false;
        game.state.start('levels');

    },


// Establecer la explosión
    setupInvader: function(invader) {
        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');

    },

    

}
