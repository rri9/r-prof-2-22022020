import React ,{Component} from 'react';
import ReactDom from 'react-dom';
import Message from '../Message/Message.jsx';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import './style.css'
import {sendMessage} from '../../store/actions/messages_actions.js';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';

class Messages extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            msg:'',
        };

        
       
    };

    //methods
    sendMessage = (text, sender)=>{
        const { messages} = this.props;
        const messageId = Object.keys(messages).length+1;
     
        this.props.sendMessage(messageId, sender, text)
        // this.setState({
        //     msgArray : [...this.state.msgArray, {user:this.props.usr,text: this.state.msg}],
        //     msg: ''
        // });
           
    };
    
handleChange = (event)=>{
    if (event.keyCode !== 13){
        console.log('pressed');
        this.setState({msg:event.target.value});
    }
    else {
        this.handleSendMessage(this.state.msg, 'Me');
    }
        
        //this.sendMessage(event);

};

handleSendMessage = (message, sender) => {
    this.setState({msg: ''});
    if (sender == 'Me') this.sendMessage(message, sender);
    
};
    
//hooks
componentDidUpdate(){

    const { messages} = this.props;
    const messageId = Object.keys(messages).length+1;

    
    if (Object.keys(messages).length % 2 == 1)
    {
        setTimeout(()=> {
            this.sendMessage('text', 'bot');
        },500)
    }
    console.log('updated');
};
//
      
    

    render() {
        //let user = this.props.usr;
        let {usr} = this.props;
        let {messages} = this.props;

        let MessagesArray = [];
        Object.keys(messages).forEach(key => {MessagesArray.push(
            <Message key = { key} 
            sender = {messages[key].user} 
            text ={messages[key].text}/>

        )});
               
        return (
            <Grid className="wrapper">
                
                {MessagesArray}

            <Grid container className = 'field-data' justify= 'space-between' direction = 'row'>
            <Input className='inp' placeholder="text" onKeyUp = {this.handleChange} onChange = {this.handleChange}  value = {this.state.msg} />
            <Button variant="contained"  onClick = { () => this.handleSendMessage(this.state.msg, 'Me')} className = 'btn'>Отправить</Button>
            </Grid>
            
            </Grid>
            
        )
    }
}

const mapStateToPops = ({msgReducer}) => ({
    messages: msgReducer.messages
})
const mapDispatchToProps = dispatch => bindActionCreators({sendMessage},dispatch)

export default connect(mapStateToPops, mapDispatchToProps)(Messages)









