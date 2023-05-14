const frontend_base_url = "http://127.0.0.1:5000"
const backend_base_url = "http://127.0.0.1:8000"

$(document).ready(async function () {

    console.log("api.js 로딩")

    let urlParam = new URLSearchParams(window.location.search);
    let user_id = urlParam.get('user_id');
    console.log('유저아이디')
    // console.log(user_id);
});

/////////////////////////////////////////////////// 프로필 관련 api
// fetch
// async function getProfile(user_id) {
//     // const response = await fetch(`${backend_base_url}/users/profile/` + user_id)
//     // const response = await fetch(`${backend_base_url}/users/profile/${user_id}`)
//     const response = await fetch(`${backend_base_url}/users/profile/${user_id}/`,)

//     if (response.status === 200) {
//         const response_json = await response.json()
//         // console.log(response_json)
//         return response_json
//     } else {
//         // alert(response.status + ": 불러오기 실패")
//         window.location.href = "404.html";
//     }

//     console.log(response)
// };

// async function getProfile2(user_id) {
//     const response = await fetch(`${backend_base_url}/articles/list/${user_id}/`,)

//     if (response.status === 200) {
//         const response_json = await response.json()
//         // console.log(response_json)
//         return response_json
//     } else {
//         // alert(response.status + ": 불러오기 실패")
//         window.location.href = "404.html";
//     }

//     console.log(response)
// };

// async function getProfile3(user_id) {
//     const response = await fetch(`${backend_base_url}/articles/received/hearts/${user_id}/`,)

//     if (response.status === 200) {
//         const response_json = await response.json()
//         // console.log(response_json)
//         return response_json
//     } else {
//         // alert(response.status + ": 불러오기 실패")
//         window.location.href = "404.html";
//     }

//     console.log(response)
// };

// ajax
async function getProfile(user_id) {
    try {
        const response = await $.ajax({
            url: `${backend_base_url}/users/profile/${user_id}/`,
            method: 'GET'
        });

        // console.log(response);
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

        // console.log(response);
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

        // console.log(response);
        // 응답 데이터 처리

        return response; // 결과 반환

    } catch (error) {
        console.error(error);
        // 실패 시 처리
        window.location.href = "404.html";
    }
};

// // 이 곳에서 하면 안되나? request_id 즉, payload를 파스해서 id를 불러와야 한다.
// // put profile
// console.log('tset')
// console.log(user_id)
// 파일만 변경이 안됨.
// 다시 불러오기를 실행해야함. 새로고침없이...
async function putProfile() {
    const image = $('#image-input')[0].files[0];
    const category = $('#mySelect').val();
    const myNickname = $('#myNickname').val();
    console.log(image);
    console.log(category);
    const formData = new FormData();

    formData.append('profile_img', image);
    formData.append('category', category);
    formData.append('nickname', myNickname);

    // console.log(formData);

    if (formData.has('category')) {
        console.log('카테고리가 존재합니다.');
    } else {
        console.log('카테고리가 존재하지 않습니다.');
    }

    let token = localStorage.getItem("access");
    // console.log('토큰이 있나?');
    // console.log(token);
    // console.log('유저아이디가?')
    let urlParam = new URLSearchParams(window.location.search);
    user_id = urlParam.get('user_id');
    // console.log(user_id)
    // console.log('없다고?')

    const response = await fetch(`${backend_base_url}/users/profile/${user_id}/`, {
        method: 'PATCH',
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    })
    // console.log(response);
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



// axios
// const axios = require('axios');

// axios.get('${backend_base_url}/users/profile/', {
//     params: {
//         user_id: user_id
//     }
// })
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
//     .finally(function () {
//         // 항상 실행되는 영역
//     });

// async function getProfile(user_id) {
//     try {
//         const response = await axios.get('${backend_base_url}/users/profile/' + user_id);
//         console.log(response);
//     } catch (error) {
//         console.error(error);
//     }
// }
//================




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
