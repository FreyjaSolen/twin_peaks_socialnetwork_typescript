import axios from 'axios'
import { UserType } from '../types/types';

const apiURL = 'https://social-network.samuraijs.com/api/1.0/';
const instance = axios.create( {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "e5b5cb05-e1f5-4992-8ff6-5e4bf87a15ae"
    }
})

type GetUsersResponseType = {
  items: Array<UserType>,
  totalCount: number,
  error: string | null
}
type FollowResponseType = {
  resultCode: number,
  messages: Array<string>,
  data: {
    userId: number
  }
}

export const allUsersAPI = {
  getAllUsers(currentPage = 1, pageSize = 14) {
    return  instance.get<GetUsersResponseType>('users?page=' + currentPage + '&count=' + pageSize);
    },
    unFollowApi(id: number) {
      return  instance.delete<FollowResponseType>('follow/' + id);
      },
    followApi(id: number) {
        return  instance.post<FollowResponseType>('follow/' + id, {});
        }
}