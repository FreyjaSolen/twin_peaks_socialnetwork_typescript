import React, { useState, ChangeEvent } from 'react';
import style from './DescriptionForm.module.css';
import { useForm } from 'react-hook-form';
import Info from '../../common/Info/Info';
import { ContactsType, ProfileType } from '../../../types/types';

type PropsType = {
    profile: ProfileType
    saveProfile: (data: object, setError: any) => void
}
type DescriptionFormType = {
    FullName: string,
    aboutMe: string,
    lookingForAJobDescription: string,
    lookingForAJob: boolean,
    server: string,
    contacts: ContactsType,
}

const DescriptionForm: React.FC<PropsType> = (props) => {
    const { register, handleSubmit, setError, 
        formState: {
        errors
    } } = useForm<DescriptionFormType>()

    let [localMeDesc, setMeDesc] = useState(props.profile.aboutMe);
    let [localJobDesc, setJobDesc] = useState(props.profile.lookingForAJobDescription);
    let [localGit, setGit] = useState(props.profile.contacts.github);

    const onSubmit = (data: DescriptionFormType) => {
        data.FullName = props.profile.fullName;
        props.saveProfile(data, setError);
    }

    const onAboutMeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMeDesc(event.currentTarget.value);
    }
    const onJobChange = (event: ChangeEvent<HTMLInputElement>) => {
        setJobDesc(event.currentTarget.value);
    }
    const onGitChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGit(event.currentTarget.value);
    }

    return (
        <div className={style.descFormWrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.settingsContainer}>

                    <div className={style.block}>
                    <div className={style.description}>
                        Tell about yourself:
                    </div>
                    <div>
                        <input type='text'
                            {...register('aboutMe',
                            {
                                required: 'The field must not be empty'
                            })} 
                            onChange={onAboutMeChange}
                            value={localMeDesc as string}
                            className={style.inputText}/>
                            </div>
                            <div className={style.errors}>
                        <label>{errors?.aboutMe && errors?.aboutMe?.message}</label>
                    </div>
                    </div>

                    <div className={style.block}>
                    <div className={style.description}>
                        Your skills:
                    </div>
                        <input type='text'
                            {...register('lookingForAJobDescription',
                            {
                                required: 'The field must not be empty'
                            })}
                            onChange={onJobChange}
                            value={localJobDesc as string} 
                            className={style.inputText} />
                            <div className={style.errors}>
                        <label>{errors?.lookingForAJobDescription && errors?.lookingForAJobDescription?.message}</label>
                    </div>                   
                    </div>
                    
                    <div className={style.block}>
                    <div className={style.description}>
                        Loking for a job?
                    </div>
                    <input type={'checkbox'} 
                    {...register('lookingForAJob')} 
                    className={style.inputCheck}/>             
                    </div>
                    <div className={style.block}>
                    <div className={style.description}>
                    <b>Contacts:</b>
                    </div>
                    <input type='text'
                            {...register('contacts.github')}
                            onChange={onGitChange}
                            value={localGit as string} 
                            className={style.inputText} />
                    </div>
                    <div className={style.errors}>
                        <label>{errors?.server && errors?.server?.message}</label>
                    </div>    
                </div>
                <div className={style.buttonEnt}>
                    <button  type='submit'>Update info</button>
                </div>
            </form>
        </div>
    );
}

export default DescriptionForm;