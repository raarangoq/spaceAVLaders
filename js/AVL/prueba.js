
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { create: create});
var text;


function alien(i){
	this.id = i;
}

function create(){

	text = game.add.text(20, 20, 'Arbol: ', { fontSize: '16px', fill: '#ffffff'});
	text.fixedToCamera = true;

	var tree = new AVLTree();
	for(var i=0;i<10; i++){
		var t = new alien(i);
		tree.insert(t);
	}
	text.text = text.text + " " + tree.root.toSource() + "\n";
	alert(text.text);

	var borrar = new alien(0);
	tree.borrar(borrar);
	borrar = new alien(2);
	tree.borrar(borrar);
	//borrar = new alien(1);
	//tree.borrar(borrar);


	text.text = tree.root.toSource() + "\n";
	alert(text.text);

	//tree.imprimir();
}