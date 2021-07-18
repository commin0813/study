import React, { useCallback, useState } from 'react'
import AppLayout from '../components/AppLayout';
import Head from 'next/head'
import { Button, Checkbox, Form, Input } from 'antd'
import useInput from "../hooks/useInput";
import * as PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';

const SignUp = () => {
    const dispatch = useDispatch()
    const { signUpLoading } = useSelector((state) => state.user);

    const [email, onChangeEmail] = useInput('');
    const [nickName, onChangeNickName] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value)
        setPasswordError(e.target.value !== password);
    }, [password])
    const [termError, setTermError] = useState(false)
    const [term, setTerm] = useState(false)
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked)
        setTermError(false);
    }, [])

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }


        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, nickName }
        })
        console.log(email, nickName, password)

    }, [email, password, passwordCheck, term])
    return (
        <AppLayout>
            <Head>
                <title>회원가입 | NordBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor='user-email'>이메일</label>
                    <br />
                    <Input name='user-email' type="email" value={email} onChange={onChangeEmail} required />
                </div>

                <div>
                    <label htmlFor='user-nickname'>닉네임</label>
                    <br />
                    <Input name='user-nickname' value={nickName} onChange={onChangeNickName} required />
                </div>

                <div>
                    <label htmlFor='user-password'>비밀번호</label>
                    <br />
                    <Input type='password' name='user-password' value={password} onChange={onChangePassword} required />
                </div>

                <div>
                    <label htmlFor='user-password'>비밀번호 확인</label>
                    <br />
                    <Input type='password' name='user-password-check' value={passwordCheck} onChange={onChangePasswordCheck} required />
                    {passwordError && <div style={{ color: 'red' }}>비밀번호가 다릅니다.</div>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
                        약관에 동의 하시겠습니까?
                    </Checkbox>
                    {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
                </div>
                <div>
                    <Button type='primary' htmlType='submit' style={{ marginTop: 10 }} loading={signUpLoading}>
                        가입하기
                    </Button>
                </div>
            </Form>
        </AppLayout>
    );
}

export default SignUp