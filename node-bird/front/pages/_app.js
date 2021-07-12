import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import React from 'react'
import Head from 'next/head'
import wrapper from "../store/configuresStore";
const NordBird = ({ Component }) => {
    return (
        <>
        <Head>
            <meta charset='utf-8'/>
            <title>NordBird</title>
        </Head>
        
        <Component />
        </>
    )
}

NordBird.propTypes = {
    Component : PropTypes.elementType.isRequired,
}
export default wrapper.withRedux(NordBird)