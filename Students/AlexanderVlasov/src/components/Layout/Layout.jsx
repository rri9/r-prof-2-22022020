import React from 'react';
import { Grid } from '@material-ui/core';
import ChatList from '../ChatList/ChatList.jsx';
import Messages from '../MessagesField/MessagesField.jsx';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

let user = 'Alex';

class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.number,
    }
    static defaultProps = {
        chatId: 1
    }
    render() {
        const { match: { params } } = this.props;
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
                    {
                        params.chatId ?  <Messages usr={ user }/> : <h2 style={{textAlign: 'center'}}>Выберите чат</h2>
                    }
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(Layout);