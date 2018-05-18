import React from 'react';
import '../../assets/css/popup.css';

class Adduser extends React.Component {
    constructor(props){
        super(props)
        this.state = {name : '',email:'',skills:[],optionItems:[],gender:'',interest:[],interestItems:[]};
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.changeMobile = this.changeMobile.bind(this);
        this.changeSkills = this.changeSkills.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.changeInterest = this.changeInterest.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state.options = [
            { label: 'Eating', value: 'eating' },
            { label: 'Sleeping', value: 'sleeping' },
            { label: 'Drawing', value: 'drawing' },
            { label: 'Painting', value: 'painting' },
            { label: 'Playing', value: 'playing' }
        ];
    }
    
    changeName(event){
        this.setState({name: event.target.value});
    }
    changeEmail(event){
        this.setState({email: event.target.value});
    }
    changeCity(event){
        this.setState({city: event.target.value});
    }
    changeMobile(event){
        this.setState({mobile: event.target.value});
    }
    changeGender(event){
        this.setState({gender: event.target.value});
    }
    changeSkills(event){
        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        } 
        this.setState({skills: value});     
    }
    changeInterest(event){
        var array = [];
        array = this.state.interest;
        var found = array.find(
            function(element){
                return element === event.target.value;       
            }
        )
        if(found !== event.target.value){
            this.state.interest.push(event.target.value);
        }else{
            var index = array.indexOf(event.target.value); 
            this.state.interest.splice(index, 1);
        }
    }
    submitForm(event){
        event.preventDefault();
        this.props.sendData({name:this.state.name,email:this.state.email,gender:this.state.gender,interest:this.state.interest.join(","),skills:this.state.skills.join(",")});
    }
    componentDidMount(){
        var options = this.state.options;
        this.state.optionItems = options.map((options) =>
        <option key={options.value} value={options.value}>{options.label}</option>
        );
        this.setState({
            skills: this.state.optionItems,
        });
        this.state.interestItems = options.map((options) =>
        <label key={options.value}>
            <input type="checkbox" value={options.value}/>{options.label}
        </label>
        );
        
    }
    render() {       
        return (
        <div className='popup'>
          <div className='popup_inner'>
            <button type="button" className="close" onClick={this.props.closePopup} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h2>{this.props.title}</h2>
            <form onSubmit={this.submitForm}>
            <label>Name:
            <input type="text" value={this.state.name} className="form-control" name="name" onChange={this.changeName}/>
            </label>
            <label>Email:
            <input type="email" value={this.state.email} className="form-control" name="email" onChange={this.changeEmail}/>
            </label>
            <br />
            <label>Gender:
            <div onChange={this.changeGender}>
                <input type="radio" value="Male" name="gender"/> Male
                <input type="radio" value="Female" name="gender"/> Female
            </div>
            </label>
            <br />
            <label>Interest:
            <div onChange={this.changeInterest}>
                {this.state.interestItems}
            </div>
            </label>
            <br />
            <label>Skills: </label>
            <select multiple className="form-control" onChange={this.changeSkills}>{this.state.optionItems}</select>
            <br />
            <button type="submit" className="btn btn-dark" value="submit">Submit</button>
            </form>
            
          </div>
        </div>
      );
    }
  }
export default Adduser;
