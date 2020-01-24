const response = (response => response.json())
const teamURL = 'http://localhost:3000/teams'
const userURL = 'http://localhost:3000/users'
const userContainer = document.getElementById('user-container')
const weekContainer = document.getElementById('week-container')
const userDropDown = document.querySelector('#user-selector')
const weekDropDown = document.querySelector('#week-selector')
const createUser = document.getElementById('create-user') 
const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')
const favoriteTeamSelector = document.getElementById('favorite-team-selector')
const viewUserButton = document.getElementById('view-user')
const updateUser = document.getElementById('update-user')
const userViewer = document.getElementById('user-viewer')
const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
const imageURL = `http://localhost:3000/predictions/7`
const imageId = `7`
const imageCard = document.getElementById('image_card')
const superBowlPrediction = document.getElementById('super-bowl-prediction')
const likeButton = document.getElementById('like_button')
const likeCount = document.getElementById('likes')
superBowlPrediction.append(imageCard)
document.addEventListener("DOMContentLoaded", () => {

    fetchUsers()
    // fetchWeeks()
    signUpForm()
    // fetchTeams()

    userPage()

    
    likeCounter(imageURL, 7)
    
    imageData()
})


function fetchUsers(){
    fetch('http://localhost:3000/users')
        .then(response)
        .then(users => users.map(user => {
            const userDetails = document.createElement('option')

            userDetails.innerHTML = `${user.first} ${user.last}`

            userDetails.value = user.id

            userDetails.id = user.id
            
            userDropDown.append(userDetails)


        }))
}

function userPage(){
    viewUserButton.addEventListener('click', () => {
        let user = userDropDown.options[userDropDown.selectedIndex].id
        window.location.replace(`http://localhost:3001/user.html?id=${user}`)
    })

}


function fetchWeeks(){
    fetch('http://localhost:3000/weeks')
        .then(response)
        .then(weeks => weeks.map(week => {
            const theWeek = document.createElement('option')
            theWeek.innerHTML = `<a href="http://localhost:3001/weeks.html/id=?${week.id}">Week ${week.week}</a>`
            weekDropDown.append(theWeek)
        }))

    }

function signUpForm(){
    createUser.addEventListener('submit', () => {
        event.preventDefault()
        let formData = new FormData(createUser)
        let firstName = formData.get('first-name')
        let lastName = formData.get('last-name')
        let image = formData.get('image')

        body = {
            'first': firstName,
            'last': lastName,
            'points': "2",
            'status': 'alive',
            image
            // team
        }
        fetch(userURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)

        })
        window.alert(`Hi ${firstName}, your profile has been created.`)
    })
}

function imageData(){
    fetch(`http://localhost:3000/predictions/`)
        .then(response)
        .then(images => images.map(image => {
        const chiefs = document.getElementById('chiefs')
    
        chiefs.src = image.image   
        likeButton.innerText = 'Throw a like for the Chiefs to win.'
        likeCount.innerText = image.likes

        imageCard.append(chiefs)
        imageCard.append(likeButton)
        imageCard.append(likeCount)
        
        
        })
        )
        }

function likeCounter(imageURL, imageId){

    likeButton.addEventListener('click', () => {
    
        event.preventDefault()

    
        const toNum = parseInt(likes.innerText)
        likes.innerText = toNum+1
    
        fetch(imageURL, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id:imageId
        })
        }
        )
    })
    }