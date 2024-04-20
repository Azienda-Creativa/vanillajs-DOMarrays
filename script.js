const main = document.getElementById("main")
const addUserBtn = document.getElementById("add-user")
const doubleBtn = document.getElementById("double")
const showMillBtn = document.getElementById("show-millionaires")
const sortBtn = document.getElementById("sort")
const clcWealthBtn = document.getElementById("calculate-wealth")

let data = []
getRandomUser()
getRandomUser()
getRandomUser()

//fetch random users and add money

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api")
  const data = await res.json()
  const user = data.results[0]
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  }
  addData(newUser)
}

function addData(obj) {
  data.push(obj)
  updateDOM()
}

function updateDOM(providedData = data) {
  //clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>"
  providedData.forEach((item) => {
    const element = document.createElement("div")
    element.classList.add("person")
    element.innerHTML = `<h4><strong/>${item.name}</strong> ${formatCurrency(item.money)}</h4>`
    main.appendChild(element)
  })
}

function formatCurrency(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
}

const addUser = addUserBtn.addEventListener("click", getRandomUser)
