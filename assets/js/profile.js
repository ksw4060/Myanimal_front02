console.log('프로필 js 로딩');

$(document).ready(async function () {
    $('.hidden').hide();
    $('.permission').hide();
    $('.permission2').hide();
    $('.withdrawal').hide();

    let urlParam = new URLSearchParams(window.location.search);
    let user_id = urlParam.get('user_id');

    const response = await getProfile(user_id);

    // 로그인 되어 있다면?
    if (localStorage.getItem("payload")) {

        const payload = localStorage.getItem("payload");
        const payload_parse = JSON.parse(payload)

        const me_id = payload_parse.user_id;
        const token = localStorage.getItem("access");

        // 접속 유저와 프포필 유저가 같다면?
        if (me_id == user_id) {
            $('.permission').show();
        } else {
            $('.permission2').show();
        }
    }

    // 프로필 이미지 처리
    const profileImage = $('#profile-image');
    profileImage.empty();

    // const newImage = $('<img>');
    // if (response.profile_img = '') {
    //     newImage.attr('src', `${backend_base_url}${response.profile_img}`);
    // } else {
    //     newImage.attr('src', 'https://blog.kakaocdn.net/dn/0WCOh/btsftHK9GZz/zWlQWK1gtgPiD0zTWIefek/img.gif');
    // }
    // newImage.addClass('rounded mx-auto d-block view-img');
    // newImage.css({ width: '80%', height: '80%' });
    // profileImage.append(newImage);

    console.log(response.profile_img);
    console.log('테스트');
    if (response.profile_img == '' || response.profile_img == null || typeof response.profile_img === 'undefined') {
        $('#img').attr('src', 'https://blog.kakaocdn.net/dn/0WCOh/btsftHK9GZz/zWlQWK1gtgPiD0zTWIefek/img.gif');
    } else {
        $('#img').attr('src', `${backend_base_url}${response.profile_img}`);
    }

    $('#img').addClass('rounded mx-auto d-block view-img');
    $('#img').css({ width: '80%', height: '80%' });

    // 닉네임 처리
    if (!response.nickname) {
        response.nickname = '없음';
    }
    $('#nickname').text(response.nickname);
    $('#myNickname').val(response.nickname);

    // 이메일 처리
    if (!response.email) {
        response.email = '없음';
    }
    $('#email').text(response.email);

    // 카테고리 처리
    if (!response.category) {
        response.category = '없음';
    }
    $('#category').text(response.category);
    // 미리 셀렉트에도 저장
    $('#mySelect').val(response.category);

    // articles_count 작성한 게시글 수
    const response2 = await getProfile2(user_id);
    $('#articles_count').text(response2.length);

    // receive_hearts_count 받은 좋아요 수
    const response3 = await getProfile3(user_id);
    $('#receive_hearts_count').text(response3);

    // 팔로잉 수
    $('#followings').text(response.followers.length);

    // 팔로워 수
    $('#followers').text(response.followers.length);

    // 좋아요한 게시글 수
    $('#hearted_articles_count').text(response.hearted_articles_count);

    // 북마크한 게시글 수
    $('#bookmarked_articles_count').text(response.bookmarked_articles_count);

    // 수정 버튼 클릭 시
    $('#edit-btn').click(function () {
        // console.log('히든 보이게')
        $('.hidden').show();

        $('#withdrawal-btn').hide();
        $('#edit-btn').hide();
        $('.original-content').hide();
    });

    // 취소 버튼 클릭 시
    $('#cancel-btn').click(function () {
        // console.log('히든 숨기기')
        $('.hidden').hide();
        $('#withdrawal-btn').show();
        $('#edit-btn').show();
        $('.original-content').show();
    });

    // 탈퇴 버튼 클릭 시
    $('#withdrawal-btn').click(function () {
        $('#edit-btn').hide();
        $('#withdrawal-btn').hide();
        $('.withdrawal').show();
    });

    // 탈퇴 취소 버튼 클릭 시
    $('#cancel-withdrawal-btn').click(function () {
        $('.withdrawal').hide();
        $('#edit-btn').show();
        $('#withdrawal-btn').show();
    });

    // 진짜로 탈퇴를 원하시겠습니까? >>> 팝업이나 모달로 나중에...
    // 탈퇴2 버튼 클릭 시
    $('#withdrawal2-btn').click(async () => {
        const passwordInput = $('#password-input').val();
        // 비밀번호 검증 로직을 수행합니다.
        if (passwordInput) {
            // 탈퇴 요청 보내기
            // try {
            const response = await $.ajax({
                url: `${backend_base_url}/users/withdrawal/`,
                method: 'POST',
                contentType: 'application/json',
                dataType: "json",
                data: JSON.stringify({ password: passwordInput }),
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("access"),
                    // localStorage.getItem("access")
                },
                success: function (response) {
                    alert('탈퇴가 성공적으로 처리되었습니다.');
                    location.href = '/';
                },
                // 비밀번호가 일치 하지 않거나 비활성화한 사용자일 경우
                error: function (error) {
                    alert('비밀번호가 일치하지 않습니다.', error);
                    location.reload();
                }
            });
        }
        else {
            alert("비밀번호를 입력하세요.")
        }
    });

    // 이미지 띄우기, 아직 업로드X
    $('#image-input').click(function () {
        console.log('이미지 띄우기');
        $('#image-input').change(function () {
            var file = this.files[0];
            var reader = new FileReader();

            // 파일 크기 제한 (단위: 바이트)
            var maxSize = 3 * 100 * 1024; // 300KB 제한

            // 파일 유효성 검사
            var validImageTypes = ['image/jpeg', 'image/png', 'image/gif']; // 허용되는 이미지 파일의 MIME 유형들
            if (!validImageTypes.includes(file.type)) {
                alert('이미지 파일만 업로드할 수 있습니다.');
                return;
            }

            if (file.size > maxSize) {
                alert('이미지 파일 크기는 5MB를 초과할 수 없습니다.');
                return;
            }

            // FileReader를 사용하여 이미지 파일을 읽고, 미리보기 이미지로 설정
            reader.onload = function (e) {
                $('.view-img').attr('src', e.target.result);
                $('.view-img').addClass('card-img-top')
            }
            reader.readAsDataURL(file);
        })
    });

    $('#confirm-btn').click(async function () {
        // 선택한 이미지 파일 가져오기
        var imageFile = $('#image-input')[0].files[0];

        // 선택한 카테고리 값 가져오기
        var selectedCategory = $('#mySelect').val();

        // 닉네임 값 가져오기
        var myNickname = $('#myNickname').val();

        // FormData 객체 생성
        var formData = new FormData();

        // 이미지가 있으면 추가
        if (imageFile) {
            formData.append('profile_img', imageFile);
        }
        // 카테고리가 있으면 추가
        if (selectedCategory) {
            formData.append('category', selectedCategory);
        }
        if (myNickname) {
            formData.append('nickname', myNickname);
        }
        // 혹시 몰라서 넣음.
        if (myNickname == null || myNickname == '없음') {
            myNickname = '없음';
        }
        // 닉네임은 필수
        formData.append('nickname', myNickname);

        // 닉네임 필수다!
        if (!myNickname) {
            alert("닉네임은 필수입니다!")
        } else {
            //AJAX 요청 보내기
            const response = await $.ajax({
                url: `${backend_base_url}/users/profile/${user_id}/`,
                type: 'PATCH',
                data: formData,
                processData: false,
                contentType: false,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                    // Authorization: `Bearer ${token}`
                }
            });
            if (response) {
                alert("수정 성공")
                // window.location.href = "profile.html";
                $('.hidden').hide();
                $('#edit-btn').show();
                $('.original-content').show();
                // 눈속임으로 값만 대입시킬 수 도 있음. 미리...
                location.reload();
            } else {
                alert("수정 실패")
                window.location.href = "404.html";
                // alert(textStatus)
            }
        }
    });

    // 팔로우 버튼을 누른다면? 아직 수정 안함.


    // $('.content').mouseenter(function () {
    //     $('#original-content').hide();
    //     $('#hover-content').show();
    // });
    // $('.content').mouseleave(function () {
    //     $('#hover-content').fadeOut(1000, function () {
    //         $('#original-content').fadeIn(1000);
    //     });
    // });


});