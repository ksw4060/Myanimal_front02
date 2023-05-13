

// 로그인 하여 토큰발급시 유저의 account를 마이페이지 옆에 표시해줌
window.onload = () => {
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload)
  console.log(payload_parse.account)

  const intro = document.getElementById("intro")
  intro.innerText = payload_parse.account
}


const page = document.querySelector('#page');; //ul
let pageNumber = document.getElementById('page_number'); //페이지넘버를 담는 변수
let current_page = 1; // 현재 시작 페이지 넘버는 1로 지정한다.
let records_per_page = 8 // 한 페이지당 보여질 게시글 수
const rows = document.querySelectorAll('#my-table ul li');
const rowsCount = rows.length; // 게시글의 갯수 카운트

let pageNumbers = function () {
  let pageNumber = document.getElementById('page_number');
  pageNumber.innerHTML = "";

  for (let i = 1; i < numPages() + 1; i++) {
    // 페이지 수 만큼 innerHTML를 이용해 숫자를 넣어준다.
    pageNumber.innerHTML += `<span class="page-item" aria-current="page"><a class="page-link" href="">${i}</a></span>`;
  }

}
let numPages = function () {
  //게시글 수를 보여질 게시글 수로 나눈 뒤 올림연산하여 페이지 수를 구한다.
  return Math.ceil(rowsCount / records_per_page);
}

