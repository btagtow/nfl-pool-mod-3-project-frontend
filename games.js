const response = (response => response.json())
const main_container = document.getElementById('main-container')
const userList = document.createElement('ul')
const user_container = document.getElementById('user-container')
const week1_container = document.getElementById('week1-container')
const week2_container = document.getElementById('week2-container')
const week3_container = document.getElementById('week3-container')
const week4_container = document.getElementById('week4-container')
const week5_container = document.getElementById('week5-container')
const week6_container = document.getElementById('week6-container')
const week7_container = document.getElementById('week7-container')
const week8_container = document.getElementById('week8-container')
const week9_container = document.getElementById('week9-container')
const week10_container = document.getElementById('week10-container')
const week11_container = document.getElementById('week11-container')
const week12_container = document.getElementById('week12-container')
const week13_container = document.getElementById('week13-container')
const week14_container = document.getElementById('week14-container')
const week15_container = document.getElementById('week14-container')
const week16_container = document.getElementById('week14-container')
main_container.append(user_container)
user_container.append(userList)


document.addEventListener("DOMContentLoaded", () => {
    fetchUsers()
    fetchGames()


})

function fetchUsers(){
    fetch ('http://localhost:3000/users')
    .then(response)
    .then(users => users.map(user => {
        const userDetails = document.createElement('li')
        userDetails.innerHTML = `<a href = "http://localhost:3001/user.html?id=${user.first_name}">${user.first_name}</a>`
        userList.append(userDetails)
    }))
}
function fetchGames(){
    fetch ('http://localhost:3000/games')
        .then(response)
        .then(games => games.map(game => {
            (sortGames(game, 1, week1_container)),
            (sortGames(game, 2, week2_container)),
            (sortGames(game, 3, week3_container)),
            (sortGames(game, 4, week4_container)),
            (sortGames(game, 5, week5_container)),
            (sortGames(game, 6, week6_container))


        }
        ))
    }
function sortGames(game, game_week, game_week_container){
    if (game.week == game_week){
        const week_games = document.createElement('p')

        week_games.innerText = `${game.home} vs. ${game.away}`

        main_container.append(game_week_container)
        game_week_container.append(week_games)

    }

}
