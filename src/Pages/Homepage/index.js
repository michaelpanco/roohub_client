import React from 'react';

import 'devextreme/data/odata/store';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import CustomStore from 'devextreme/data/custom_store';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import axios from 'axios';

import config from './../../config'

import validation from './validation'

import 'whatwg-fetch';
import 'devextreme/dist/css/dx.light.css';
import 'react-day-picker/lib/style.css';
import { Container, Row, Col, Button, Modal, Form, Spinner } from 'react-bootstrap';

function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== '';
}

const allowedPageSizes = [8, 12, 20];

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            dataStore: [],
            showModal: false,

            currentID: '',

            // fields
            name: '',
            nickname: '',
            weight: '',
            height: '',
            gender: '',
            color: '',
            friendliness: '',
            birthday: '',

            birthdayFormated: '',

            // fieldsValidation
            nameValid: '',
            nicknameValid: '',
            weightValid: '',
            heightValid: '',
            genderValid: '',
            colorValid: '',
            friendlinessValid: '',
            birthdayValid: '',

            // fieldsInValidation
            nameInvalid: '',
            nicknameInvalid: '',
            weightInvalid: '',
            heightInvalid: '',
            genderInvalid: '',
            colorInvalid: '',
            friendlinessInvalid: '',
            birthdayInvalid: '',

            nameErr: '',
            nicknameErr: '',
            weightErr: '',
            heightErr: '',
            genderErr: '',
            colorErr: '',
            friendlinessErr: '',
            birthdayErr: '',

            submitReady: false,
            submitRequest: false,

            actionState: '',
    
        };

        // Bindings

        this.clickTableRow = this.clickTableRow.bind(this)
        this.addNewRecord = this.addNewRecord.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.createRecord = this.createRecord.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.changeDatePicker = this.changeDatePicker.bind(this)
        this.submitAction = this.submitAction.bind(this)
        this.resetFormSession = this.resetFormSession.bind(this)
    }

    resetFormSession = () => {

        this.setState({
            currentID: '',

            // fields
            name: '',
            nickname: '',
            weight: '',
            height: '',
            gender: '',
            color: '',
            friendliness: '',
            birthday: '',

            birthdayFormated: '',

            // fieldsValidation
            nameValid: '',
            nicknameValid: '',
            weightValid: '',
            heightValid: '',
            genderValid: '',
            colorValid: '',
            friendlinessValid: '',
            birthdayValid: '',

            // fieldsInValidation
            nameInvalid: '',
            nicknameInvalid: '',
            weightInvalid: '',
            heightInvalid: '',
            genderInvalid: '',
            colorInvalid: '',
            friendlinessInvalid: '',
            birthdayInvalid: '',

            nameErr: '',
            nicknameErr: '',
            weightErr: '',
            heightErr: '',
            genderErr: '',
            colorErr: '',
            friendlinessErr: '',
            birthdayErr: '',

            submitReady: false,
            submitRequest: false,

            actionState: '',

            successOutcome: false,
            failedOutcome: false,

            successOutcomeMsg: false,
            failedOutcomeMsg: false,
        })

    }

    clickTableRow = (event) => {

        if(event.data){

            let formattedDateArr = event.data.birthday.split("-");
            let formattedDate = formattedDateArr[1] + '/' +  formattedDateArr[2] + '/' +  formattedDateArr[0]
    
            this.setState({
                showModal: true,
                actionState: 'update',
    
                currentID: event.data.id,
    
                // fields
                name: event.data.name,
                nickname: event.data.nickname,
                weight: event.data.weight,
                height: event.data.height,
                gender: event.data.gender,
                color: event.data.color,
                friendliness: event.data.friendliness,
                birthday: event.data.birthday,
    
                birthdayFormated: formattedDate,
    
                // fieldsValidation
                nameValid: true,
                nicknameValid: true,
                weightValid: true,
                heightValid: true,
                genderValid: true,
                colorValid: true,
                friendlinessValid: true,
                birthdayValid: true,
    
                // fieldsInValidation
                nameInvalid: false,
                nicknameInvalid: false,
                weightInvalid: false,
                heightInvalid: false,
                genderInvalid: false,
                colorInvalid: false,
                friendlinessInvalid: false,
                birthdayInvalid: false,
    
                nameErr: '',
                nicknameErr: '',
                weightErr: '',
                heightErr: '',
                genderErr: '',
                colorErr: '',
                friendlinessErr: '',
                birthdayErr: '',
    
                submitReady: true,
    
            })
        }

    }

    addNewRecord = () => {
        this.setState({
            actionState: 'create',
            showModal: true,
        })
    }

    closeModal = () => {

        this.setState({
            showModal: false,
        }, function() {
            if(this.state.actionState == 'update'){
                this.resetFormSession();
            }
        })
    }

    createReadyState = () => {
        if(
            this.state['nameValid'] && 
                !this.state['nicknameInvalid'] && 
                    this.state['weightValid'] && 
                        this.state['heightValid'] && 
                            this.state['genderValid'] &&
                                !this.state['colorInvalid']  && 
                                    !this.state['friendlinessInvalid'] && 
                                        this.state['birthdayValid']){

            this.setState({submitReady: true});

        }else{
            this.setState({submitReady: false});
        }
    }

    handleInputChange(event) {
 
        let stateChange = validation(event)

        this.setState(stateChange, function(){
            this.createReadyState()
        })
    }

    parseDate(str, format, locale) {
        const parsed = dateFnsParse(str, format, new Date(), { locale });
        if (DateUtils.isDate(parsed)) {
          return parsed;
        }
        return undefined;
    }
      
    formatDate = (date, format, locale) => {
        let fmdate = dateFnsFormat(date, format, { locale });
        console.log(fmdate)

        this.setState({
            'birthdayFormated': fmdate
        })
        
        return fmdate;
    }

    changeDatePicker(day) {

        if(day === undefined){
            
            this.setState({
                'birthdayValid': false,
                'birthdayInvalid': true,
                'birthdayErr': 'Invalid date'
            }, function(){
                this.createReadyState()
            })
        }else{
            this.setState({
                'birthday' : day.toISOString().split('T')[0],
                'birthdayValid': true,
                'birthdayInvalid': false,
            }, function(){
                this.createReadyState()
            })
        }
    }

    submitAction() {
        if(this.state.actionState == "create"){
            this.createRecord();
        }else{
            this.updateRecord();
        }
    }

    createRecord() {

        this.setState({
            successOutcome: false,
            failedOutcome: false,
            submitRequest: true,
        })

        axios.post(config.api_base_url + '/api/v1/pets', {
            name: this.state.name,
            nickname: this.state.nickname,
            weight: this.state.weight,
            height: this.state.height,
            gender: this.state.gender,
            color: this.state.color,
            friendliness: this.state.friendliness,
            birthday: this.state.birthday
            
        }).then((response) => {


            if(response.status == 200){

                this.fetchData();


                this.setState({
                    currentID: response.data.data.id,
                    actionState: 'update',
                    successOutcome: true,
                    successOutcomeMsg: 'Your record has been added succcessfully',
                    submitRequest: false,
                })


            }else{
                this.setState({
                    submitRequest: false,
                    successOutcome: false,
                    failedOutcome: true,
                    failedOutcomeMsg: response.data.message,
                })
            }

        }).catch((err) => {

            let err_message = "Something went wrong, Please try again later";

            if(err.response){
                err_message = err.response.data.message
            }

            this.setState({
                submitRequest: false,
                successOutcome: false,
                failedOutcome: true,
                failedOutcomeMsg: err_message,
            })
        })
    }

    updateRecord() {
  
        this.setState({
            successOutcome: false,
            failedOutcome: false,
            submitRequest: true,
        })

        axios.put(config.api_base_url + '/api/v1/pet/' + this.state.currentID, {
            name: this.state.name,
            nickname: this.state.nickname,
            weight: this.state.weight,
            height: this.state.height,
            gender: this.state.gender,
            color: this.state.color,
            friendliness: this.state.friendliness,
            birthday: this.state.birthday
            
        }).then((response) => {

            console.log(response)

            if(response.status == 200){
                this.fetchData();

                this.setState({
                    actionState: 'update',
                    successOutcome: true,
                    successOutcomeMsg: 'Your record has been updated succcessfully',
                    submitRequest: false,
                })

            }else{
                this.setState({
                    submitRequest: false,
                    successOutcome: false,
                    failedOutcome: true,
                    failedOutcomeMsg: response.data.message,
                })
            }
    

        }).catch((err) => {

            let err_message = "Something went wrong, Please try again later";

            if(err.response){
                err_message = err.response.data.message
            }

            this.setState({
                submitRequest: false,
                successOutcome: false,
                failedOutcome: true,
                failedOutcomeMsg: err_message,
            })
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {

        let store = new CustomStore({
            key: 'id',
            load(loadOptions) {
                let params = '?';
                [
                    'skip',
                    'take',
                    'sort',
                    'filter',
        
                ].forEach((i) => {
        
                    if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
                });
        
            params = params.slice(0, -1);
        
            return fetch(`http://roohub.local/api/v1/pets${params}`)
                .then((response) => response.json())
                .then((data) => ({
                    data: data.data,
                    totalCount: data.count,
                }))
                .catch(() => { throw new Error('Data Loading Error'); });
            },
        });

        this.setState({
            dataStore: store,
        })
    }

    render() {
        return (
            <>
            <Container>

                <Row className="mb20">
                    <Col xs={6}>
                        <div className="main-title">Kangaroo Tracker</div>
                        <p>Click the record to see the details</p>
                    </Col>
                    <Col align="right" xs={6}>
                        <Button variant="outline-primary" className="chm-nav-button-pay" onClick={this.addNewRecord} vertical="true">
                            Add New
                        </Button>
                    </Col>
                </Row>
                
                <DataGrid dataSource={this.state.dataStore} showBorders={true} remoteOperations={true} hoverStateEnabled={true} onCellClick={this.clickTableRow}>
                    <Column dataField="id" dataType="number" />
                    <Column dataField="name" dataType="string" />
                    <Column dataField="birthday" dataType="date" />
                    <Column dataField="weight" caption="Weight (kg)" dataType="number"/>
                    <Column dataField="height" caption="Height (m)" dataType="number" />
                    <Column dataField="friendliness" dataType="string" />

                    <Paging defaultPageSize={12} />
                    <Pager showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} />
                </DataGrid>
            </Container>

            <Modal
                show={this.state.showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={this.closeModal}
                centered>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {(this.state.actionState == 'create') ? 'Add New Kangaroo' : 'Edit Kangaroo'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Row className="mb20">
                                <Col xs={6}>
                                    <Row>
                                        <Col xs={4}>Name *</Col>
                                        <Col xs={8}>
                                            <Form.Group className="mb-3"  controlId="formBasicEmail">
                                                <Form.Control required value={this.state.name} disabled={this.state.submitRequest} name="name" onChange={this.handleInputChange} placeholder="Enter the name" isValid={this.state.nameValid} isInvalid={this.state.nameInvalid}  />
                                                {this.state.nameInvalid && <div className="input-errors">{this.state.nameErr}</div>}
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={4}>Nickname</Col>
                                        <Col xs={8}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control value={this.state.nickname} disabled={this.state.submitRequest} name="nickname" onChange={this.handleInputChange} placeholder="Enter the nickname" isValid={this.state.nicknameValid} isInvalid={this.state.nicknameInvalid} />
                                                {this.state.nicknameInvalid && <div className="input-errors">{this.state.nicknameErr}</div>}
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={4}>Gender *</Col>
                                        <Col xs={8}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Select aria-label="Default" value={this.state.gender} disabled={this.state.submitRequest} name="gender" onChange={this.handleInputChange} isValid={this.state.genderValid} isInvalid={this.state.genderInvalid}>
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </Form.Select>
                                                {this.state.genderInvalid && <div className="input-errors">{this.state.genderErr}</div>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4}>Friendliness</Col>
                                        <Col xs={8}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Select aria-label="Default"  value={this.state.friendliness} disabled={this.state.submitRequest} name="friendliness" onChange={this.handleInputChange} isValid={this.state.friendlinessValid} isInvalid={this.state.friendlinessInvalid}>
                                                    <option value="">Select Option</option>
                                                    <option value="friendly">Friendly</option>
                                                    <option value="not-friendly">Not Friendly</option>
                                                </Form.Select>
                                                {this.state.friendlinessInvalid && <div className="input-errors">{this.state.friendlinessErr}</div>}
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col  xs={6}>
                                    <Row>
                                        <Col xs={4}>Birthday *</Col>
                                        <Col xs={8}>
                                            <Form.Group  className="mb-3" controlId="formBasicEmail">
                                                <DayPickerInput className="day-picker"  disabled={this.state.submitRequest}  format={'MM/dd/yyyy'} value={this.state.birthdayFormated} formatDate={this.formatDate} parseDate={this.parseDate} onDayChange={day => this.changeDatePicker(day)} placeholder={`mm/dd/yyyy`} />
                                                {this.state.birthdayValid && <div className="input-success">Valid Date</div>}
                                                {this.state.birthdayInvalid && <div className="input-errors">{this.state.birthdayErr}</div>}
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={4}>Height (m) *</Col>
                                        <Col xs={8}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control placeholder="Enter value in Meters" value={this.state.height} disabled={this.state.submitRequest} name="height" onChange={this.handleInputChange} isValid={this.state.heightValid} isInvalid={this.state.heightInvalid} />
                                                {this.state.heightInvalid && <div className="input-errors">{this.state.heightErr}</div>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4}>Weight (kg) *</Col>
                                        <Col xs={8}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control placeholder="Enter value in Kilogram" value={this.state.weight} disabled={this.state.submitRequest} name="weight" onChange={this.handleInputChange} isValid={this.state.weightValid} isInvalid={this.state.weightInvalid}  />
                                                {this.state.weightInvalid && <div className="input-errors">{this.state.weighttErr}</div>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4}>Color</Col>
                                        <Col xs={8}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control placeholder="Enter color classification" value={this.state.color} disabled={this.state.submitRequest} name="color" onChange={this.handleInputChange} isValid={this.state.colorValid} isInvalid={this.state.colorInvalid} />
                                                {this.state.colorInvalid && <div className="input-errors">{this.state.colorErr}</div>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>

                    </Modal.Body>
                 
                    <div className="custom-modal-footer">
                        
                        <Row>
                            <Col xs={6}>
                                {this.state.successOutcome && <div class="success-msg">{this.state.successOutcomeMsg}</div>}
                                {this.state.failedOutcome && <div class="failed-msg">{this.state.failedOutcomeMsg}</div>}
                            </Col>
                            <Col align="right" xs={6}>
                                <Button variant="outline-secondary" className="modal-btn mr10" onClick={this.closeModal}>Close</Button>
                                <Button variant="primary" className="modal-btn" type="submit" disabled={!this.state.submitReady} onClick={this.submitAction}>
                                    {this.state.submitRequest ? <Spinner animation="border" size="sm" /> : (this.state.actionState == 'create') ? 'Create' : 'Update'}
                                </Button>
                            </Col>
                        </Row>
                    </div>
            </Modal>

            </>
        );
    }
}

export default App;