let board=[
    //this stores the current state of where every X and O is
    ['O','X','O'],
    ['X','X','O'],
    ['X','O','X'],
];

let players=['X','O'];


let currentPlayer;
let available =[];

function setup() {
    creativeCanvas(400,400);
    currentPlayer= floor (random(players.length));
    for (let j=0;j<3; j++) {
        for (let i=0;i<3;i++) {  
            available.push([i,j]);
        }
    }
}

function equals3(a,b,c) {
    return (a==b && b==c && a!='');

}

function checkWinner() {
    let winner=null;

// All of these things below are the different ways a person can win

    //horitzonal
    for(let i=0; i<3;i++) {
        if (equals3(board[i][0],board[i][1], board[i][2])) {
            winner=board[i][0];
        }
    }

    //Vertial
    for(let i=0; i<3;i++) {
        if (equals3(board[0][i],board[0][i], board[0][i])) {
            winner=board[0][i];
        }
    }

    //Diagonal
    if (board[0][0]== board[1][1]== board[2][2]) {
        winner = board[0][0];
    }


    if (board[2][0]== board[1][1]== board[0][2]) {
        winner = board[2][0];
    }



 if (winner==null && available.length== 0)   {
     return'tie';
 }  else{
     return winner;
 }
}

function nextTurn(){
    let index=floor(random(available.length));
    let spot =available.splice(index,1)[0];
    let i=spot[0];
    let j=spot[1];
    board[i][j]=players [currentPlayer];
    currentPlayer= (currentPlayer +1) % players.length;
}

//function mousePressed() {
    //nextTurn();
//}

// how the board will generally look
function draw() {
    background(255);
    let w=width/3
    let h=height/3

    line(w,0,w,height);
    line(w*2,0,w*2,height);
    line(0,h,width,h);
    line(0,h*2,width,h*2);

// this is a nested loop
// players[0] =X players[1]=O
      for (let j=0;j<3; j++) {
            for (let i=0;i<3;i++) {  
            let x=w*i +w/2;
            let y=h*j +h/2;
            let spot= board[i][j];
            textSize(32);
            strokeWeight(4);
            if(spot== players [1]) {
                noFill();
                ellipseMode(CORNER);
                ellipse(x,y,w/r);
              }  else if (spot==players[0]) {
                 let xr=w/4; 
                 line (x-xr,y-xr,x+xr,y+xr);
                 line (x+xr,y-xr,x-xr,y+xr);
              }
    
        }
    }

    
    let result = checkWinner();
    if(result!= null) {
        noLoop();
        console.log(result);
    }

    nextTurn();
}
