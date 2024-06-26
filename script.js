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

//fetch and set users

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

// buttons logics

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 }
  })
  updateDOM()
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money)
  updateDOM()
}

function showMillionaires() {
  data = data.filter((user) => user.money > 1000000)
  updateDOM()
}

function sumWealth() {
  const wealth = data.reduce((acc, user) => acc + user.money, 0)

  const wealthEl = document.createElement("div")
  wealthEl.innerHTML = `<h3> Total Wealth: <strong>${formatCurrency(wealth)}</strong></h3>`
  main.appendChild(wealthEl)
}

// DOM
function updateDOM(providedData = data) {
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

// events
const addUser = addUserBtn.addEventListener("click", getRandomUser)
const doubleWealth = doubleBtn.addEventListener("click", doubleMoney)
const sortRichest = sortBtn.addEventListener("click", sortByRichest)
const filterMillionaires = showMillBtn.addEventListener("click", showMillionaires)
const totalWealth = clcWealthBtn.addEventListener("click", sumWealth)
