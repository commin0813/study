import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types'

const PostImages = ({images}) => {

    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, [])

    if (images.length === 1) {
        return (
            <>
                <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom}/>
            </>
        )
    }
    return (
        <div>
            개발중..
        </div>
    )
}

PostImages.PropTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
}

export default PostImages;