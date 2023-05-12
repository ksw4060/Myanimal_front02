
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



