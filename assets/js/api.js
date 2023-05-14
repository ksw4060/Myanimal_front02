const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

$(document).ready(async function () {


    let urlParam = new URLSearchParams(window.location.search);
    let user_id = urlParam.get('user_id');
});

/////////////////////////////////////////////////// 프로필 관련 api

// ajax
async function getProfile(user_id) {
    try {
        const response = await $.ajax({
            url: `${backend_base_url}/users/profile/${user_id}/`,
            method: 'GET'
        });

        // 응답 데이터 처리
        return response; // 결과 반환

    } catch (error) {
        console.error(error);
        // 실패 시 처리
        window.location.href = "404.html";
    }
};

async function getProfile2(user_id) {
    try {
        const response = await $.ajax({
            url: `${backend_base_url}/articles/list/${user_id}/`,
            method: 'GET'
        });

        // 응답 데이터 처리
        return response; // 결과 반환

    } catch (error) {
        console.error(error);
        // 실패 시 처리
        window.location.href = "404.html";
    }
};

async function getProfile3(user_id) {
    try {
        const response = await $.ajax({
            url: `${backend_base_url}/articles/received/hearts/${user_id}/`,
            method: 'GET'
        });

        // 응답 데이터 처리
        return response; // 결과 반환

    } catch (error) {
        console.error(error);
        // 실패 시 처리
        window.location.href = "404.html";
    }
};

// 다시 불러오기를 실행해야함. 새로고침없이...
async function putProfile() {
    const image = $('#image-input')[0].files[0];
    const category = $('#mySelect').val();
    const myNickname = $('#myNickname').val();
    const formData = new FormData();

    formData.append('profile_img', image);
    formData.append('category', category);
    formData.append('nickname', myNickname);

    let token = localStorage.getItem("access");
    let urlParam = new URLSearchParams(window.location.search);
    user_id = urlParam.get('user_id');

    const response = await fetch(`${backend_base_url}/users/profile/${user_id}/`, {
        method: 'PATCH',
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    })
    if (response.status === 200) {
        alert('수정 성공')
        // alert(response.status)
        $('.hidden').hide();
        $('#edit-btn').show();
        $('.original-content').show();
        // 눈속임으로 값만 대입시킬 수 도 있음. 미리...
        location.reload();
    } else {
        alert(response.status)
        // window.location.href = "404.html";
    }
};

/////////////////////////////////////////////////// 프로필 끝

// 로그아웃
async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload()
}



async function getArticles() {
    const response = await fetch(`${backend_base_url}/articles/`)

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
