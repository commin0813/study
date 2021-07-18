import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";
import useInput from "../hooks/useInput";

const CommentForm = ({ post }) => {
    const { id } = useSelector((state) => state.user.me?.id);
    const { addCommentDone } = useSelector((state) => state.post)

    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone])

    const onSubmitComment = useCallback(() => {
        // setCommentText();
        console.log(post.id, commentText, id)
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id }
        })
    }, [commentText, id])


    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button style={{ position: 'absolute', right: 0, bottom: -40 }} type="primary"
                    htmlType="submit">전송</Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.PropTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object)
    }).isRequired
}


export default CommentForm;