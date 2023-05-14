const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"


window.onload = fetch(`${backend_base_url}/articles/bookmarks/`, {
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("access")
    }
},
).then(res => res.json()).then(data => {
    $('#article-box').empty()
    data.forEach((a) => {
        let content = a['article_content']
        let title = a['article_title']
        let img = a['article_img']
        let category = a['category']
        let user = a['user']
        let id = a['id']

        let temp_html = `<div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="${img}" alt="..." />
                <!-- 포스팅 카드가 보여지는 곳-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- 게시글 title-->
                        <h5 class="fw-bolder">${title}</h5>
                        <!-- 게시글 작성자-->
                        <label for="" class="">${category}</label>
                        <hr>
                        <label for="" class="">${user}</label>
                    </div>
                </div>
                <!-- 보러가기 버튼-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn me-2 btn_org"
                            href="http://127.0.0.1:8000/articles/${id}">보러가기</a></div>
                </div>
            </div>
        </div>`
        $('#article-box').append(temp_html)
        
    });

})