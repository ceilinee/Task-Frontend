import React from 'react';
import moment from 'moment';
import axios from 'axios';
import garbage from './garbage.png';
import UserID from './UserID';

export default class Project extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            projectName: [],
						project: false,
        }
  }
  componentWillMount() {
		if(this.props.projects.checked){
		this.setState({
			project: true,
		})
	  }
		else{
			this.setState({
				project: false,
			})
		}
	}
	handleChange = () => {
		if(!this.state.project){
			this.setState({
				project: true,
			})
			this.setTrue();
	  }
		else{
			this.setState({
				project: false,
			})
			this.setTrue();
		}
	}
	setTrue = () => {
    axios.put('https://task-ceiline.herokuapp.com/project/true', { name: this.props.projects.name, idUsers: UserID.getID() })
    .then(() => {this.props.refresh()});
	}
	deleteTask = () => {
		console.log("hello");
		axios.delete('https://task-ceiline.herokuapp.com/project/delete', { params: { name: this.props.projects.name, idUsers: UserID.getID() } })
		.then(() => {this.props.refresh()});
	}
  render(){
		var box = "box";
		var sideline = "side-line";
		if(this.props.projects.work == "true"){
			box = "box-yellow";
			sideline = "side-line-yellow";
		};
		if(this.props.projects.extra == "true"){
			box = "box-green";
			sideline = "side-line-green";
		};
				return(
						<div className = {box}>
							<div className = {sideline}/>
										<label>
											<input
												name="isGoing"
												type="checkbox"
												checked={this.state.project}
												onChange={()=>{this.handleChange()}} />
										</label>
										{this.props.projects.name} ({this.props.projects.dateDue} hr)
										<img className = "garbage-icon" onClick={() => {this.deleteTask()}} src={garbage}/>
						</div>
				);
    }
  }
