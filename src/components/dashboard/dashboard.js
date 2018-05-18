import React, { Component } from 'react';
import '../../assets/css/dashboard.css';
import Adduser from '../dashboard/adduser';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            addUserPopup: false,
            key:'',
            userData:[],
            listItems:[]
          };
    }
    addUser(){
        this.setState({
            addUserPopup: !this.state.addUserPopup,
            key:"Add Data"
          });
    }
    data(data){
        console.log(data);
        this.state.userData.push(data);
        console.log(this.state.userData);
        var options = this.state.userData;
        this.addUser();
        this.state.listItems = options.map((options) =>
            <tr key={options.email}>
                <td>{options.name}</td>
                <td>{options.email}</td>
                <td>{options.gender}</td>
                <td>{options.interest}</td>
                <td>{options.skills}</td>
            </tr>
        );
    }
    render(){
        return (
            <div className="dashboard">
                <h3>welcome home</h3>
                <button type="button" className="btn btn-info" onClick={this.addUser.bind(this)}>Add User</button>
                {this.state.addUserPopup ? 
                    <Adduser
                        title={this.state.key}
                        closePopup={this.addUser.bind(this)}
                        sendData={this.data.bind(this)}
                    />
                    : null
                }
                <p>User Details</p>
                <table className="table" border="1"> 
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Interest</th>
                        <th>Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listItems}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Dashboard