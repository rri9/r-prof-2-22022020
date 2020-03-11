import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem  } from 'reactstrap';
import './style.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addChat } from '../../store/actions/chats_actions.js'

 class ChatList extends Component {

        state = {   input: ''   }
    
    

    render() {
        let { chats } = this.props
        let chatsArray = []
        
        Object.keys(chats).forEach(key => {
            chatsArray.push(
            <Link to={ `/chat/${key}` }>
                <ListGroupItem>={chats[key].title}</ListGroupItem>
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

const mapDispatchToProps = dispatch => bindActionCreators( { addChat }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)