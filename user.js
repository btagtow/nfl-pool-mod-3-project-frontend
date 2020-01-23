const response = (response => response.json())
const weekURL = 'http://localhost:3000/weeks'
const selectionURL = 'http://localhost:3000/selections'
const gameURL = 'http://localhost:3000/games'
const searchParams = new URLSearchParams(window.location.search)
const weekDropDown = document.getElementById('week-drop-down')
const weekContainer = document.getElementById('week-container')
const week1Container = document.getElementById('week1-container')
const week2Container = document.getElementById('week2-container')
const week3Container = document.getElementById('week3-container')
const week4Container = document.getElementById('week4-container')
const week5Container = document.getElementById('week5-container')
const gameContainer = document.getElementById('game-container')
const pointsIndicator = document.getElementById('points')
const welcomeContainer = document.getElementById('welcome-container')
const profilePic = document.getElementById('image')
const selectionContainer = document.getElementById('selection-container')
gameContainer.append(week1Container,week2Container,week3Container,week4Container,week5Container)
const welcomeUser = document.getElementById('welcome-message')
const gameWeekArray = []
const back = document.getElementById('back')
const id = searchParams.get('id')
const body = document.body

document.addEventListener("DOMContentLoaded", () => {
    welcomeMessage()
    // fetchGameWeeks()
    // weekSelector()
    // gameSelector()
})
 
function welcomeMessage(){
    fetch(`http://localhost:3000/users/${id}`)
    .then(response)
    .then(user => {
        let welcome = document.createElement('h1')
        let points = document.createElement('h5')
        let backButton = document.createElement('button')
        let image = document.createElement('img')
        
        
        welcome.innerText = `${user.first} ${user.last}`
        points.innerText = `Points: ${user.points}`
        backButton.innerHTML=`<a href="http://localhost:3001/">Select new user</a>`
        image.src = user.image

        welcomeUser.append(welcome)
        pointsIndicator.append(points)
        back.append(backButton)
        profilePic.append(image)
    }
    )
}


function weekSelector(){
    fetch(`http://localhost:3000/weeks`)
        .then(response)
        .then(weeks => weeks.map(week => {
            let weekOptions = document.createElement('option')
            weekOptions.innerText = `Week ${week.week}`
            weekOptions.id = week.id
            weekDropDown.append(weekOptions)

        }
        )
        )
}
fetch(gameURL)
    .then(response)
    .then(games => weekListing(games))

function weekListing(games){
    appendAllGames(games)
    const gameWeekInt = (games.map(game => {
        return (game.week.week)
    }))
    const uniqGameWeekInt = gameWeekInt.filter(onlyUnique)
    uniqGameWeekInt.map(week => {
        let weekOptions = document.createElement('option')
        weekOptions.innerText = `Week ${week}`
        weekDropDown.append(weekOptions)
    })
}
function appendAllGames(games){
    games.map(game => {
        return game.week.week==1 ? addGamesAndButtons(game, week1Container)
        : game.week.week==2 ? addGamesAndButtons(game, week2Container)
        : game.week.week==3 ? addGamesAndButtons(game, week3Container)
        : game.week.week==4 ? addGamesAndButtons(game, week4Container)
        : game.week.week==5 ? addGamesAndButtons(game, week5Container)
        : console.log("done")
        // addGamesAndButtons(week2Container)
        // addGamesAndButtons(week3Container)
        // addGamesAndButtons(week4Container)
        // addGamesAndButtons(week5Container)

    

          
    })

}

function addGamesAndButtons(game, specificWeekContainer){
    let individualGameContainer = document.createElement('div')
    let gameListing = document.createElement('p')
    let homeTeamButton = document.createElement('button')
    let awayTeamButton = document.createElement('button')
    homeTeamButton.innerText = `select ${game.home.name}`
    awayTeamButton.innerText = `select ${game.away.name}`
    gameListing.id = game.id
    gameListing.innerHTML = `<a>Week ${game.week.week}: Home: ${game.home.name} vs. Away: ${game.away.name}</a>`
    specificWeekContainer.append(individualGameContainer)
    individualGameContainer.append(gameListing)
    individualGameContainer.append(homeTeamButton)
    individualGameContainer.append(awayTeamButton)

    homeTeamButton.addEventListener('click', () => {
        event.preventDefault()
        let choice = game.home.name
        let week_id = game.week.id
        let body = {
            'winner':choice,
            week_id
        }
        fetch(selectionURL, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)
        }
        )
        let selection = document.createElement('li')    
        selection.innerText = `Week ${game.week.week} selection: ${game.home.name}`
        selectionContainer.append(selection)
    })
    awayTeamButton.addEventListener('click', () => {
        event.preventDefault()
        let choice = game.away.name
        let week_id = game.week.id
        let body = {
            'winner':choice,
            week_id
        }
        fetch(selectionURL, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)
        }
        )    
        let selection = document.createElement('li')    
        selection.innerText = `Week ${game.week.week} selection: ${game.away.name}`
        selectionContainer.append(selection)
    })
} 

function removeGamesAndButtons(){

}


function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}