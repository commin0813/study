import React from 'react'
import PropType from 'prop-types'
import {List, Button, Avatar, Card} from 'antd'
import {StopOutlined} from '@ant-design/icons'

const FollowList = ({header, data}) => {
    return (
        <List
            style={{marginBottom: 20}}
            grid={{gutter: 4, xs: 2, md: 3}}
            size="small"
            dataSource={data}
            header={
                <div>{header}</div>
            }
            renderItem={item => (
                <List.Item style={{marginTop: 20}}>
                    <Card actions={[<StopOutlined key="stop"/>]}>
                        <Card.Meta description={item.nickname}/>
                    </Card>
                </List.Item>
            )}
            loadMore={
                <div style={{textAlign: 'center', margin: '10px 0'}}>
                    <Button>더 보기{data.nickname}</Button>
                </div>
            }


        />
    );
}

FollowList.propTypes = {
    header : PropType.string.isRequired,
    data : PropType.array.isRequired
}

export default FollowList