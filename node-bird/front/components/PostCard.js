import React, {useState, useCallback} from "react";
import {Avatar, Button, Card, Comment, List, Popover} from "antd";
import {EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from 'prop-types'
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import {REMOVE_POST_REQUEST} from "../reducers/post";

const PostCard = ({post}) => {
    const id = useSelector((state) => state.user.me?.id);
    const {removePostLoading} = useSelector((state) => state.post)
    const [liked, setliked] = useState(false)
    const [commentFormOpend, setcommentFormOpend] = useState(false)
    const onToggleLike = useCallback(
        () => {
            setliked((prev) => !prev);
        },
        [],
    )
    const onToggleComment = useCallback(
        () => {
            setcommentFormOpend((prev) => !prev);
        },
        [],
    )

    const dispatch = useDispatch();

    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        });
    }, [])

    // const id = me?.id
    return (
        <div style={{marginTop: 20}}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images}/>}
                actions={[
                    <RetweetOutlined key="retweet"/>,
                    liked ?
                        <HeartTwoTone twoToneColor="#eb2f96" onClick={onToggleLike} key="heart"/>
                        : <HeartOutlined onClick={onToggleLike} key="heart"/>
                    ,
                    <MessageOutlined key="comment" onClick={onToggleComment}/>,
                    <Popover key="more" content={
                        (
                            <Button.Group>
                                {id && post.User.id === id ?
                                    <>
                                        <Button type="primary">수정</Button>
                                        <Button type="danger" onClick={onRemovePost}
                                                loading={removePostLoading}>삭제</Button>
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
                    description={<PostCardContent postData={post.content}/>}
                />
            </Card>
            {
                commentFormOpend && (
                    <div>
                        <CommentForm post={post}/>
                        <List
                            header={`${post.Comments.length} 개의 댓글`}
                            itemLayout="horizontal"
                            dataSource={post.Comments}
                            renderItem={(item) => (
                                <li>
                                    <Comment author={item.User.nickname}
                                             avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                             content={item.content}
                                    />
                                </li>
                            )}
                        />

                    </div>
                )
            }

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
