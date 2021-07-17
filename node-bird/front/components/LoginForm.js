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
    const {isLoggedingIn} = useSelector((state) => state.user)
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');

    const onChangeId = useCallback((e) => {
        setId(e.target.value)
    }, [])

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [])

    const onSubmitForm = useCallback(() => {
        dispatch(loginRequestAction(id, password));
    }, [id, password])

    const style = useMemo(() => ({marginLeft: 10, marginTop: 10, padding: 10}), []);
    const buttonStyle = useMemo(() => ({marginTop: 10}), []);
    return (
        <Form style={style} onFinish={onSubmitForm}>
            <div>
                <label htmlFor='user-id'>아이디</label>
                <br/>
                <Input name='user-id' value={id} onChange={onChangeId} required/>
            </div>
            <div>
                <label htmlFor='user-password'>비밀번호</label>
                <br/>
                <Input name='user-password' value={password} type='password' onChange={onChangePassword} required/>
            </div>

            <div style={buttonStyle}>
                <Button type='primary' htmlType='submit' loading={isLoggedingIn}>로그인</Button>
                <Link href='/signup'><Button>회원가입</Button></Link>
            </div>

        </Form>
    );
}

export default LoginForm