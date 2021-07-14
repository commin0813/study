import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {Button, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";

const CommentForm = ({post}) => {
    const id = useSelector((state) => state.user.me?.id);
    const [commentText, setCommentText] = useState('');

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value)
    }, [])

    const dispatch = useDispatch();

    const onSubmitComment = useCallback(() => {
        // setCommentText();
        console.log(post.id, commentText, id)
        setCommentText('');
    }, [commentText])


    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item >
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
                <Button style={{position: 'absolute', right: 0, bottom:-40}} type="primary"
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