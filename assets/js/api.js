const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

window.onload = () => {
    console.log("api.js 로딩")
}

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

        console.log(response);
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

        console.log(response);
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

        console.log(response);
        // 응답 데이터 처리

        return response; // 결과 반환

    } catch (error) {
        console.error(error);
        // 실패 시 처리
        window.location.href = "404.html";
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