const frontend_base_url = "http://127.0.0.1:5000"
const backend_base_url = "http://127.0.0.1:8000"


// 글작성
async function save_article() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const category = document.getElementById("category").value
    const img = document.getElementById("img").value
    const token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/articles/`, {
        headers: {
            "content-type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: 'POST',
        body: JSON.stringify({
            "article_title": title,
            "article_content": content,
            "category": category,
            "article_img": img,
        })
    })

    if (response.status == 200) {
        alert("글 작성 완료")
        window.location.replace('index.html')
    } else if (title == '' || content == '' || category == '' ) {
        alert("빈칸을 입력해 주세요.")
    }

}


// 글 수정
async function UpdateArticle() {

    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            'content-type': 'application/json',
        },
        method: 'GET',
        body: JSON.stringify({
            "article_title": title,
            "article_content": content,
            "category": category,
            "article_img": img
        })
    })

    if (response.status == 200) {
        alert("글 작성 완료")
        window.location.replace('index.html')
    } else if (title == '' || content == '' || category == '' ) {
        alert("빈칸을 입력해 주세요.")
    }
}