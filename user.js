const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
const body = document.body
const response = (response => response.json())
const weekURL = 'http://localhost:3000/weeks'
const selectionURL = 'http://localhost:3000/selections'
const userSelectionURL = 'http://localhost:3000/user_selections'
const gameURL = 'http://localhost:3000/games'
const picksURL = 'http://localhost:3000/picks'
const weekDropDown = document.getElementById('week-drop-down')
const weekDropDownSelect = document.getElementById('week-drop-down-select')
const weekContainer = document.getElementById('week-container')
const gameContainer = document.getElementById('game-container')
const welcomeContainer = document.getElementById('welcome-container')
const profilePicContainer = document.getElementById('profile-pic-container')
const pointsIndicator = document.getElementById('points')
const selectionContainer = document.getElementById('selection-container')
gameContainer.append(weekContainer)
const welcomeUser = document.getElementById('welcome-message')
const gameWeekArray = []
const back = document.getElementById('back')
const week1Selection = document.getElementById('week-1-selections')
const week2Selection = document.getElementById('week-2-selections')
const week3Selection = document.getElementById('week-3-selections')
const week4Selection = document.getElementById('week-4-selections')
const week5Selection = document.getElementById('week-5-selections')
const week6Selection = document.getElementById('week-6-selections')
const week7Selection = document.getElementById('week-7-selections')
const week8Selection = document.getElementById('week-8-selections')
const week9Selection = document.getElementById('week-9-selections')
selectionContainer.append(week1Selection, week2Selection, week3Selection, week4Selection, week5Selection, week6Selection, week7Selection, week8Selection, week9Selection)
const updateButton = document.getElementById('toggle-update-form')
const updateUserForm = document.getElementById('update-user-form')
pointsIndicator.append(updateUserForm)

document.addEventListener("DOMContentLoaded", () => {
    event.preventDefault()
    welcomeMessage()
    catchAll()
    toggleUpdateButton()
    // fetchGameWeeks()
    // weekSelector()
    // gameSelector()
})

 
function welcomeMessage(){
    fetch(`http://localhost:3000/users/${id}`)
        .then(response)
        .then(user => {
            showPicks(user.id)

            let welcome = document.createElement('h1')
            let points = document.createElement('h5')
            let backButton = document.createElement('button')
            let image = document.getElementById('prof-pic')
            
            welcome.innerText = `${user.first} ${user.last}`
            points.innerText = `Points: ${user.points}`
            backButton.innerHTML=`<a href="http://localhost:3001/">Select new user</a>`
            image.src = user.image

            welcomeUser.append(welcome)
            pointsIndicator.append(points)
            back.append(backButton)
            profilePicContainer.append(image)
            profilePicContainer.append(pointsIndicator)

            })
            
     }


function catchAll(){
    fetch(gameURL)
        .then(response)
        .then(games => weekListing(games))
}

function weekListing(games){
    appendAllGames(games)
    const theGames = games.map(game => {
        return game.week.week
    })
    const uniqGameWeekInt = theGames.filter(onlyUnique)
    uniqGameWeekInt.map(week => {
        let weekOptions = document.createElement('option')
        weekOptions.innerText = `Week ${week}`
        weekDropDown.append(weekOptions)
    })
}
function appendAllGames(games){
    weekDropDownSelect.addEventListener("click", () => {
        event.preventDefault()
        
        let week = weekDropDown.options[weekDropDown.selectedIndex]
        let weekId = week.innerText[5]

        games.map(game => {
            const gameWeek = game.week.week
    
            return checkWeekId(gameWeek, weekId) ? addGamesAndButtons(game, weekContainer)
            : console.log('nope')
        })
    })
}

function checkWeekId(gameWeek, weekId){
    return (gameWeek== parseInt(weekId))
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
        fetch(`http://localhost:3000/users/${id}`)
            .then(response)
            .then(user => {
                let currentUser = user.id
                let pick = game.home.name
                let week = game.week.week
                let body = {
                    'user': currentUser ,
                    pick, 
                    week
                }
                
        fetch(picksURL, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(body)
        })  
        window.alert(`Week ${week} pick: ${pick}`)
        let selection = document.createElement('li')    
        selection.innerText = `Week ${week} selection: ${pick}`
        gameContainer.append(selection)
        })
        // console.log(fetchPicks())
    })
    
    awayTeamButton.addEventListener('click', () => {
        event.preventDefault()
        fetch(`http://localhost:3000/users/${id}`)
            .then(response)
            .then(user => {
                let currentUser = user.id
                let pick = game.away.name
                let week = game.week.week
                let body = {
                    'user': currentUser ,
                    pick, 
                    week
                }
                
                postPicks( week , pick , body ) 


            })
        // console.log(fetchPicks())
    })
    }

function postPicks(week, pick, body){
                    
    fetch('http://localhost:3000/picks', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(body)
    })  
    window.alert(`Week ${week} pick: ${pick}`)
    let selection = document.createElement('li')    
    selection.innerText = `Week ${week} selection: ${pick}`
    pointsIndicator.append(selection)

}




function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function showPicks(user){

    fetch(picksURL)
        .then(response)
        .then(picks => picks.map(pick => {
            // console.log(pick)

            const userId = parseInt(pick.user)

            if (user == userId){
                li = document.createElement('li')
                li.innerText = `Week ${pick.week}: ${pick.pick}`
                
                deleteButton = document.createElement('button')
                deleteButton.innerText = "DELETE"
                separateCurrentPicks(pick, deleteButton)
                deletePick(deleteButton, pick)

            }
        }))
        
    }
    
    function separateCurrentPicks(pick, deleteButton){

        return pick.week == "1" ? week1Selection.append(li, deleteButton)
        : pick.week == "2" ? week2Selection.append(li, deleteButton)
        : pick.week == "3" ? week3Selection.append(li, deleteButton)
        : pick.week == "4" ? week4Selection.append(li, deleteButton)
        : pick.week == "5" ? week5Selection.append(li, deleteButton)
        : pick.week == "6" ? week6Selection.append(li, deleteButton)
        : pick.week == "7" ? week7Selection.append(li, deleteButton)
        : pick.week == "8" ? week8Selection.append(li, deleteButton)
        : pick.week == "9" ? week9Selection.append(li, deleteButton)
        : console.log('didnt seed that much yo')
        
}

function deletePick(deleteButton, pick){
    deleteButton.addEventListener('click', () => {
        fetch(`http://localhost:3000/picks/${pick.id}`, {
            method:"DELETE"
        })

    }
    )
}

function updateForm(){
    updateUserForm.addEventListener('submit', () => {
        event.preventDefault()
        location.reload(forceGet)

        let formData = new FormData(updateUserForm)
        let firstName = formData.get('first-name')
        let lastName = formData.get('last-name')
        let image = formData.get('image')

        body = {
            'first': firstName,
            'last': lastName,
            image
            // team
        }
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)

        })

    })
}


function toggleUpdateButton() {
    if (updateUserForm.style.visibility === 'hidden') {
      updateUserForm.style.visibility = 'visible';
    } else {
      updateUserForm.style.visibility = 'hidden';
    }
  }  
    
updateButton.addEventListener("click", () => {
    event.preventDefault()
    toggleUpdateButton()
}
)