import React from 'react';
import style from './PostForm.module.css';
import { useForm } from 'react-hook-form';

type PropsType = {
    addPost: (postText: string) => void
  }
  type PostAddFormType = {
    postText: string
  }

const PostForm: React.FC<PropsType> = (props) => {
    const { register, handleSubmit, reset, formState:{
        errors
    } } = useForm<PostAddFormType>()

    const onSubmit = (data: PostAddFormType) => {
        props.addPost(data.postText);
        reset();
    }
    
    return (
        <div className={style.postSettingWrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <textarea {...register('postText', 
                        {required: 'Текст не должен быть пустым',
                        maxLength: {
                            value: 300,
                            message: 'Максимальная длина поста 300 символов'
                        }})} />
                    </div>
                    <div>
                    <label>{errors?.postText && errors?.postText?.message}</label>
                    </div>
                    <div>
                        <button type='submit'>Add new post</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PostForm;