let changePage = function (page) {
  const ul = document.querySelector('ul.discussions__container');

  if (page < 1) {
    page = 1;
  }
  if (page > (numPages() - 1)) {
    page = numPages();
  }

  ul.innerHTML = "";

  for (var i = (page - 1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
    ul.innerHTML += "<div class='objectBlock'>" + Json[i].id + "</div>";
  }
  //json파일의 id값이 10번출력됨.
}

// let rowPerPage = 8; //한 페이지당 표시되는 게시글의 수
// const rows = document.querySelectorAll('#my-table ul li');
// const rowsCount = rows.length; // 게시글의 갯수 카운트
// const pageCount = Math.ceil(rowsCount / rowPerPage); //총 갯수/모든게시물을 나눳을때 무조건 올림으로 페이지를 만들어줌
// const page = document.querySelector('#page'); //id 지정해준 ul을 쿼리셋으로 저장
// let current_page = 1; //현재페이지는 1

// async function pagination() {

//     //페이지네이션 생성
//     /* <li class="page-item active" aria-current="page"><a class="page-link" href="#!">1</a></li> 
//     for (초기값;조건;증감){}
//     */

//     for (let i = 1; i <= pageCount; i++) {
//         page.innerHTML = `<li class="page-item active" aria-current="page"><a class="page-link" href="">${i}</a></li>`;
//         page.innerHTML += `<li class="page-item active" aria-current="page"><a class="page-link" href="">${i + 1}</a></li>`;
//     }

//     console.log(rows);
//     function displayRow(idx) {
//         const rowsArray = [...rows];
//         console.log(rowsArray)
//     }

// }

// pagination();





// 게시글 피드 보여주기
window.onload = async function loadArticles() {
  const response = await fetch(`${backend_base_url}/articles/`);
  const articles = await response.json();
  console.log(articles)

  const articleList = document.getElementById('article-list');


  articles.forEach((article) => {
    // db에 추가될때마다 front도 새로 만들어짐
    const articleCard = document.createElement('div');
    articleCard.classList.add('col', 'mb-5');
    // 아래 html이 반복되어 입력됨
    // 이미지의 경우 이미지 경로에 이미지가 있으면 보여주고 없을경우(?) 기본이미지를 가져옴..저희집 고양이 귀엽죠 여러분
    // 채연 : 넹 너무 기여워요 ㅠ 어케 이케 이쁘지 저 납치 해도 될까요? 물론 소진님을
    articleCard.innerHTML = `
        <a style = "text-decoration:none; color:black;" href="article_detail.html?id=${article.id}">

        <div class="card h-100">
          <img class="card-img-top" src="${article.article_image ? article.article_image : './assets/images/IMG_8257.jpg'}" alt="" />
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${article.article_title}</h5>
              <label for="" class="category">${article.category}</label>
              <hr>
              <label for="" class="user">${article.user}</label>
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            
          </div>
        </div>
        </a>
      `;

    articleList.appendChild(articleCard);
    // loadArticles();
  });
}






//고양이 api 가져오기
async function CatCategory() {
  console.log("고양이 버튼 실행")
  const petarticles = await getCatArticles();
  console.log(petarticles)

  const petarticlesList = document.getElementById('article-list');
  petarticlesList.innerHTML = ''; // 기존에 표시된 게시글 초기화

  petarticles.forEach((article) => {
    const articleCard = document.createElement('div');
    articleCard.classList.add('col', 'mb-5');
    // 아래 html이 반복되어 입력됨
    // 이미지의 경우 이미지 경로에 이미지가 있으면 보여주고 없을경우(?) 기본이미지를 가져옴..저희집 고양이 귀엽죠 여러분
    articleCard.innerHTML = `
        <div class="card h-100">
          <img class="card-img-top" src="${article.article_image ? article.article_image : './assets/images/IMG_8257.jpg'}" alt="" />
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${article.article_title}</h5>
              <label for="" class="category">${article.category}</label>
              <hr>
              <label for="" class="user">${article.user}</label>
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              <a class="btn me-2 btn_org" href="#">보러가기</a>
            </div>
          </div>
        </div>
      `;

    petarticlesList.appendChild(articleCard);
  })
}





//강아지 api 가져오기
async function DogCategory() {
  console.log("강아지 버튼 실행")
  const petarticles = await getDogArticles();
  console.log(petarticles)

  const petarticlesList = document.getElementById('article-list');
  petarticlesList.innerHTML = ''; // 기존에 표시된 게시글 초기화

  petarticles.forEach((article) => {
    const articleCard = document.createElement('div');
    articleCard.classList.add('col', 'mb-5');
    // 아래 html이 반복되어 입력됨
    // 이미지의 경우 이미지 경로에 이미지가 있으면 보여주고 없을경우(?) 기본이미지를 가져옴..저희집 고양이 귀엽죠 여러분
    articleCard.innerHTML = `
        <div class="card h-100">
          <img class="card-img-top" src="${article.article_image ? article.article_image : './assets/images/IMG_8257.jpg'}" alt="" />
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${article.article_title}</h5>
              <label for="" class="category">${article.category}</label>
              <hr>
              <label for="" class="user">${article.user}</label>
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              <a class="btn me-2 btn_org" href="#">보러가기</a>
            </div>
          </div>
        </div>
      `;

    petarticlesList.appendChild(articleCard);
  })
}



async function birdCategory() {
  const petarticles = await getBirdArticles();
  console.log(petarticles)

  const petarticlesList = document.getElementById('article-list');
  petarticlesList.innerHTML = ''; // 기존에 표시된 게시글 초기화

  petarticles.forEach((article) => {
    const articleCard = document.createElement('div');
    articleCard.classList.add('col', 'mb-5');
    // 아래 html이 반복되어 입력됨
    // 이미지의 경우 이미지 경로에 이미지가 있으면 보여주고 없을경우(?) 기본이미지를 가져옴..저희집 고양이 귀엽죠 여러분
    articleCard.innerHTML = `
        <div class="card h-100">
          <img class="card-img-top" src="${article.article_image ? article.article_image : './assets/images/IMG_8257.jpg'}" alt="" />
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${article.article_title}</h5>
              <label for="" class="category">${article.category}</label>
              <hr>
              <label for="" class="user">${article.user}</label>
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              <a class="btn me-2 btn_org" href="#">보러가기</a>
            </div>
          </div>
        </div>
      `;

    petarticlesList.appendChild(articleCard);
  })

};

// birdCategory('새')

async function fishCategory() {
  const petarticles = await getFishArticles();
  console.log(petarticles)

  const petarticlesList = document.getElementById('article-list');
  petarticlesList.innerHTML = ''; // 기존에 표시된 게시글 초기화

  petarticles.forEach((article) => {
    const articleCard = document.createElement('div');
    articleCard.classList.add('col', 'mb-5');
    // 아래 html이 반복되어 입력됨
    // 이미지의 경우 이미지 경로에 이미지가 있으면 보여주고 없을경우(?) 기본이미지를 가져옴..저희집 고양이 귀엽죠 여러분
    articleCard.innerHTML = `
        <div class="card h-100">
          <img class="card-img-top" src="${article.article_image ? article.article_image : './assets/images/IMG_8257.jpg'}" alt="" />
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${article.article_title}</h5>
              <label for="" class="category">${article.category}</label>
              <hr>
              <label for="" class="user">${article.user}</label>
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              <a class="btn me-2 btn_org" href="#">보러가기</a>
            </div>
          </div>
        </div>
      `;

    petarticlesList.appendChild(articleCard);
  })

};

// fishCategory('물고기')

async function snailCategory() {
  const petarticles = await getSnailArticles();
  console.log(petarticles)

  const petarticlesList = document.getElementById('article-list');
  petarticlesList.innerHTML = ''; // 기존에 표시된 게시글 초기화

  petarticles.forEach((article) => {
    const articleCard = document.createElement('div');
    articleCard.classList.add('col', 'mb-5');
    // 아래 html이 반복되어 입력됨
    // 이미지의 경우 이미지 경로에 이미지가 있으면 보여주고 없을경우(?) 기본이미지를 가져옴..저희집 고양이 귀엽죠 여러분
    articleCard.innerHTML = `
        <div class="card h-100">
          <img class="card-img-top" src="${article.article_image ? article.article_image : './assets/images/IMG_8257.jpg'}" alt="" />
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${article.article_title}</h5>
              <label for="" class="category">${article.category}</label>
              <hr>
              <label for="" class="user">${article.user}</label>
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              <a class="btn me-2 btn_org" href="#">보러가기</a>
            </div>
          </div>
        </div>
      `;

    petarticlesList.appendChild(articleCard);
  })

};

// snailCategory('달팽이')

async function stoneCategory() {
  const petarticles = await getStoneArticles();
  console.log(petarticles)

  const petarticlesList = document.getElementById('article-list');
  petarticlesList.innerHTML = ''; // 기존에 표시된 게시글 초기화

  petarticles.forEach((article) => {
    const articleCard = document.createElement('div');
    articleCard.classList.add('col', 'mb-5');
    // 아래 html이 반복되어 입력됨
    // 이미지의 경우 이미지 경로에 이미지가 있으면 보여주고 없을경우(?) 기본이미지를 가져옴..저희집 고양이 귀엽죠 여러분
    articleCard.innerHTML = `
        <div class="card h-100">
          <img class="card-img-top" src="${article.article_image ? article.article_image : './assets/images/IMG_8257.jpg'}" alt="" />
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${article.article_title}</h5>
              <label for="" class="category">${article.category}</label>
              <hr>
              <label for="" class="user">${article.user}</label>
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              <a class="btn me-2 btn_org" href="#">보러가기</a>
            </div>
          </div>
        </div>
      `;

    petarticlesList.appendChild(articleCard);
  })

};

// stoneCategory('애완돌')

async function turtleCategory() {
  const petarticles = await getTurtleArticles();
  console.log(petarticles)

  const petarticlesList = document.getElementById('article-list');
  petarticlesList.innerHTML = ''; // 기존에 표시된 게시글 초기화

  petarticles.forEach((article) => {
    const articleCard = document.createElement('div');
    articleCard.classList.add('col', 'mb-5');
    // 아래 html이 반복되어 입력됨
    // 이미지의 경우 이미지 경로에 이미지가 있으면 보여주고 없을경우(?) 기본이미지를 가져옴..저희집 고양이 귀엽죠 여러분
    articleCard.innerHTML = `
        <div class="card h-100">
          <img class="card-img-top" src="${article.article_image ? article.article_image : './assets/images/IMG_8257.jpg'}" alt="" />
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${article.article_title}</h5>
              <label for="" class="category">${article.category}</label>
              <hr>
              <label for="" class="user">${article.user}</label>
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              <a class="btn me-2 btn_org" href="#">보러가기</a>
            </div>
          </div>
        </div>
      `;

    petarticlesList.appendChild(articleCard);
  })

};

// turtleCategory('거북이')



