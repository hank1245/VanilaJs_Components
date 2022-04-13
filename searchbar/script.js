const userCardTemplate = document.querySelector('template')
const userCardsContainer = document.querySelector('.users')
const searchInput = document.querySelector('.search')

let users = []

searchInput.addEventListener('input', e =>{
    const value = e.target.value.toLowerCase()
    users.forEach(user =>{
        const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
        user.element.classList.toggle('hide', !isVisible)
    })
})

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
        users = data.map(user =>{
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const name = card.querySelector('.name')
        const email = card.querySelector('.email')
        name.textContent = user.name
        email.textContent = user.email
        userCardsContainer.append(card)
        return {name: user.name, email: user.email, element: card}
      })
  })