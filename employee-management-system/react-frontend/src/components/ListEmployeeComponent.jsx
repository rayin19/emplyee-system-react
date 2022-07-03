import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            employees: []
        };
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({employees: res.data});
        });
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(
            res => {
                this.setState({
                    //Remove from employees list
                    employees: this.state.employees.filter(
                        employee => employee.id !== id
                    )
                });
            });
    }
 
    render() {
        return (
            <div>
                <h2 className='text-center'>Employee List</h2>
                <br/>
                <div className='row'>
                    <a href='/add-employee'>
                    <button className='col-lg-2 col-md-2 btn btn-info'> Add Employee </button>
                    </a>
                </div>
                <br/>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr className='table-dark'>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee => 
                                    <tr key={employee.id}>
                                        <td> {employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td>
                                            <Link to={`/update-employee/${employee.id}`}>
                                                <button className='btn btn-info'> Update </button>
                                            </Link>
                                            <button className='btn btn-danger' style={{marginLeft: '10px'}} 
                                            onClick={() => this.deleteEmployee(employee.id)}> 
                                                Delete 
                                            </button>
                                            <Link to={`/view-employee/${employee.id}`}>
                                                <button className='btn btn-secondary' style={{marginLeft: '10px'}}> View </button>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;