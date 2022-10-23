import {PhotoType, ProfileType } from './../types/types';
import axios from 'axios'

const apiURL = 'https://social-network.samuraijs.com/api/1.0/';
const instance = axios.create( {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "e5b5cb05-e1f5-4992-8ff6-5e4bf87a15ae"
    }
})

type ResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: {}
}
type SetPhotoResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: { photos:PhotoType }
}

export const profileAPI = {
  getProfile(userId: number) {
    return  instance.get<ProfileType>('profile/' + userId);
    },
    getStatus(userId: number){
        return instance.get<string>('profile/status/' + userId)
    },
    setStatus(statusText: string){
        return instance.put<ResponseType>('profile/status', {status: statusText} )
    },
    setPhoto(photos: File){
        let formData = new FormData();
        formData.append("image", photos);
        return instance.put<SetPhotoResponseType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    setProfileInfo(profile: ProfileType) {
        return instance.put<ResponseType>('/profile', profile);
    }
}