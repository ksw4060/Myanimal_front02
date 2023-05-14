const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"


// 글작성
async function save_article() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const category = document.getElementById("category").value
    const img = document.getElementById("myFile").files[0]
    const token = localStorage.getItem("access")

    //JSON.stringify는 이미지파일 보내기가 안된다고 합니댜
    //그래서 formData형식으로 이미지파일을 보내는것으로 수정햇습니댜 
    //백 media파일 가시면 이미지가 들어오고 콘솔창에도 이미지 링크가 뜹니댜 -소진
    const formData = new FormData();
    formData.append("article_title", title);
    formData.append("article_content", content);
    formData.append("category", category);
    formData.append("article_img", img);

    const response = await fetch(`${backend_base_url}/articles/`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: formData,
    });

    if (response.status == 201) {
        alert("글 작성 완료")
        window.location.replace('index.html')// 0514 17:10 채연 수정 : 글작성시 홈화면 replace 주석처리 되어있던 부분 수정
    } else if (title == '' || content == '' || category == '') {
        alert("빈칸을 입력해 주세요.")
    }

    const saveButton = document.getElementById("save-article");
    saveButton.addEventListener("click", save_article);

}


// 이미지 업로드 미리보기
function setThumbnail(event) {
    let reader = new FileReader();

    reader.onload = function (event) {
        let img = document.createElement("img");
        img.setAttribute("src", event.target.result);

        // 썸네일 크기 조절
        img.style.width = "500px"; // 너비 500px로 설정
        img.style.height = "auto"; // 높이 자동 설정
        document
            .querySelector("#imgthumbnail")
            .appendChild(img);
    };

    reader.readAsDataURL(event.target.files[0]);
}