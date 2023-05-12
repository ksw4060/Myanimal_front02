console.log('프로필 js 로딩');

$(document).ready(async function () {
    const urlParam = new URLSearchParams(window.location.search);
    const user_id = urlParam.get('user_id');
    console.log(user_id);

    const response = await getProfile(user_id);
    console.log(response)

    // 프로필 이미지 처리
    const profileImage = $('#profile-image');
    profileImage.empty();

    const newImage = $('<img>');
    if (response.profile_img) {
        newImage.attr('src', `${backend_base_url}${response.profile_img}`);
    } else {
        newImage.attr('src', 'https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?size=626&ext=jpg');
    }
    newImage.css({ width: '20%', height: '20%' });
    profileImage.append(newImage);

    // 닉네임 처리
    if (!response.nickname) {
        response.nickname = '없음';
    }
    $('#nickname').text(response.nickname);

    // 이메일 처리
    if (!response.email) {
        response.email = '없음';
    }
    $('#email').text(response.email);

    if (!response.category) {
        response.category = '없음';
    }
    $('#category').text(response.category);

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
});