import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick'

import {Global, Overlay, Header, SlickWrapper, Indicator, ImageWrapper} from './style'

const ImagesZoom = ({images, onClose}) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <Overlay>
            <Global/>
            <Header>
                <h1>상세 이미지</h1>
                <button onClick={onClose}>X</button>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick
                        initialSlide={0}
                        infinite
                        beforeChange={(s) => setCurrentSlide(s)}
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >

                        {images.map((v) => (
                            <ImageWrapper key={v.src}>
                                <img src={v.src} alt={v.src}/>
                            </ImageWrapper>
                        ))}

                    </Slick>
                    <Indicator>
                        <div>
                            {currentSlide + 1}
                            {' '}
                            / {' '}
                            {images.length}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>

        </Overlay>
    )
}

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ImagesZoom;