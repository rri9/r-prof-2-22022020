import React ,{Component} from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx';

export default class Messages extends Component {
    constructor(props)
    {
        super(props);
        this.StateObject = {UserMsg:[
            {
            user :'Dart Vader',
            text : 'hallo'
            },

        {
            user: null,
            text: null
        },

        {
            user :'Im your father',
            text : 'hallo'
        },

        {
            user: null,
            text: null
        },]};

       
    };
    
    

    

      
    

    render() {
        //let user = this.props.usr;
        let {usr} = this.props;
       

        let MessagesArray = this.StateObject.UserMsg.map((message,index)=>
            <Message key = {index} sender = {message.user} text ={message.text}/>

        );

        return (
            <div className="wrapper">
            <h2>ReactGram &copy;</h2>
            <p> Hello {usr}</p>
            {MessagesArray}
            <input className="inpt" placeholder="text" id="inp"></input>
            <button className = "btn" onClick = {()=>{
                const value = document.getElementById('inp').value;
                //console.log('value: ', value);
                value ? this.setState({UserMsg: this.StateObject.UserMsg.push({user:null,
                    text:value})}) : this.setState({UserMsg: this.StateObject.UserMsg.push({user:null,
                    text:'Нормально'})});
                   
               
                //console.log('setState: ', this.StateObject);
                
                
            }}>Отправить</button>
            </div>
            
        )
    }
}
