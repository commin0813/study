import React, {useState, useCallback, useMemo} from 'react'
import {Form, Input, Button} from 'antd';
import Link from 'next/link'
import styled from 'styled-components'
import PropType from "prop-types";
import FollowList from "./FollowList";
import {useDispatch} from "react-redux";
import {loginRequestAction} from "../reducers/user";
import {useSelector} from "react-redux";

// const ButtonWrapper = styled.div`
//     margin-top : 20px
// `;

const LoginForm = () => {

    const dispatch = useDispatch();
    const {logInLoading} = useSelector((state) => state.user)
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value)
    }, [])

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [])

    const onSubmitForm = useCallback(() => {
        dispatch(loginRequestAction(email, password));
    }, [email, password])

    const style = useMemo(() => ({marginLeft: 10, marginTop: 10, padding: 10}), []);
    const buttonStyle = useMemo(() => ({marginTop: 10}), []);
    return (
        <Form style={style} onFinish={onSubmitForm}>
            <div>
                <label htmlFor='user-email'>이메일</label>
                <br/>
                <Input name='user-email' type="email" value={email} onChange={onChangeEmail} required/>
            </div>
            <div>
                <label htmlFor='user-password'>비밀번호</label>
                <br/>
                <Input name='user-password' value={password} type='password' onChange={onChangePassword} required/>
            </div>

            <div style={buttonStyle}>
                <Button type='primary' htmlType='submit' loading={logInLoading}>로그인</Button>
                <Link href='/signup'><Button>회원가입</Button></Link>
            </div>

        </Form>
    );
}

export default LoginForm