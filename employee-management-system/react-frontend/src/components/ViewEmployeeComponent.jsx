import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useParams } from 'react-router-dom';

export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
 }


class ViewEmployeeComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id : this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        };
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then(
            (res) =>{
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId
                });
            });
    }


    render() {
        return (
            <div>
                <div className='container'> 
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3'>
                            <h3 className='text-center'>View Employee</h3>
                            <div className='card-body'>
                                <form>
                                <div className='form-group'>
                                        <label> First Name: </label>
                                        <input name='firstName' className='form-control' type={'text'}
                                               value={this.state.firstName} disabled readonly
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label> Last Name: </label>
                                        <input name='lastName' className='form-control' type={'text'}
                                               value={this.state.lastName} disabled readonly
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label> Email Id: </label>
                                        <input name='emailId' className='form-control' type={'text'}
                                               value={this.state.emailId} disabled readonly
                                        />
                                    </div>
                                    <br/>
                                </form>
                                <a href='/employees'>
                                    <button className='btn btn-info'>
                                        Back
                                    </button>
                                </a>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewEmployeeComponent);