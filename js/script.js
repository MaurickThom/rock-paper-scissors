let userScore = 0
let botScore = 0
const userScoreSpan = document.getElementById('user-score')
const botScoreSpan = document.getElementById('bot-score')
const scoreBoardElement = document.querySelector('.score-board')
const resultElement = document.querySelector('.result_p')
const rockElement = document.getElementById('rock')
const paperElement = document.getElementById('paper')
const scissorsElement = document.getElementById('scissors')
const chopicesElements = document.querySelector('.choices')
const getBotChoice = ()=>{
    let choices = ['r','p','s']
    let random = Math.floor(Math.random()*3)
    return choices[random]
}
const win = author => (
    author==='user' ? userScore++ : botScore++
)

const lose = author => {
    if(userScore===0 || botScore===0) return
    return (author==='user') ? userScore-- : botScore--
}

const convertToWord = letter=>{
    if(letter==='r') return 'Rock'
    if(letter==='p') return 'Paper'
    return 'Scissors'
}
const draw = (userChoice,botChoice,winUser,tie)=>{
    let smallUser = 'user'.fontsize(3).sub()
    let smallBot = 'bot'.fontsize(3).sub()
    userScoreSpan.innerHTML=` ${userScore} `
    botScoreSpan.innerHTML=` ${botScore} `
    resultElement.innerHTML=`${convertToWord(userChoice)}${smallUser} vs ${convertToWord(botChoice)}${smallBot} . ${ (tie)? `It's a draw !!`:(winUser)? 'You win!!':'You lost !!'}`
    let classCss = ((tie) ? 'gray-glow' : (winUser? 'green-glow' : 'red-glow'))
    document.getElementById(convertToWord(userChoice).toLowerCase()).parentElement.classList.add(classCss)
    setTimeout(() => document.getElementById(convertToWord(userChoice).toLowerCase()).parentElement.classList.remove(classCss), 1000);
}
const game= userChoice=>{
    let botChoice = getBotChoice()
    let play = userChoice+botChoice
    let winUser = false
    let tie = false
    switch(play){
        case 'rs': case 'sp': case 'pr':
            win('user')
            winUser=true
            lose('bot')
            break
        case 'ps': case 'sr': case 'rp':
            win('bot')
            lose('user')
            winUser=false
            break
        default:
            tie= true
    }
    draw(userChoice,botChoice,winUser,tie)

}
const main = ()=>{
    chopicesElements.addEventListener('click',e=>{
        e.preventDefault()
        let target = e.target
        if(target===rockElement)
            return game('r')
        if(target===paperElement)
            return game('p')
        if(target===scissorsElement)
            return game('s')
    })
}
main()