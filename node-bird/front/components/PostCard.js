import React from "react";
import {Avatar, Button, Card, Popover} from "antd";
import {EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import PropTypes from 'prop-types'
import PostImages from "./PostImages";

const PostCard = ({post}) => {
    const id = useSelector((state) => state.user.me?.id);
    // const id = me?.id
    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images}/>}
                actions={[
                    <RetweetOutlined key="retweet"/>,
                    <HeartOutlined key="heart"/>,
                    <MessageOutlined key="comment"/>,
                    <Popover key="more" content={
                        (
                            <Button.Group>
                                {id && post.User.id === id ?
                                    <>
                                        <Button type="primary">수정</Button>
                                        <Button type="danger">삭제</Button>
                                    </>
                                    : <Button type="info">신고</Button>
                                }
                            </Button.Group>
                        )
                    }>
                        <EllipsisOutlined/>
                    </Popover>
                ]}
            >

                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
                {/*<Image/>*/}
                {/*<Content/>*/}
            </Card>

            {/*<CommentForm/>*/}
            {/*<Comments/>*/}
        </div>
    )
}

PostCard.PropTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object)
    }).isRequired
};

export default PostCard;
