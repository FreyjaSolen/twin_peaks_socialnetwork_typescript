import React from 'react';
import style from './Login.module.css';
import { useForm } from 'react-hook-form';

type PropsType = {
    checkLogin: (email: string, password: string, rememberMe: boolean,
        setError: any, captcha: null | boolean | string) => void
}
type LoginFormType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: null | boolean | string
}

const Login: React.FC<PropsType> = (props) => {
    const { register, handleSubmit, setError,
        formState: {
            errors
        } } = useForm<LoginFormType>()

    const onSubmit = (data: LoginFormType) => {
        props.checkLogin(data.email, data.password, data.rememberMe, setError, data.captcha);
    }

    return (
        <div className={style.loginWrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.dataBlock}>
                    <div>
                        <label> Enter your login:</label>
                    </div>
                    <div>
                        <input type='text' {...register('email',
                            {
                                required: 'Поле не должно быть пустым',
                                pattern: {
                                    value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                                    message: 'Это не похоже на e-mail'
                                }
                            })}/>
                    </div>
                    <div className={style.errors}>
                        {errors?.email && errors?.email?.message}
                    </div>
                </div>
                <div className={style.dataBlock}>
                    <div>
                        <label> Enter your password:</label>
                    </div>
                    <div>
                        <input type='password' {...register('password',
                            {
                                required: 'Поле не должно быть пустым'
                            })}/>
                    </div>
                    <div className={style.errors}>
                    </div>
                    <div>
                        {errors?.password?.type === 'capcha' ?
                            <div className={style.capcha}>
                                <div>
                                    <img src={errors?.password?.message} />
                                </div>
                                <div>
                                    <input type='text' {...register('captcha')}/></div>
                            </div>
                            : <div className={style.errors}>{errors?.password?.message}</div>}
                    </div>
                </div>
                <div className={style.check}>
                    <span><input type={'checkbox'} {...register('rememberMe')} /> Remember me </span>
                </div>
                <div className={style.buttonEnt}>
                    <button type='submit'>Enter</button>
                </div>
            </form>
        </div>
    );
}

export default Login;