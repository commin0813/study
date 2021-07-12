import React from 'react'
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import Head from 'next/head'

const Profile = () => {
    const followingList = [{ nickname: '제로초ing' }, { nickname: '제로ing' }, { nickname: '노드노드ing' }]
    const followerList = [{ nickname: '제로초' }, { nickname: '제로' }, { nickname: '노드노드' }]
    return (
        <>
            <Head>
                <title>내 프로필 | NordBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={followingList} />
                <FollowList header="팔로워 목록" data={followerList} />
            </AppLayout>
        </>
    );
}

export default Profile