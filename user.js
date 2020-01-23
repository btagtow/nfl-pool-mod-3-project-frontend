const response = (response => response.json())
const weekURL = 'http://localhost:3000/weeks'
const gameURL = 'http://localhost:3000/games'
const searchParams = new URLSearchParams(window.location.search)
const weekDropDown = document.getElementById('week-drop-down')
const weekContainer = document.getElementById('week-container')
const gameContainer = document.getElementById('game-container')
const welcomeUser = document.getElementById('welcome-message')
const gameWeekArray = []
let back = document.getElementById('back')
const id = searchParams.get('id')
const body = document.body

document.addEventListener("DOMContentLoaded", () => {
    welcomeMessage()
    homeButton()
    // fetchGameWeeks()
    // weekSelector()
    // gameSelector()
})
 
function welcomeMessage(){
    fetch(`http://localhost:3000/users/${id}`)
    .then(response)
    .then(user => {
        let welcome = document.createElement('h1')
        welcome.innerText = `${user.first} ${user.last}`
        welcomeUser.append(welcome)
    }
    )
}

function homeButton(){
    let backButton =document.createElement('button')
    backButton.innerHTML=`<a href="http://localhost:3001/">Select new user</a>`
    back.append(backButton)

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
    let individualGameContainer = document.createElement('div')
    let gameListing = document.createElement('p')
    let homeTeamButton = document.createElement('button')
    let awayTeamButton = document.createElement('button')
    homeTeamButton.innerText = "select home"
    awayTeamButton.innerText = "select away"
    gameListing.id = game.id
    gameListing.innerHTML = `<a>Week ${game.week.week} - Home: ${game.home.name} vs. Away: ${game.away.name}</a>`
    gameContainer.append(individualGameContainer)
    individualGameContainer.append(gameListing)
    gameListing.append(homeTeamButton)
    gameListing.append(awayTeamButton)

    // homeTeamButton.addEventListener('click', () => {
    //     event.preventDefault()
    //     let choice = game.home
        

        
    // })

}
)
}
// createUser.addEventListener('submit', () => {
//     event.preventDefault()
//     let formData = new FormData(createUser)
//     let firstName = formData.get('first-name')
//     let lastName = formData.get('last-name')
//     let image = formData.get('image')

//     body = {
//         'first': firstName,
//         'last': lastName,
//         'points': "2",
//         'status': 'alive',

//         image
//         // team
//     }
//     fetch(userURL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body)

//     })
//     window.alert(`Hi ${firstName}, your profile has been created.`)



function pushSelections(button,homeOrAway){

    button.addEventListener('click', () => {
        
    })

}

// function()

    // const unique = game
    
    
    // weekDropDown.addEventListener("change", () => {
        //     let weekId = weekDropDown.options[weekDropDown.selectedIndex].id
        //     fetch(weekURL)
        //         .then(response)
        //         .then(weeks => {
            //             const selectedWeek = (weeks.find(week => {
                //                 week.id == weekId
                //             }
                //             )
                //             ) 
                //         function fetchGameWeeks(){
                    //             fetch(gameURL)
                    //                 .then(response)
                    //                 .then(games => games.map(game => {
                        //                     const gameWeek = (game.week)
                        //                     if (gameWeek.id == selectedWeek){
                            //                         console.log(game) 
                            //                     }
                            //                 }))
                            //             }
                            //         fetchGameWeeks()
                            //         }
                            //     )
                            // }
                            // )
                            
                            
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}