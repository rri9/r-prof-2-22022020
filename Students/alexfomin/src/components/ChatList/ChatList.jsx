import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem  } from 'reactstrap';
import './style.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addChat } from '../../store/actions/chats_actions.js'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'

 class ChatList extends Component {
    static propTypes = {
        chats: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired,
        addChat: PropTypes.func.isRequired,
    }


        state = {   input: ''   }

    render() {
        let { chats } = this.props
        let chatsArray = []
        
        Object.keys(chats).forEach(key => {
            chatsArray.push(
            <Link to={ `/chat/${key}` }>
                <ListGroupItem>{chats[key].title}</ListGroupItem>
            </Link>
            )
        })


        return (
  <>
      <ListGroup className="chatlist">
      { chatsArray }
      </ListGroup>
</>
        );
    }
}



const mapStateToProps = ({ chatsReducer }) => ({
    chats: chatsReducer.chats
})


const mapDispatchToProps = dispatch => bindActionCreators( { addChat, push }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)