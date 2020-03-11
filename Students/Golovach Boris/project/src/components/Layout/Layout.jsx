import React from 'react'
import './style.css'

import MessagesField from '../MessagesField/MessagesField.jsx'
import ChatList from '../ChatList/ChatList.jsx'
import Header from '../Header/Header.jsx'

import PropTypes from 'prop-types'



//store
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.number,
    }

    static defaultProps = {
        chatId: 1,
    }
    render() {
        
        console.log('Layout this.props.usr', this.props.usr)
        return(
            <div className="container">
                <Header chatId = { this.props.chatId }/>          
                <div className="chats_And_MessageBlock">
                    <div className="chatBlock">
                        <ChatList />
                    </div>
                    <div className="layout-right-side messageBlock">
                        <MessagesField usr = { this.props.usr }/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({}) => ({})

export default connect(mapStateToProps)(Layout)