import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {updateUser} from './../../ducks/reducer'

class Private extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){
        const {id} = this.props;
        if(!id){
            //double check sessions
            axios.get('./api/user')
            .then(res => {
                //dont move
                //add to redux
                this.props.updateUser(res.data)
            })
            .catch(err => {
                //boot to other page
            })
        } else {
            // dont move
        }
    }

    render(){
        console.log(this.props)
        return (
            <div className='Private'>
                this is the Private Component
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