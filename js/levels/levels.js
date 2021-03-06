


var player;
var aliens;
var bullets;
var keyboard;
var explosions;
var spiderExplodes;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var enemyBullets;
var weaponBullets;
var bossBullets;

var items=null;
var item_munition;
var torpedo;


var tree;
var gui;


var pauseImage;
var winImage;
var loseImage;
var endImage;

var winState = false;
var timeOfWin;
var boss;
var link;
var scream_sound;
var boom_sound;


var sound_backgroud;


var text;
var texta;
var textb;

var bmd, sprite;
var graphics;


var playedA = false;
var playedB = false;
var playedC = false;
var playedD = false;
var playedE = false;

levels = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    tree = new AVLTree();
    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'bridge');

    addPlayer();

    graphics = game.add.graphics( 0, 0 );
    graphics.lineStyle(2, 0x000000, 1);

//game.global.level = 7;

    this.addAliens();

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(10, 'kaboom');
    explosions.forEach(this.setupExplosion, this);

    spiderExplodes = game.add.group();
    spiderExplodes.createMultiple(30, 'spiderDie');
    spiderExplodes.forEach(this.setupExplosion, this);


//    items = addItem(400, 000, "torpedo");

if (game.global.level == 7){
    link = game.add.sprite(0, 0, 'linkfail');
    game.physics.enable(link, Phaser.Physics.ARCADE);
    link.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
    link.visible = false;
    scream_sound = game.add.audio('scream');
}
    boom_sound = game.add.audio('boom');

    winImage = game.add.sprite(0, 0, 'win');
    winImage.visible = false;

    loseImage = game.add.sprite(0, 0, 'lose');
    loseImage.visible = false;
    endImage = game.add.sprite(0, 0, 'end');
    var text = game.add.text(400, 300, 'Ganaste\nHaz acabado con todas las arañas en el puente.',
        { font: "24pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
        wordWrap: true, wordWrapWidth: 600, align: 'center' });
    text.anchor.setTo(0.5, 0.5);
    endImage.addChild(text);
    endImage.visible = false;

    sound_backgroud = game.add.audio('levelB', 0.5, true);
    sound_backgroud.play();



//text = game.add.text(20, 540, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
texta = game.add.text(20, 400, 'Cargando...',
    { font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3 });
//textb = game.add.text(20, 200, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});




gui = new GUI();

game.time.advancedTiming = true;

    },



    update: function() {


        tree.updateTree();

        if (player.alive)
        {
            player.updatePlayer();
            if ( !winState ){
                game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);
                if( game.global.level == 7){
                    game.physics.arcade.overlap(weaponBullets, player, this.weaponHitsPlayer, null, this);
                    game.physics.arcade.overlap(bossBullets, player, this.bossHitsPlayer, null, this);
                }
            }

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

            this.playWinState();

            if( keyboard.enterKey() )
                this.restart();
        }


        gui.updateGui();


    },

    playWinState: function(){
        if( game.global.level != 7 ){
            if ( game.physics.arcade.distanceToXY(player, 300, -100) <= 50 ){
                player.body.velocity.setTo(0, 0);
                winImage.visible = true;            }
        }
        else{
//            sound_backgroud.stop();

            var local_time = game.time.time - timeOfWin;
            if( local_time < 3900){//wait
            }
            else if (local_time < 4000){
                if(!playedA){
                    this.addExplosion(boss.body.x + 50, boss.body.y);
                    this.addExplosion(boss.body.x + 50, boss.body.y + 100);
                    playedA = true;
                    boom_sound.play();
                }
            }
            else if (local_time < 4200){
                if(!playedB){
                    this.addExplosion(boss.body.x + 50, boss.body.y + 200);
                    this.addExplosion(boss.body.x + 50, boss.body.y + 300);
                    playedB = true;
                    boom_sound.play();
                }
            }
            else if (local_time < 4400){
                if(!playedC){
                    this.addExplosion(boss.body.x + 50, boss.body.y + 400);
                    this.addExplosion(boss.body.x + 50, boss.body.y + 450);
                    playedC = true;
                    boom_sound.play();
                }
            }
            else if (local_time < 4600){
                if(!playedD){
                    playedD = true;

                    this.addExplosion(boss.body.x - 50, boss.body.y + 450);
                    this.addExplosion(boss.body.x + 150, boss.body.y + 450);
                    player.visible = false;
                    link.visible = true;

                    link.animations.play('fly');
                    game.add.tween(link.scale).to({ x:2, y:2 }, 3000, Phaser.Easing.Linear.None, true);
                    game.add.tween(link.body.position).to({x:300, y:200}, 3000, null, true);

                    scream_sound.play();
                    boom_sound.play();
                }
            }
            else if (local_time < 10000){
                if (link.scale.x == 2){
                    link.body.position.setTo(300, 200);+
                    link.animations.stop();
                    link.frame = 9;
                    scream_sound.stop();

                    if (!playedE){
                        player.hit_sound.play();
                        playedE = true;
                    }
                }
            }
            else{
                endImage.visible = true;
            }
        }


    },

    addExplosion: function(x, y){
        var explosion = explosions.getFirstExists(false);
        explosion.reset(x, y);
        explosion.play('kaboom', 30, false, true);
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
    setupExplosion: function(explosion) {
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('kaboom', null, 10);
    },

    setAbility: function(item, player){
        item.takeItem();
    },

    enemyHitsPlayer: function(player, bullet) {

        bullet.kill();
        player.playerTakeDamage();

        this.playerDies();

    },

    weaponHitsPlayer: function(player, bullet){
        bullet.kill();
        player.playerTakeDamageWeapon();

        this.playerDies();
    },

    bossHitsPlayer: function(player, bullet){
        bullet.kill();
        player.playerTakeDamageBoss();

        this.playerDies();
    },

    playerDies: function(){
        // When the player dies
        if (game.global.lives < 1)
        {
            player.kill();
            enemyBullets.callAll('kill');

            loseImage.visible = true;
        }
    },

    render: function() {
//game.debug.body(bullets.children[0]);
//textb.text = boss.frame;

    },

    resetBullet: function(bullet) {

        //  Called if the bullet goes out of the screen
        bullet.kill();

    },

    restart: function() {
        sound_backgroud.stop();



        if (player.alive){
            game.global.level++;
            if (game.global.level == 8){
                game.global.level = 1;
                game.global.lives = 3;

                ScormProcessSetValue("cmi.core.score.min", 0.0000);
                ScormProcessSetValue("cmi.core.score.max", 100.0000);
                ScormProcessSetValue("cmi.core.score.raw", 100);
                if( ScormProcessGetValue("cmi.comments") < gui.scoreText.score )
                    ScormProcessSetValue("cmi.comments", gui.scoreText.score);
                }
            }
        }
        else{
            //game.global.level = 1;
            game.global.lives = 3;
            score = 0;
            game.global.health = 100;
        }

        winState = false;
        playedA = false;
        playedB = false;
        playedC = false;
        playedD = false;
        playedE = false;


        game.state.start('levels');

    },



}
