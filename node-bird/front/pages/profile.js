import React from 'react'
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import Head from 'next/head'

const Profile = () => {

    const {me} = useSelector((state) => state.user)

    return (
        <>
            <Head>
                <title>내 프로필 | NordBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={me.Followings} />
                <FollowList header="팔로워 목록" data={me.Followers} />
            </AppLayout>
        </>
    );
}

export default Profile