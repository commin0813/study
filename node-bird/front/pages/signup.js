import React from 'react'
import AppLayout from '../components/AppLayout';
import Head from 'next/head'
const SignUp = () => {
    return (
        <>
            <Head>
                <title>회원가입 | NordBird</title>
            </Head>
            <AppLayout><h1>회원가입</h1></AppLayout>
        </>
    );
}

export default SignUp