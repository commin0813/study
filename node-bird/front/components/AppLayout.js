import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Menu, Input, Row, Col } from 'antd'
import LoginForm from './LoginForm'
import UserProfile from './UserProfile'
import styled from 'styled-components'
import { useSelector } from "react-redux";
const SearchInput = styled(Input.Search)`
 virtical-align : 'middle'
`

const AppLayout = ({ children }) => {
    const { me } = useSelector((state) => state.user)
    return (
        <div>
            <Menu mode='horizontal'>
                <Menu.Item >
                    <Link href="/"><a>노드바드</a></Link>
                </Menu.Item>

                <Menu.Item >
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>

                <Menu.Item >
                    <SearchInput enterButton />
                </Menu.Item>

                <Menu.Item >
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>

            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href='http://naver.com' target='_blank' rel='noreferrer noopener'> Made by commin</a>
                </Col>
            </Row>

        </div>
    );
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout