
// index 상단 마이페이지,로그인,회원가입,로그아웃
const payload = localStorage.getItem("payload");


const payload_parse = JSON.parse(payload)
console.log(payload_parse.account)

const intro = document.getElementById("intro")
intro.innerText = `${payload_parse.account}님 안녕하세요`


let navbarRight = document.getElementById("navbar-right")
let newLi = document.createElement("li")
newLi.setAttribute("class", "nav-item")

let logoutBtn = document.createElement("button")
logoutBtn.setAttribute("class", "nav-link btn")
logoutBtn.innerText = "로그아웃"
logoutBtn.setAttribute("onclick", "handleLogout()")

newLi.appendChild(logoutBtn)

navbarRight.appendChild(newLi)

let loginbtn = document.getElementById("login-btn")
loginbtn.style.display = "none";

let signupbtn = document.getElementById("signup-btn")
signupbtn.style.display = "none";


