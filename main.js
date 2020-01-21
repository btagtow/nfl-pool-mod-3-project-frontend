const response = (response => response.json())
const user_container = document.getElementById('user-container')
const game_container = document.getElementById('game-container')
document.addEventListener("DOMContentLoaded", () => {

    fetchUsers()
    fetchGames()

})

function fetchUsers(){
    fetch('http://localhost:3000/users')
        .then(response)
        .then(users => users.map(user => {
            const userDetails = document.createElement('li')
            userDetails.innerHTML = `<a href = "http://localhost:3001/user.html?id=${user.id}">${user.first_name}</a>`
            user_container.append(userDetails)
        }))
}
function fetchGames(){
    fetch('http://localhost:3000/games')
        .then(response)
        .then(games => games.map(game => {
            const gameDetails = document.createElement('li')
            gameDetails.innerHTML = `<a href = "http://localhost:3001/game.html?id=${game.id}">Week ${game.week}: ${game.home} vs ${game.away}</a>`
            game_container.append(gameDetails)
        }))
}

//eventually delete fetchGames, first thing should just be to select a user