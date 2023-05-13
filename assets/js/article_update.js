window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('id');
    BeforeArticle(urlParams);
}
const article_id = new URLSearchParams(window.location.search).get('id');

// 수정 페이지에서 기존 내용 보이기
async function BeforeArticle(article_id) {

    const response = await fetch(`${backend_base_url}/articles/${article_id}`, {
        method: 'GET',
    })

    response_json = await response.json()

    document.getElementById('category').value = response_json.category
    document.getElementById('title').value = response_json.article_title
    document.getElementById('content').value = response_json.article_content
}


// 글 수정
async function ArticleUpdate() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const category = document.getElementById("category").value
    const img = document.getElementById("img").value
    const token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/articles/${article_id}/`, {
        headers: {
            "Authorization": "Bearer " + token,
            'content-type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
            "article_title": title,
            "article_content": content,
            "category": category,
            "article_img": img
        })
    })
    if (response.status == 201) {
        alert("글 수정 완료")
        window.location.replace('index.html')
    } else if (title == '' || content == '' || category == '' ) {
        alert("빈칸을 입력해 주세요.")
    } else {
        alert(response.message)
    }
}