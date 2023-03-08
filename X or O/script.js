window.addEventListener('DOMContentLoaded', () => {
    const titles = document.querySelectorAll(' .tile')
    const playerDisplay = document.querySelector('.display-player')
    const resetButton = document.querySelector('#reset')
    const announcer = document.querySelector('.announcer')
    const modal = document.querySelector('.modal')
    const playNew=document.querySelector('.play_new')
    const modalInner=document.querySelector('.modal_inner p')

    let board = ['', '', '', '', '', '', '', '', '']
    let currentPlayer = 'X'
    let isGame = true
    const PLAYERX_WON = 'PLAYERX -WON'
    const PLAYERO_WON = 'PLAYERO -WON'
    const TIE = 'TIE'
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    const isValidAction = (title) => {
        if (title.innerText === 'X' || title.innerText === "O") {
            return false
        }
        return true
    }
    let roundWon = false
    function handleTResultValidation() {

        for (let i = 0; i < 7; i++) {
            const winCondition = winningConditions[i]
            const a = board[winCondition[0]]
            const b = board[winCondition[1]]
            const c = board[winCondition[2]]
            if (a === '' || b === '' || c === '') {
                continue
            }

            if (a === b && c === b) {
                roundWon = true
                return
            }
        }
    }
    if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON)
        isGame = false
        return
    }
    if (!board.includes('')) {
        announce(TIE)
    }

    const announce = (type) => {
        switch (type) {
            case PLAYERX_WON:
                announcer.innerHTML = 'player<span class="playerX">X</span>'
                break;
            case PLAYERO_WON:
                announcer.innerHTML = 'player<span class="playerO">O</span>'
                break;
            case TIE:
                announcer.innerText = "tie"
        }
    }
    const updateBoard = (index) => {
        board[index] = currentPlayer
        checkWin()
    }

    const checkWin = () => {
        winningConditions.forEach(e => {
            for (let i = 0; i < board.length - 1; i++) {
                if (board[e[0]] === board[e[1]] && board[e[1]] === board[e[2]] && board[e[0]] !== '' && board[e[1]] !== '' && board[e[2]] !== '') {
                    titles[e[0]].style.background = 'red'
                    titles[e[1]].style.background = 'red'
                    titles[e[2]].style.background = 'red'
                    modalInner.innerText=`Ben ${board[e[0]]} da thang`
                    tableWin() 
                }
               
            }
        })
    }



    const tableWin = () => {
        modal.style.display='block'
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`)
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        playerDisplay.innerText = currentPlayer
        playerDisplay.classList.add(`player${currentPlayer}`)
    }
    const userAction = (title, index) => {
        if (isValidAction(title) && isGame) {
            title.innerText = currentPlayer
            title.classList.add(`player${currentPlayer}`)
            updateBoard(index)
            handleTResultValidation()
            changePlayer()
        }
    }
   

    titles.forEach((title, index) => {
        title.addEventListener('click', () =>
            userAction(title, index),
        )
    })

    playNew.addEventListener('click',()=>{
       
        resetBoard()
    })
    const resetBoard = (title) => {
        board = ['', '', '', '', '', '', '', '', '']
        isGame = true;
        announcer.classList.add('hide')
        if (currentPlayer === 'O') {
            changePlayer()
        }
        titles.forEach(title => {
            title.innerText = '';
            title.classList.remove('playerX')
            title.classList.remove('playerO')
            title.style.background = ''
            
        })
        modal.style.display='none'
    }
    
    resetButton.addEventListener('click', resetBoard)
})


