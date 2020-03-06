import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import './style.css';

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {        }
    }
    

    render() {
        return (
  <>
            <InputGroup>
                <Input />
                <InputGroupAddon addonType="append" >
                <Button color="info" >Искать</Button>
                </InputGroupAddon>
                </InputGroup>
</>

                //  <input type="text" 
                // onChange = { this.handleChange } 
                // onKeyUp = { this.handleChange }
                // value = { this.state.msg }/>
                // <button onClick = { this.sendMessage }>Send</button> <p>Hello { usr }!</p>
        );
    }
}