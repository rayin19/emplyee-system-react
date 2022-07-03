import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            emailId: ''
        };
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
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

    saveEmployee = (e) => {
        e.preventDefault();
        //JS Object
        let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        };
        console.log('employee =>' + JSON.stringify(employee));

        EmployeeService.addEmployee(employee).then(
            res =>{
                alert('Employee Successfully Added ');
            }
        )
    }


    render() {
        
        return (
           
            
            <div>
                <div className='container'> 
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3'>
                            <h3 className='text-center'>Add Employee</h3>
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
                                <button className='btn btn-success' onClick={this.saveEmployee }>Save</button>
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

export default CreateEmployeeComponent;