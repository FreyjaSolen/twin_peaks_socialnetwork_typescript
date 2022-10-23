export type PhotoType = {
    small: string | null,
    large: string | null
}

export type UserType = {
    id: number,
    name: string,
    status: string | null,
    photos: PhotoType | null,
    followed: boolean
}

export type ActorType = {
    id: number,
    name: string
  }

export type MessageType = {
    id: number,
    message: string
  }

export type PostMessageType = {
    id: number,
    post: string
}

// export type ContactsType = {
//     github: string | null,
//     vk: string | null,
//     facebook: string | null,
//     instagram: string | null,
//     twitter: string | null,
//     website: string | null,
//     youtube: string | null,
//     mainLink: string | null,
// }
export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
}

export type ContactType = {
    name: string,
    desc: string
}

export type ProfileType = {
    userId: number,
    aboutMe: string | null,
    lookingForAJob: boolean
    lookingForAJobDescription: string | null,
    fullName: string,
    contacts: ContactsType,
    photos: PhotoType | null
}