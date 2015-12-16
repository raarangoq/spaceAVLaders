
function addScore(){
	//  The score
    scoreString = 'Puntaje : ';
    scoreText = game.add.text(10, 10, scoreString + score, 
    	{ font: "34pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 6 });

    scoreText.upScore = upScore;


    return scoreText;
}


function upScore(value){
	score += value;
    scoreText.text = scoreString + score;
}