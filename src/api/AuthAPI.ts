import axios from 'axios'

const apiURL = 'https://social-network.samuraijs.com/api/1.0/';
const instance = axios.create( {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "e5b5cb05-e1f5-4992-8ff6-5e4bf87a15ae"
    }
})

type MeResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: {
      id: number,
      email: string,
      login: string
    }
}
type LoginResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: {
      userId: number
    }
}
type LoginDeleteResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: {}
}
type CapchaResponseType = {
    resultCode: number,
    messages: Array<string>,
    url: string | null | boolean
}

export const authAPI = {
  getMe() {
    return instance.get<MeResponseType>('auth/me');
    },
    setLogin(email: string, password: string, rememberMe = false, captcha: null | boolean | string = false){
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha} );
    },
    deleteLogin(){
        return instance.delete<LoginDeleteResponseType>('auth/login' );
    },
    getCapcha(){
        return instance.get<CapchaResponseType>('security/get-captcha-url');
    }
}