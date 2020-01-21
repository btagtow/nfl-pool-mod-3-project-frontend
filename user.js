const response = (response => response.json())
const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
const body = document.body
const selectionList = document.createElement('ul')
const user_name = document.getElementById('user-name')


document.addEventListener("DOMContentLoaded", () => {
    displayPicks()
    makePick()
})

function displayPicks(){
    fetch(`http://localhost:3000/users/${id}`)
        .then(response)
        .then(user => {
            const user_selections = document.createElement('p')
            user_name.innerText = `Name: ${user.first_name} ${user.last_name}`
            user_selections.innerText = `
            Week 1 pick: ${user.week1pick}
            Week 2 pick: ${user.week2pick}
            Week 3 pick: ${user.week3pick}
            Week 4 pick: ${user.week4pick}
            Week 5 pick: ${user.week5pick}
            Week 6 pick: ${user.week6pick}
            Week 7 pick: ${user.week7pick}
            Week 8 pick: ${user.week8pick}
            Week 9 pick: ${user.week9pick}
            Week 10 pick: ${user.week10pick}
            Week 11 pick: ${user.week11pick}
            Week 12 pick: ${user.week12pick}
            Week 13 pick: ${user.week13pick}
            Week 14 pick: ${user.week14pick}
            Week 15 pick: ${user.week15pick}
            Week 16 pick: ${user.week16pick}
            Week 17 pick: ${user.week17pick}
            `
            body.append(user_name)
            body.append(selectionList)
            selectionList.append(user_selections)


    }
 )
}

function makePick(){    
    fetch(`http://localhost:3000/users/`, {
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            week1pick: "Denver Broncos"
        })
    }
    )

}

