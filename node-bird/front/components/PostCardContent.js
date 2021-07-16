import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/Link'

const PostCardContent = ({postData}) => {
    return (
        <div>
            {postData.split(/(#[^\s#]+)/g).map((p, i) => {
                if (p.match(/(#[^\s#]+)/)) {
                    return (<Link href={`/hashtag/${p.slice(1)}`} key={i}><a>{p}</a></Link>)
                }
            })}
        </div>
    )
}

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
}

export default PostCardContent;