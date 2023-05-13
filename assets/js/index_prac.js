
// const page = document.querySelector('#page');; //ul
// let pageNumber = document.getElementById('page_number'); //페이지넘버를 담는 변수
// let current_page = 1; // 현재 시작 페이지 넘버는 1로 지정한다.
// let records_per_page = 8 // 한 페이지당 보여질 게시글 수
// const rows = document.querySelectorAll('#my-table ul li');
// const rowsCount = rows.length; // 게시글의 갯수 카운트

// let pageNumbers = function () {
//   let pageNumber = document.getElementById('page_number');
//   pageNumber.innerHTML = "";

//   for (let i = 1; i < numPages() + 1; i++) {
//     // 페이지 수 만큼 innerHTML를 이용해 숫자를 넣어준다.
//     pageNumber.innerHTML += `<span class="page-item" aria-current="page"><a class="page-link" href="">${i}</a></span>`;
//   }

// }
// let numPages = function () {
//   //게시글 수를 보여질 게시글 수로 나눈 뒤 올림연산하여 페이지 수를 구한다.
//   return Math.ceil(rowsCount / records_per_page);
// }

// let changePage = function (page) {
//   const ul = document.querySelector('ul.discussions__container');

//   if (page < 1) {
//     page = 1;
//   }
//   if (page > (numPages() - 1)) {
//     page = numPages();
//   }

//   ul.innerHTML = "";

//   for (var i = (page - 1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
//     ul.innerHTML += "<div class='objectBlock'>" + Json[i].id + "</div>";
//   }
//json파일의 id값이 10번출력됨.
// }



let rowPerPage = 8; //한 페이지당 표시되는 게시글의 수
const rows = document.querySelectorAll('#my-table ul li');
const rowsCount = rows.length; // 게시글의 갯수 카운트
const pageCount = Math.ceil(rowsCount / rowPerPage); //총 갯수/모든게시물을 나눳을때 무조건 올림으로 페이지를 만들어줌
const page = document.querySelector('#page'); //id 지정해준 ul을 쿼리셋으로 저장
let current_page = 1; //현재페이지는 1

async function pagination() {

    //페이지네이션 생성
    /* <li class="page-item active" aria-current="page"><a class="page-link" href="#!">1</a></li> 
    for (초기값;조건;증감){}
    */

    for (let i = 1; i <= pageCount; i++) {
        page.innerHTML = `<li class="page-item active" aria-current="page"><a class="page-link" href="">${i}</a></li>`;
        page.innerHTML += `<li class="page-item active" aria-current="page"><a class="page-link" href="">${i + 1}</a></li>`;
    }

    console.log(rows);
    function displayRow(idx) {
        const rowsArray = [...rows];
        console.log(rowsArray)
    }

}

pagination();

