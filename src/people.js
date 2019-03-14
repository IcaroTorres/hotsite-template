// import axios from 'axios'
// import { groupBy } from "lodash-es"

const randomUserApi = 'https://randomuser.me/api/?results=20'

async function fetchData() {
  const { default: groupBy } = await import(/* webpackChunkName: "lodash" */ 'lodash-es/groupBy')
  const { default: axios } = await import(/* webpackChunkName: "axios" */ 'axios')

  return axios.get(randomUserApi)
    .then(response => response.data.results)
    .then(people => people.map(user => ({
      gender: user.gender,
      name: user.name,
      email: user.email,
      login: user.login
    })))
    .then(users => {
      const components = []
      const group = groupBy(users, "gender");
      
      const container = document.createElement("div")
      container.innerHTML = `<pre id="code">${JSON.stringify(group, null, 2)}</pre>`
      components.push(container)
      
      const removeParagraph = document.createElement("p")
      const removeButtons = [
        { color: 'info', id: 'rmv-male' },
        { color: 'warning', id: 'rmv-female' }
      ];
      removeButtons.forEach((btn, idx) => {
        const button = document.createElement("button")
        button.textContent = `remove a ${idx ? 'fe' : ''}male user`
        button.classList.add('btn', btn.color)
        removeParagraph.appendChild(button)
        
        button.onclick = () => {
          import(/* webpackChunkName: "removeUser" */ "./removeUser").then(removeUser => {
            removeUser.remove(group, idx)
          })
        }
      })
      components.push(removeParagraph)

      const buttonsParagraph = document.createElement("p")
      const buttons = ['primary', 'accent', 'secondary', 'success', 'warning', 'info', 'error'];
      buttons.forEach((btnClass, idx) => {
        const button = document.createElement("button")
        button.textContent = `button ${idx}`
        button.classList.add('btn', btnClass)
        buttonsParagraph.appendChild(button)
        
        button.onclick = () => {
          import(/* webpackChunkName: "chat" */ "./chat").then(chat => {
            chat.countPeople({ group: group, idx: idx, btnClass: btnClass })
          })
        }
      })
      components.push(buttonsParagraph)

      return components
    }).catch(error => `An error occurred while loading the component: [${error}]`);
}

fetchData().then(components => {
  components.forEach(component => document.body.appendChild(component));
})