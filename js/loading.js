
// Variables para controlar la entrada por teclado
var keyboard;

var text;

loading = {
	preload: function(){

    game.load.image('arrow', 'assets/pics/bullets/arrow.png');
    game.load.image('arrowItem', 'assets/pics/items/arrowItem.png');
    game.load.spritesheet('bombArrow', 'assets/pics/bullets/bombArrow.png', 13, 32);
    game.load.image('fastArrow', 'assets/pics/bullets/fastArrow.png');

    game.load.image('torpedo', 'assets/pics/items/bombArrowItem.png');
    game.load.image('machineGun', 'assets/pics/items/fastArrowItem.png');
    game.load.image('munition', 'assets/pics/items/munitionItem.png');
    game.load.image('velocity', 'assets/pics/items/speedItem.png');

    game.load.image('enemyBullet', 'assets/pics/bullets/spiderBullet.png');
    game.load.image('bossWeaponBullet', 'assets/pics/bullets/bossWeaponBullet.png');
    game.load.image('bossBullet', 'assets/pics/bullets/bossBullet.png');

    game.load.spritesheet('heart', 'assets/pics/GUI/heart.png', 14, 16);
    game.load.image('healthBar', 'assets/pics/GUI/healthbar.png');


    game.load.spritesheet('drone', 'assets/pics/enemys/drone.png', 32, 32);
    game.load.spritesheet('leader', 'assets/pics/enemys/leader.png', 32, 32);
    game.load.spritesheet('mother', 'assets/pics/enemys/mother.png', 32, 32);
    game.load.spritesheet('worm', 'assets/pics/enemys/worm.png', 32, 32);
    game.load.spritesheet('spiderDie', 'assets/pics/enemys/spiderDie.png', 128, 128);
    game.load.image('enemyBar', 'assets/pics/enemys/enemyBar.png');

    game.load.spritesheet('leftWeapon', 'assets/pics/enemys/leftWeapon.png', 98, 111);
    game.load.spritesheet('rightWeapon', 'assets/pics/enemys/rightWeapon.png', 98, 111);
    game.load.spritesheet('boss', 'assets/pics/enemys/boss.png', 332, 191);

    game.load.spritesheet('kaboom', 'assets/pics/explode.png', 128, 128);

    game.load.spritesheet('player', 'assets/pics/player.png', 53, 50);
    
    game.load.image('bridge', 'assets/pics/bridge.png');

    

    game.load.image('end', 'assets/pics/images/end.png');
    game.load.image('initmenu', 'assets/pics/images/initmenu.png');
    game.load.image('lose', 'assets/pics/images/lose.png');
    game.load.image('pause', 'assets/pics/images/pause.png');
    game.load.image('blankpause', 'assets/pics/images/blankpause.png');
    game.load.image('input', 'assets/pics/images/input.png');
    game.load.image('win', 'assets/pics/images/win.png');


    game.load.image('sky', 'assets/pics/videos/sky.png');
    game.load.spritesheet('link', 'assets/pics/videos/link.png', 148, 150);
    game.load.spritesheet('linkfail', 'assets/pics/videos/linkfail.png', 145, 175);
    game.load.image('cloud', 'assets/pics/videos/cloud.png');
    game.load.image('dialog01', 'assets/pics/videos/dialog01.png');
    game.load.image('dialog02', 'assets/pics/videos/dialog02.png');
    game.load.image('dialog03', 'assets/pics/videos/dialog03.png');

    game.load.audio('levelB', 'assets/sounds/levelB.mp3');
    game.load.audio('final', 'assets/sounds/final.mp3');

    game.load.audio('item', 'assets/sounds/item.mp3');
    game.load.audio('rugido', 'assets/sounds/rugido.mp3');
    game.load.audio('new_spider', 'assets/sounds/nace_araña.mp3');
    game.load.audio('arrow', 'assets/sounds/flecha.mp3');
    game.load.audio('torpedo', 'assets/sounds/torpedo.mp3');
    game.load.audio('creature', 'assets/sounds/creature.mp3');
    game.load.audio('hit', 'assets/sounds/golpes.mp3');
    game.load.audio('scream', 'assets/sounds/grito.mp3');
    game.load.audio('boom', 'assets/sounds/explosion.mp3');

	},

	create: function(){
        addKeyboard();
    },

    update: function(){
        if(game.load.onLoadComplete){
            loadingImage.destroy();
            game.state.start('initMenu');
        }
    },
}
