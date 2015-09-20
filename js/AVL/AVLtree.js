



function AVLTree(){
	this.root = null;

	this.alienToDestroy = null;
	timeToMove = game.time.time;
	this.direction = "right";



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
	this.toRotate = toRotate;
	this.setHeightNode = setHeightNode;


	this.reorderTree = reorderTree;

	

	this.imprimir = imprimir;
	this.imprimirXAltura = imprimirXAltura;
}

var timeToMove;

function updateTree(){
//text.text = this.vector.length;	

	if(tree.root == null)
		return;
	this.root.updateNode();

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

this.imprimir();
		
}


function toRotate(node){
if( height(node.leftNode) - height(node.rightNode) == 2){
	if( height(node.leftNode.leftNode) >= height(node.leftNode.rightNode) )
		node = this.rotateWithLeftChild( node );
	else
		node = this.doubleWithLeftChild( node );
	}
else if( height(node.rightNode) - height(node.leftNode) == 2){		
	if( height(node.rightNode.rightNode) >= height(node.rightNode.leftNode) )
		node = this.rotateWithRightChild( node );
	else
		node = this.doubleWithRightChild( node );
}
this.setHeightNode(node);

return node;
}

function findUp(node, father){
	if( node.rightNode == null ){
		if(father.rightNode.alien.id == node.alien.id){
			father.rightNode = null;
			this.setHeightNode(father);
		}
		return node;
		
	}
	return this.findUp(node.rightNode, node);
}

function deleteFromTree(node, alien){
	if( node.alien.id == alien.id ){
		if(node.leftNode == null && node.rightNode == null ){
			node = null;
		}
		else if(node.rightNode == null){
			node = node.leftNode;
		}
		else if(node.leftNode == null){
			node = node.rightNode;
		}
		else{
			var temp = this.findUp(node.leftNode, node);
			if (temp.alien.id != node.leftNode.alien.id)
				temp.leftNode = node.leftNode;
			temp.rightNode = node.rightNode;
			this.setHeightNode(temp);
			node = temp;

			node = toRotate(node);
		}
	}
	else if(alien.id > node.alien.id){
		node.rightNode = this.deleteFromTree(node.rightNode, alien);

		node = toRotate(node);
		this.setHeightNode(node);
	}
	else{
		node.leftNode = this.deleteFromTree(node.leftNode, alien);

		node = toRotate(node);
		this.setHeightNode(node);
	}
	return node;
}

function setHeightNode(node){
	node.heightNode = Math.max( 
			height(node.leftNode),
			height(node.rightNode) 
		) + 1;
}

function deleteNode(alien){
	this.root = this.deleteFromTree(this.root, alien);
}

function doubleWithLeftChild( k3 ){
	k3.leftNode = this.rotateWithRightChild( k3.leftNode );
	return rotateWithLeftChild( k3 );
}

function doubleWithRightChild( k1 ){
	k1.rightNode = this.rotateWithLeftChild( k1.rightNode );
	return rotateWithRightChild( k1 );
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
