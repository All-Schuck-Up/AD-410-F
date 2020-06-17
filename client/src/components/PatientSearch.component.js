import React from 'react';
import {Form, FormGroup, Label, Input, Button, Alert, Row, Col } from 'reactstrap';
import axios from 'axios';

class PatientSearch extends React.Component {
  constructor() {
    super();
    this.state = {
        searchEntry : '', 
        patientBasicInfo : '',
        patientFound : false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
  handleChange(e) {
    this.setState({
        searchEntry: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("Patient Searching");
    axios.get('http://localhost:5000/patient/search/' + this.state.searchEntry)
      .then(res => {this.setState({
          patientBasicInfo: res.data.map(each => each._id),
          patientFound: true
      })
      console.log(res.data)})
  }

  render() {
    let patientPageURL = "/patient/" + this.state.patientBasicInfo + '/profile';
    return (
      <div className="patientSearch">
        <Row>
        <Col xs={11}><Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="exampleSearch">Search</Label>
          <Input
              className="inputSearch"
              type="search"
              name="search"
              id="exampleSearch"
              placeholder="Patient First Name with first letter capital"
              onChange={this.handleChange}
            />
         </FormGroup>
        </Form></Col>
        <Col xs={6}><Alert color={this.state.patientFound ? 'success' : 'danger'}>{this.state.patientFound ? 'Patient Found' : 'Patient Not Found'}</Alert></Col>
        <Col ><form action={patientPageURL} method="get" label="hello">
                <Button className="Go to profile" color="primary" disabled={!this.state.patientFound}>Go to profile</Button>
        </form></Col>
        </Row>
      </div>
    );}
}

export default PatientSearch;