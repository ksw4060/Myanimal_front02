async function save_article() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const category = document.getElementById("category").value
    const img = document.getElementById("img").value
    const token = localStorage.getItem("access")

    const response = await fetch('http://127.0.0.1:8000/articles/', {
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
    console.log()
}


