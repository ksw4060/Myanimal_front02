console.log("찍힘")

async function nextPage() {
    const response = await fetch(`${backend_base_url}/articles/pagination/?page=2`);
    const data = await response.json();
    // 페이지네이션한 게시글들은 object객체로 받아옴 해당 객체를 배열로 만들고 null값은 건너뛰어서 오류발생 활률을 낮춤
    const articles = Array.isArray(data) ? data : Object.values(data).filter(article => article != null);
    console.log(articles)



    const articleList = document.getElementById('article-list');
    articleList.innerHTML = '';
    // data의 results에 json 형식으로 article 데이터s를 가져옴 그냥 article.id로 하니까 안가져와져서 여차저차 찾아냄
    data.results.forEach((article) => {

        const articleCard = document.createElement('div');
        articleCard.classList.add('col', 'mb-5');
        const title = article.article_title;
        const image = article.article_image;
        const category = article.category;
        // 아래 html이 반복되어 입력됨
        // 이미지의 경우 이미지 경로에 이미지가 있으면 보여주고 없을경우(?) 기본이미지를 가져옴..저희집 고양이 귀엽죠 여러분
        // 채연 : 넹 너무 기여워요 ㅠ 어케 이케 이쁘지 저 납치 해도 될까요? 물론 소진님을
        articleCard.innerHTML = `
      <a style="text-decoration:none; color:black;" href="article_detail.html?id=${article.id}">
      <div class="card h-100">
        <img class="card-img-top" src="${image ? image : './assets/images/IMG_8257.jpg'}" alt="" />
        <div class="card-body p-4">
          <div class="text-center">
            <h5 class="fw-bolder">${title}</h5>
            <label for="" class="category">${category}</label>
            <hr>
            <label for="" class="user">${payload_parse.account}</label>
              </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              
            </div>
          </div>
          </a>
        `;

        articleList.appendChild(articleCard);

    });


}

