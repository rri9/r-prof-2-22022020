import React from 'react';
import { Grid } from '@material-ui/core';
import ChatList from '../ChatList/ChatList.jsx';
import Messages from '../MessagesField/MessagesField.jsx';
import PropTypes from 'prop-types';

let user = 'Alex';

export default class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.number,
    }
    static defaultProps = {
        chatId: 1
    }
    render() {
        return (
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
                spacing={1}
            >
                <Grid item xs={3}>
                    <ChatList chatId={ this.props.chatId }/>
                </Grid>
                <Grid item xs={9}>
                    <Messages usr={ user }/>
                </Grid>
            </Grid>
        )
    }
}