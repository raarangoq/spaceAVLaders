



function AVLTree(){
	this.root = null;

	this.alienToDestroy = null;
	timeToMove = game.time.time;
	this.direction = "right";
	this.vector = [];



	this.updateTree = updateTree;
	this.insert = insert;
	this.insertToTree = insertToTree;
	this.rotateWithLeftChild = rotateWithLeftChild;
	this.rotateWithRightChild = rotateWithRightChild;
	this.doubleWithLeftChild = doubleWithLeftChild;
	this.doubleWithRightChild = doubleWithRightChild;
	this.deleteNode = deleteNode;
	this.deleteFromTree = deleteFromTree;
	this.findUp = findUp;
	this.adjustment = adjustment;


	this.reorderTree = reorderTree;

	

	this.imprimir = imprimir;
	this.imprimirXAltura = imprimirXAltura;
}

var timeToMove;

function updateTree(){
//text.text = this.vector.length;	

	if(tree.root == null)
		return;

	this.root.setRootDirection();
	if(	this.alienToDestroy != null ){		
		this.deleteNode(this.alienToDestroy);
     
	    //  Increase the score
	    gui.upScore(20);

	    //  And create an explosion :)
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(this.alienToDestroy.body.x, this.alienToDestroy.body.y);
	    explosion.play('kaboom', 30, false, true);

	    this.alienToDestroy.destroy();
	    this.alienToDestroy = null;

		this.reorderTree();	    
	}

	text.text = "";

	for (var i=0; i<this.vector.length; i++){
		this.vector[i].updateNode();
	}

this.imprimir();
		
}


function adjustment(father, son, ancestor){
	if(son.rightNode == null){
		if(father.alien.id == ancestor.alien.id){
			father.leftNode = son.leftNode;
			return father;
		}
		father.rightNode = son.leftNode;
		return father;
	}

	son = this.adjustment(son, son.rightNode, ancestor);

	if(father.alien.id == ancestor.alien.id)
		father.leftNode = son;
	else
		father.rightNode = son;
	return father;
}

function deleteFromTree(node, alien){
	if( node.alien.id == alien.id ){

var i=0;
while ( node.alien.id != this.vector[i].alien.id)
	i++;
this.vector.splice(i, 1);


		if(node.leftNode == null && node.rightNode == null ){
			node = null;
			return node;
		}
		if(node.rightNode == null){
			node = node.leftNode;
			return node;
		}
		if(node.leftNode == null){
			node = node.rightNode;
			return node;
		}

		node.alien = this.findUp(node.leftNode);
		node = this.adjustment(node, node.leftNode, node);
		return node;
	}

	if(alien.id > node.alien.id){
		node.rightNode = this.deleteFromTree(node.rightNode, alien);


		if( height(node.leftNode) - height(node.rightNode) == 2){
			if( height(node.leftNode.leftNode) >= height(node.leftNode.rightNode) )
				node = this.rotateWithLeftChild( node );
			else
				node = this.doubleWithLeftChild( node );
		}
		node.heightNode = Math.max( 
			height(node.leftNode),
			height(node.rightNode) 
		) + 1;


		return node;
	}
	else{
		node.leftNode = this.deleteFromTree(node.leftNode, alien);


		if( height(node.rightNode) - height(node.leftNode) == 2){
			if( height(node.rightNode.rightNode) >= height(node.rightNode.leftNode) )
				node = this.rotateWithRightChild( node );
			else
				node = this.doubleWithRightChild( node );
		}
		node.heightNode = Math.max( 
			height(node.leftNode),
			height(node.rightNode) 
		) + 1;


		return node;
	}
}

function deleteNode(alien){
	this.root = this.deleteFromTree(this.root, alien);
}

function doubleWithLeftChild( k3 ){
	k3.leftNode = this.rotateWithRightChild( k3.leftNode );
	return rotateWithLeftChild( k3 );
}

function doubleWithRightChild( k1 ){
	k1.rightNode = this.rotateWithLeftChild( k1.leftNode );
	return rotateWithRightChild( k1 );
}

function findUp(node){
	if( node.rightNode == null )
		return node.alien;
	return this.findUp(node.rightNode);
}

function height( t ){
	if( t == null )
		return -1;
	else
		return t.heightNode;
}

function insert( alien ){
		
	this.root = this.insertToTree(alien, this.root);

	return alien;
}


function insertToTree(alien, t){
	if( t == null ){
		t = new AVLNode(alien, null, null);
this.vector[this.vector.length] = t;
	}
	else if( alien.id < t.alien.id ){
		t.leftNode = this.insertToTree(alien, t.leftNode);
		if( height(t.leftNode) - height(t.rightNode) == 2 ){
			if( alien.id < t.leftNode.alien.id)
				t = this.rotateWithLeftChild( t );
			else
				t = this.doubleWithLeftChild( t );
		}
	}
	else if( alien.id > t.alien.id ){
		t.rightNode = this.insertToTree( alien, t.rightNode);
		if( height(t.rightNode) - height(t.leftNode) == 2 ){
			if( alien.id > t.rightNode.alien.id )
				t = this.rotateWithRightChild( t );
			else 
				t = this.doubleWithRightChild( t );
		}
	}
	else
		; // Elemento duplicado, no hacer nada

	t.heightNode = Math.max( 
		height(t.leftNode),
		height(t.rightNode) 
		) + 1;

	return t;
}

function reorderTree(){
	if(this.root != null)
		this.root.reorderNode(this.root.x_node, this.root.y_node, this.root.heightNode);
}

function rotateWithLeftChild( k2 ){
	var k1 = k2.leftNode;
	k2.leftNode = k1.rightNode;
	k1.rightNode = k2;
	k2.heightNode = Math.max( height(k2.leftNode), height(k2.rightNode) ) + 1;
	k1.heightNode = Math.max( height(k1.leftNode), k2.heightNode ) + 1;

	return k1;
}

function rotateWithRightChild( k1 ){
	var k2 = k1.rightNode;
	k1.rightNode = k2.leftNode;
	k2.leftNode = k1;
	k1.heightNode = Math.max( height(k1.leftNode), height(k1.rightNode) ) + 1;
	k2.heightNode = Math.max( height(k2.rightNode), k1.heightNode ) + 1;

	return k2;
}



function imprimir(){
	this.imprimirXAltura( this.root );
}


function imprimirXAltura( nodo ){
	if(nodo != null){
		imprimirXAltura(nodo.leftNode);

text.text += "{";
if(nodo.leftNode != null)
	text.text += nodo.leftNode.alien.id + "-";

text.text += "[" + nodo.alien.id + "/" + nodo.heightNode + "]";

if(nodo.rightNode != null)
	text.text += "-" + nodo.rightNode.alien.id;

text.text += "}";

		imprimirXAltura(nodo.rightNode);
	}
}
