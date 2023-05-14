
// 로그아웃
async function handleLogout() {
    event.preventDefault();
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.replace('index.html')
}
async function handlecreatearticle() {
    location.href='create_article.html'
}


// 상단 네비바, 푸터 가져오기

document.addEventListener("DOMContentLoaded", function () {

    // 네비바를 삽입할 위치
    var navbarContainer = document.querySelector("#navbar-container");

    if (navbarContainer) {
        // base-nav.html 파일을 가져와서 네비게이션바 위치에 삽입
        fetch("base-nav.html")
            .then(response => response.text())
            .then(data => {
                navbarContainer.innerHTML = data;

                // base-nav.html이 로드된 후에 intro 태그와 기타 작업을 수행
                const payload = localStorage.getItem("payload");
                const payload_parse = JSON.parse(payload)

                const intro = document.getElementById("intro");
                if (intro) {
                    const payload = localStorage.getItem("payload");
                    const payload_parse = JSON.parse(payload);
                    intro.innerText = `${payload_parse.nickname}님 안녕하세요`;
                    intro.href = `${frontend_base_url}/profile.html?user_id=` + payload_parse.user_id;

                    let navbarRight = document.getElementById("navbar-right");
                    let newLi = document.createElement("li");
                    newLi.setAttribute("class", "nav-item");

                    let logoutBtn = document.createElement("button");
                    logoutBtn.setAttribute("class", "nav-link btn");
                    logoutBtn.innerText = "로그아웃";
                    logoutBtn.setAttribute("onclick", "handleLogout()");

                    let createarticle = document.getElementById("create-article");
                    createarticle.innerText = "글쓰기";
                    createarticle.setAttribute("class", "nav-link btn")
                    createarticle.setAttribute('onclick', 'handlecreatearticle()');

                    newLi.appendChild(logoutBtn);

                    navbarRight.appendChild(newLi);
                }

                let loginbtn = document.getElementById("login-btn");
                if (loginbtn) {
                    loginbtn.style.display = "none";
                }

                let signupbtn = document.getElementById("signup-btn");
                if (signupbtn) {
                    signupbtn.style.display = "none";
                }



            })
            .catch(error => {
                console.error("Error fetching navigation bar:", error);
            });
    }

    // 푸터를 삽입할 위치
    var footerContainer = document.querySelector("#footer-container");

    if (footerContainer) {
        // base-footer.html 파일을 가져와서 푸터 위치에 삽입
        fetch("base-footer.html")
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => {
                console.error("Error fetching footer:", error);
            });
    }
});

