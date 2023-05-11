async function handleResetPassword() {
    const email = document.getElementById("reset_password").value
    console.log(email)

    const response = await fetch(`${backend_base_url}/users/auth/password/reset/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            
            "email": email
        })
    })

    return response
}

const token = location.href.split('/')[5]
const uidb64 = location.href.split('/')[4]

Check_Password()


