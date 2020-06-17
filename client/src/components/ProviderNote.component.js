import React from 'react';
import axios from 'axios';
import { Card, CardText, Alert, Button, Form, FormGroup, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ProviderNote extends React.Component {
    constructor() {
        super();
        this.state = {
            doctorNoteArray: [],
            doctorNote: ''
        }
        this.addButton = this.addButton.bind(this)
        this.scheduleMeeting = this.scheduleMeeting.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    async componentDidMount() {
        //retrieves all the doctor notes
        axios.get('http://localhost:5000/doctorNotes/' + this.props.patientId)
            .then(response => {
                console.log(response);
                this.setState({doctorNoteArray : response.data});
            });
    };
    notify = () => toast.success('Note Added to the Patient\'s Profile!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    handleChange(event) {
        this.setState({doctorNote: event.target.value});
    }
    addButton() { //adds doctor note to the database when button is clicked
        this.notify();
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        axios.put('http://localhost:5000/patientEntry/addDoctorNote/' + this.props.patientId, {
            isDoctor: true,
            doctorNote: 'On ' + dateTime + ' :  ' + this.state.doctorNote
        })
        
        setTimeout(function () {
            window.location.reload(1);
        }, 5000);  // the window reloads after 5 secs
    }
    scheduleMeeting() { //redirects to the Zoom home page for meetings
        window.location.assign('https://zoom.us/signin');
    }
    render() {
        const notes = this.state.doctorNoteArray.map(elem => {
            return(
            <Card body key={elem}>
                <CardText>{elem}</CardText>
             </Card>)
        })
        return(
            <div className="DoctorNote">
                <div className="doctorNoteFixed">
                <ToastContainer />

                <Form className="form-horizontal" onSubmit={this.addButton}>
                    <FormGroup>
                        <Input className="spaceInputNote" name="doctorNote" onChange={this.handleChange}
                                            placeholder={"Add a note to the patient"}/>
                                                                         {/* if the doctor is empty string, button will be disabled */}
                         <Button className="btn btn-primary" type="submit" disabled={this.state.doctorNote.length <= 0}>Add</Button>
                        </FormGroup>
                   
                    <Button className="btn btn-primary" onClick={this.scheduleMeeting} style={{ marginBottom: '1rem' }}>Schedule a Zoom Meeting</Button>
                </Form>
                <Alert color="success">Past Notes {this.props.lastName}</Alert>
                </div>
                <div className="mainDoctorNote">
                {notes}
                </div>
            </div>
        )
    }
}

export default ProviderNote;