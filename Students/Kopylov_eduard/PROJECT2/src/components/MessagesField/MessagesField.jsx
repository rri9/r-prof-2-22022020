import React ,{Component} from 'react';
import ReactDom from 'react-dom';
import Message from '../Message/Message.jsx';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import './style.css'

export default class Messages extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            msg:'',
            msgArray:[
            {
            user :null,
            text : 'hello'
            },

        {
            user: null,
            text: null
        },

        {
            user :null,
            text : 'hallo'
        },

        {
            user: null,
            text: null
        }]};

       
    };

    //methods
    sendMessage = (e)=>{
        this.setState({
            msgArray : [...this.state.msgArray, {user:this.props.usr,text: this.state.msg}],
            msg: ''
        });
            //e.target.value = '';
    };
    
handleChange = (event)=>{
    event.keyCode !== 13 ?
        this.setState({msg:event.target.value}):
        this.sendMessage(event);

};
    
//hooks
componentDidUpdate(){
    let msgs = this.state.msgArray;
    if (msgs.length % 2 === 1) {
        setTimeout(()=> {
            this.setState({
                msgArray : [...this.state.msgArray, {user:null,text: 'noooo'}],
                msg: ''
            });
        },500)
    }
}
//
      
    

    render() {
        //let user = this.props.usr;
        let {usr} = this.props;
        let {msgArray} = this.state;

        let MessagesArray = msgArray.map((message,index)=>
            <Message key = {index} sender = {message.user} text ={message.text}/>

        );

        return (
            <Grid className="wrapper">
            
                {MessagesArray}
            

            <Grid container className = 'field-data' justify= 'space-between' direction = 'row'>
            <Input className='inp' placeholder="text" onChange = {this.handleChange} onKeyUp = {this.handleChange} value = {this.state.msg} />
            {/* <input className="inpt" placeholder="text" id="inp" onChange = {this.handleChange} onKeyUp = {this.handleChange} value = {this.state.msg}></input> */}
            {/* <button className = "btn" onClick = {this.sendMessage}>Отправить</button> */}
            <Button variant="contained"  onClick = {this.sendMessage} className = 'btn'>Отправить</Button>
            </Grid>
            
            </Grid>
            
        )
    }
}
