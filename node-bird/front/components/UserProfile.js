import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'

const UserProfile = ({ setIsLoggedIn }) => {
    const onLogout = useCallback(() => {
        setIsLoggedIn(false)
    }, [])
    return (
        <Card
            actions={
                [
                    <div key='twit'>트윗<br />0</div>,
                    <div key='followings'>팔로윙 수<br />0</div>,
                    <div key='followings'>팔로우<br />0</div>
                ]
            }
        >
            <Card.Meta
                avatar={<Avatar>CM</Avatar>}
                title="commin"
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile