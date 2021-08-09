const ticTacToeGame= new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
    const board= new Board ();
    const humanPlayer= new HumanPlayer(board);
    const computerPlayer= new ComputerPlayer(board);
    let turn =0;

    
    // this triggers to know when its the person's turn
    this.start = function(){
        const config= {childList: true};
        const observer =new MutationObserver(() => takeTurn());
        board.positions.forEach((el) => observer.observe (el, config));
        takeTurn();


    }

    function takeTurn() {
        //console.log("Something changed") (this was to check if something happened on the board then the coding will detect it hence "Something Changed")
         if (board.checkForWinner()) {
             return;

            }

        if (turn % 2=== 0) {
            humanPlayer.takeTurn();
        } else {
            computerPlayer.takeTurn();
        }
        
        
        turn++; //decides which Player's turn it is
    };
}
function Board () {
    this.positions= Array.from(document.querySelectorAll('.col'));


    
    this.checkForWinner=function() {
         let winner= false;
         const winningCombinations=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [2,4,6],
            [0,4,8]

         ];
      
       const positions =this.positions;
        winningCombinations.forEach((winningCombo) => {
             const pos0InnerText = positions[winningCombo[0]].innerText;
             const pos1InnerText = positions[winningCombo[1]].innerText;
             const pos2InnerText = positions[winningCombo[2]].innerText;
              const isWinningCombo = pos0InnerText !== '' &&
                    pos0InnerText === pos1InnerText && 
                     pos1InnerText === pos2InnerText;
                  
                     
                    if (isWinningCombo) {
                        winner=true;
                        winningCombo.forEach((index)=> {
                            positions[index].style.color = "#00A6FB"; //the color     
                   })
                }
         });
        return winner;
       }
       
    }
      
    function HumanPlayer(board)  {
    this.takeTurn =function() {
        board.positions
        .forEach(el => el.addEventListener('click', handleTurnTaken));
    }
   

    function handleTurnTaken(event)  {
   //console.log ("Turn taken") (this helps the game recognize that a person took their turn)
        event.target.innerText= 'X';
        board.positions
        .forEach(el => el.removeEventListener ('click', handleTurnTaken));
    
        }
    }
              
        
    function ComputerPlayer(board)  {
    // All of this helps to indentify how much available positions are left
    this.takeTurn =function() {
       let availablePositions=
            board.positions.filter ((p) => p.innerText==='');
       const move =Math.floor (Math.random() * availablePositions.length)
        availablePositions[move].innerText='O';  // where the O can go anywhere
       
    }
}
