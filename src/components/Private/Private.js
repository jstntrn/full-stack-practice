import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import logo from './../../logo.svg';
import {updateUser} from './../../ducks/reducer'
import './Private.css'

class Private extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        const {id} = this.props;
        if(!id){
            //double check sessions
            axios.get('./api/user')
            .then(res => {
                //dont move
                //add to redux
                this.props.updateUser(res.data);
            })
            .catch(err => {
                //boot to other page
                this.props.history.push('/');
            })
        } else {
            // dont move
        }
    }
    
    logout(){
        axios.post('/auth/logout')
        .then(res => {
            this.props.updateUser({});
            this.props.history.push('/');
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        const { id, username, profile_pic, balance } = this.props;
        return (
            <div>
                <img className='private-logo' src={logo} alt='logo'/> 
                <div className='Private'>
                    {/* <img src={profile_pic} alt='profile' /> */}
                    <h1>Welcome, {username}</h1>
                    <p>Account Number: {id}</p>
                    <p>Current Balance: ${balance}</p>
                    <button className='logout' onClick={() => this.logout()}>Logout</button>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state){
    const { id, username, profile_pic, balance } = state
    return {
        id,
        username,
        profile_pic,
        balance
    };
};

export default connect(mapStateToProps, {updateUser})(Private)