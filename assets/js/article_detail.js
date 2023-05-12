// 글 상세보기

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('id');
    ArticleDetail(urlParams);
}

const article_id = new URLSearchParams(window.location.search).get('id');
async function ArticleDetail(article_id) {


    const response = await fetch(`${backend_base_url}/articles/${article_id}`, {
        method: 'GET',
    })

    response_json = await response.json()
    console.log(response_json)

    const category = document.querySelector('#category');
    const author = document.querySelector('#author');
    const article_title = document.querySelector('#article-title');
    const article_created_at = document.querySelector('#article-created-at');
    const article_updated_at = document.querySelector('#article-updated-at');
    const article_content = document.querySelector('#article-content');

    // const detail_product_img_url = `${BACKEND_API}/${response_json.image}`

    // detail_product_img.setAttribute('src', detail_product_img_url)
    category.innerText = response_json.category
    author.innerText = response_json.user
    article_title.innerText = response_json.article_title
    article_created_at.innerText = response_json.article_created_at
    article_updated_at.innerText = response_json.article_updated_at
    article_content.innerText = response_json.article_content

}

// 수정 페이지로 이동
function redirectUpdatePage() {
    window.location.href = `update_article.html?id=${article_id}`;
  }


// 글 삭제

async function ArticleDelete() {

    const response = await fetch(`${backend_base_url}/articles/${article_id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            'content-type': 'application/json',
        },
        method: 'DELETE',
    })
    if (response.status === 204) {
        alert("삭제 완료!")
        location.replace('index.html')
    }else{
        alert("권한이 없습니다.")
    }
}