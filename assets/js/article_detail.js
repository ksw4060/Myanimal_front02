// 글 상세보기

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('id');
    ArticleDetail(urlParams);
    loadComments(urlParams);
    CountHeart();
    CountBookmark();
}

const article_id = new URLSearchParams(window.location.search).get('id');
async function ArticleDetail(article_id) {


    const response = await fetch(`${backend_base_url}/articles/${article_id}`, {
        method: 'GET',
    })

    response_json = await response.json()
    console.log(response_json)

    const category = document.querySelector('#category');
    // 딱히 안써도 가져와지는것같아서 주석처리했습니댜
    const author = document.querySelector('#author');
    const article_title = document.querySelector('#article-title');
    const article_created_at = document.querySelector('#article-created-at');
    const article_updated_at = document.querySelector('#article-updated-at');
    const article_content = document.querySelector('#article-content');
    //백 이미지 링크를 통해 가져오도록 햇습니댜
    const article_img_url = `${backend_base_url}${response_json.article_img}`;
    const article_img_element = document.getElementById("article_img")
    console.log(article_img_element)

    // const detail_product_img_url = `${BACKEND_API}/${response_json.image}`
    // detail_product_img.setAttribute('src', detail_product_img_url)
    category.innerText = response_json.category
    author.innerText = response_json.user
    article_title.innerText = response_json.article_title
    article_created_at.innerText = response_json.article_created_at
    article_updated_at.innerText = response_json.article_updated_at
    article_content.innerText = response_json.article_content
    //이미지 스크린에 아티클 이미지 url들을 각각 불러오도록 했습니댜
    article_img_element.setAttribute("src", article_img_url)

}

// 수정 페이지로 이동
function redirectUpdatePage() {
    window.location.href = `update_article.html?id=${article_id}`;
}


// 글 삭제

async function ArticleDelete() {
    if (confirm("삭제하시겠습니까?")) {
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
        } else {
            alert("권한이 없습니다.")
        }
    }
}


// 댓글 작성

async function save_comment() {
    const comment = document.getElementById("comment").value

    const token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/articles/${article_id}/comment/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + token,
        },
        method: 'POST',
        body: JSON.stringify({
            "comment": comment,

        })
    })

    if (response.status == 201) {
        alert("댓글 작성 완료")
        location.reload();
    } else if (comment == '') {
        alert("댓글을 입력해 주세요.")
    }

}

// 댓글 불러오기

async function loadComments(article_id) {
    const response = await fetch(`${backend_base_url}/articles/${article_id}/comment/`);
    const comments = await response.json();
    console.log(comments)




    comments.forEach((comment) => {
        const commentList = document.getElementById('comment-list');
        commentList.insertAdjacentHTML('beforeend', `
        
        <div  class="card-header">
                <a>${comment.user}</a>
            </div>
            <div id="comment-${comment.id}" class="card-body" style="max-width: 1000px;">
                <div class="row g-5">
                    <!-- 유저 프로필 사진 -->
                    <div class="col-md-4" style="width: 200px;">
                        <img src="https://i.ibb.co/Ssm90Cq/4164335-1582361978747.gif" class="img-fluid rounded-start"
                            alt="..." style="width: 100px;">
                    </div>
                    <!-- 댓글 제목과 내용 입력-->
                    <div class="col-md-8">
                        <div class="card-body">
                            <p class="card-text" id="comment-content-${comment.id}">${comment.comment}</p>

                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <a href="#" onclick = "editComment(${comment.id})" class="btn btn-secondary btn-sm me-md-2">댓글수정</a>
                            <a href="#" onclick = "CommentDelete(${comment.id})" class="btn btn-secondary btn-sm">댓글삭제</a>
                        </div>
                        <p class="card-text"><small class="text-muted">${comment.comment_created_at}</small></p>
                    </div>
                </div>
            </div>
        
        
        `);
    });
}


// 댓글 수정 폼 열기
async function editComment(comment_id) {
    event.preventDefault();

    const commentCard = document.getElementById(`comment-${comment_id}`);
    const before_comment = document.getElementById(`comment-content-${comment_id}`);

    const editForm = document.createElement('div');
    editForm.classList.add('edit-form');

    const textarea = document.createElement('textarea');
    textarea.classList.add('form-control');
    console.log(before_comment.innerText)
    textarea.value = before_comment.innerText;

    const saveButton = document.createElement('button');
    saveButton.classList.add('btn', 'btn-primary', 'btn-sm');
    saveButton.textContent = '수정 완료';
    saveButton.addEventListener('click', () => {
        updateComment(comment_id, textarea.value);
    });

    editForm.appendChild(textarea);
    editForm.appendChild(saveButton);

    commentCard.querySelector('.card-body').appendChild(editForm);
    before_comment.style.display = 'none'; // 기존 댓글 숨기기
}
// 댓글 수정 저장하기
async function updateComment(commentId, newContent) {
    const token = localStorage.getItem('access');
    const response = await fetch(`${backend_base_url}/articles/${article_id}/comment/${commentId}/`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: 'PUT',
        body: JSON.stringify({
            'comment': newContent,
        }),
    });

    if (response.status === 200) {
        alert('댓글이 수정되었습니다.');
        location.reload();
    } else if ((response.status === 403)) {
        alert(response.message);
    } else {
        alert('댓글 수정에 실패했습니다.');
    }
}



// 댓글 삭제
async function CommentDelete(comment_id) {

    if (confirm("삭제하시겠습니까?")) {
        const response = await fetch(`${backend_base_url}/articles/${article_id}/comment/${comment_id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
                'content-type': 'application/json',
            },
            method: 'DELETE',
        })
        if (response.status === 204) {
            alert("삭제 완료!")
            location.reload();
        } else {
            alert("권한이 없습니다.")
        }
    }
}

// 좋아요 누르기
async function ClickHeart() {

    const response = await fetch(`${backend_base_url}/articles/${article_id}/hearts/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            'content-type': 'application/json',
        },
        method: 'POST',
    })
    if (response.status === 200) {
        alert("❤️")
        location.reload();
    }
}


// 좋아요 갯수
async function CountHeart() {

    const response = await fetch(`${backend_base_url}/articles/${article_id}/hearts/`, {
        headers: {

            'content-type': 'application/json',
        },
        method: 'GET',
    })
    response_json = await response.json()
    document.getElementById('heart-count').innerText = response_json.hearts
}


// 북마크 누르기
async function ClickBookmark() {

    const response = await fetch(`${backend_base_url}/articles/${article_id}/bookmarks/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            'content-type': 'application/json',
        },
        method: 'POST',
    })
    if (response.status === 200) {
        alert("북마크")
        location.reload();
    }
}


// 북마크 갯수
async function CountBookmark() {

    const response = await fetch(`${backend_base_url}/articles/${article_id}/bookmarks/`, {
        headers: {

            'content-type': 'application/json',
        },
        method: 'GET',
    })
    response_json = await response.json()
    console.log(response_json.bookmarks)
    document.getElementById('bookmark-count').innerText = response_json.bookmarks
}