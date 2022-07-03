import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useParams } from 'react-router-dom';

export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
 }


class UpdateEmployeeComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id : this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        };
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
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

    changeFirstNameHandler = (event) => {
        this.setState(
            {
                firstName: event.target.value
            }
        );
    }

    changeLastNameHandler = (event) => {
        this.setState(
            {
                lastName: event.target.value
            }
        );
    }

    changeEmailIdHandler = (event) => {
        this.setState(
            {
                emailId: event.target.value
            }
        );
    }

    updateEmployee = (e) => {
        e.preventDefault();
        //JS Object
        let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        };
        console.log('employee =>' + JSON.stringify(employee));

        EmployeeService.updateEmployee(this.state.id,employee).then(
            res =>{
                alert('Employee Successfully Updated ');
            }
        )
    }


    render() {
        
        return (
           
            
            <div>
                <div className='container'> 
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3'>
                            <h3 className='text-center'>Update Employee</h3>
                            <div className='card-body'>
                                <form>
                                <div className='form-group'>
                                        <label> First Name: </label>
                                        <input name='firstName' className='form-control' type={'text'}
                                               value={this.state.firstName} onChange={this.changeFirstNameHandler}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label> Last Name: </label>
                                        <input name='lastName' className='form-control' type={'text'}
                                               value={this.state.lastName} onChange={this.changeLastNameHandler}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label> Email Id: </label>
                                        <input name='emailId' className='form-control' type={'text'}
                                               value={this.state.emailId} onChange={this.changeEmailIdHandler}
                                        />
                                    </div>
                                    <br/>
                                </form>
                                <button className='btn btn-success' onClick={this.updateEmployee }>Save</button>
                                <a href='/employees'>
                                    <button className='btn btn-danger' style={{marginLeft:"10px"}}>
                                        Cancel
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UpdateEmployeeComponent);