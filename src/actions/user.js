import axios from "axios";

export const Registration = async (username, password) => {
    try{
        const response = await axios.post('http://213.109.204.76:8080/auth/signUp', {
            // name,
            // surname,
            username,
            password
        })
        alert(response.data.message)
    }
    catch(e){
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

export const login =  (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://213.109.204.76:8080/auth/signIn`, {
                username,
                password
            })
            console.log(response.data)
            console.log(response)
            // dispatch(setUser(response.data.user))
            // localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}