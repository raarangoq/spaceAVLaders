


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
//var stateText;

var items;
var item_munition;
var torpedo;


var tree;
var gui;


var pauseImage;
var winImage;
var loseImage;

var winState = false;
var boss;


var sound_backgroud;


var text;
var texta;
var textb;

var bmd, sprite;
var graphics;

levels = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    tree = new AVLTree();
    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    addPlayer();

//bmd.addToWorld(); 

//bmd = game.add.bitmapData(800, 600);
//bmd.ctx.beginPath();
//bmd.ctx.lineWidth = "4";
//bmd.ctx.strokeStyle = "white";
//bmd.ctx.stroke();
//sprite = game.add.sprite(0, 0, bmd);

graphics = game.add.graphics( 0, 0 );
graphics.lineStyle(2, 0xffffff, 1);

//game.global.level = 7;

    this.addAliens();
    gui = new GUI();


    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(this.setupExplosion, this);
    
    items = addItem(400, 000, "velocity");


    winImage = game.add.sprite(0, 0, 'win');
    winImage.visible = false;
    loseImage = game.add.sprite(0, 0, 'lose');
    loseImage.visible = false;

    if(game.global.level < 5)
        sound_backgroud = game.add.audio('levelA', 0.5, true);
    else
        sound_backgroud = game.add.audio('levelB', 0.5, true);
    sound_backgroud.play();



text = game.add.text(20, 540, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
texta = game.add.text(20, 400, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
textb = game.add.text(20, 200, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});

 game.time.advancedTiming = true;  

    },



    update: function() {


        tree.updateTree();

        if (player.alive)
        {
            player.updatePlayer();
            if ( !winState )
                game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);

            game.physics.arcade.overlap(items, player, this.setAbility);
               

            game.physics.arcade.overlap(item_munition, player, this.setAbility);

            if( game.global.level == 7 )
                boss.updateBoss();
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
        if ( game.global.level <= 3 ){
            tree.createAlien(400, 30, "leader");
            for(var i=0; i< 2*game.global.level; i++){
                tree.createAlien(400, 30, "drone");
            }
        }
        else if( game.global.level == 4 ){
            tree.createAlien(400, 30, "leader");
            for(var i=0; i<8; i++){
                tree.createAlien(400, 30, "drone");
            }
            tree.createAlien(400, 30, "worm");
        }
        else if( game.global.level <= 6 ){
            tree.createAlien(400, 30, "leader");
            for(var i=0; i<8; i++){
                tree.createAlien(400, 30, "drone");
            }
            tree.createAlien(400, 30, "worm");
            tree.createAlien(400, 30, "worm");
            tree.createAlien(400, 30, "mother");
        }
        else if (game.global.level == 7){
            boss = addBoss(400, 30, "boss");
            for(var i=0; i<8; i++){
                tree.createAlien(400, 30, "drone");
            }
            tree.createAlien(400, 30, "worm");
            tree.createAlien(400, 30, "worm");
            tree.createAlien(400, 30, "mother");
        }

        tree.reorderTree();
        addAliensBullets();
    },

    // Establecer la explosión
    setupExplosion: function(invader) {
        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');
    },

    setAbility: function(item, player){
        gui.upScore(3000);
        item.takeItem();
    },

    enemyHitsPlayer: function(player,bullet) {
        
        bullet.kill();
        player.playerTakeDamage();

        // When the player dies
        if (lives.countLiving() < 1)
        {
            player.kill();
            enemyBullets.callAll('kill');

            loseImage.visible = true;
        }

    },

    render: function() {
 text.text = "Health: " + player.health + ". Munition: " + player.munition + ". Ability: " + player.ability;
textb.text = game.time.fps;

    },

    resetBullet: function(bullet) {

        //  Called if the bullet goes out of the screen
        bullet.kill();

    },

    restart: function() {
        sound_backgroud.stop();

        if (player.alive)
            game.global.level++;
        else
            game.global.level = 1;

        winState = false;

        if (game.global.level == 8)
            game.global.level = 1;

        game.state.start('levels');

    },



}
