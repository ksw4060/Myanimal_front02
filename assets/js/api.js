const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

// 로그아웃
function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}



async function getArticles() {
    const response = await fetch(`${backend_base_url}/articles/`)
    console.log(response)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오기 실패!")
    }
}



// 아래부터는 저의 노가다입니다.. 각 카테고리별 api불러오기..
// 고양이 불러오기
async function getCatArticles() {
    const response = await fetch(`${backend_base_url}/articles/?category=cat`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오기 실패!")
    }
}

// 강아지 불러오기
async function getDogArticles() {
    const response = await fetch(`${backend_base_url}/articles/?category=dog`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오기 실패!")
    }
}

// bird 불러오기
async function getBirdArticles() {
    const response = await fetch(`${backend_base_url}/articles/?category=bird`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오기 실패!")
    }
}

// fish 불러오기
async function getFishArticles() {
    const response = await fetch(`${backend_base_url}/articles/?category=fish`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오기 실패!")
    }
}

// snail 불러오기
async function getSnailArticles() {
    const response = await fetch(`${backend_base_url}/articles/?category=snail`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오기 실패!")
    }
}

// stone 불러오기
async function getStoneArticles() {
    const response = await fetch(`${backend_base_url}/articles/?category=stone`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오기 실패!")
    }
}

// turtle 불러오기
async function getTurtleArticles() {
    const response = await fetch(`${backend_base_url}/articles/?category=turtle`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오기 실패!")
    }
}