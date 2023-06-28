import axios from "axios";

export const Registration = async (username, password) => {
    try {
        const response = await axios.post('/auth/signUp', {
            // name,
            // surname,
            username,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}


// export const login = (email, password) => {
//     return async dispatch => {

//         try{
//             const response = await axios.post('http://213.109.204.76:8080/auth/signIn', {
//                 email,
//                 password
//             })

//             console.log(response.data)
//         }
//         catch(e){
//             alert(e.response.data.message)
//         }

//     }
// }

export const login = async (username, password, roleCb) => {
    const response = await fetch(`/auth/signIn`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password
        }),
        credentials: "same-origin"
    })

    const role = "admin" // "user" or null
    roleCb(role)
}