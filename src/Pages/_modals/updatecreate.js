import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Button, Modal, Form, Spinner } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import validation from './validation'

import { PET_SUBMIT_READY, PET_SUBMIT_REQUEST, PET_SUBMIT_SUCCEEDED, PET_SUBMIT_FAILED, PET_CONVERT_UPDATE } from './../../constant';

// services
import create_pet from '../../services/pet/create'
import update_pet from '../../services/pet/update'

import { clean_fields, clear_fields } from './../_modals/instance'

function PetModal(props) {

    const pet = useSelector((state) => state.pet)
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        ...clear_fields
    })

    // check each state to determine if the submission is allowed

    let createReadyState = () => {
  
        if(
            state.nameValid && 
                !state.nicknameInvalid && 
                    state.weightValid && 
                        state.heightValid && 
                            state.genderValid &&
                                !state.colorInvalid  && 
                                    !state.friendlinessInvalid && 
                                        state.birthdayValid){

            dispatch({ type: PET_SUBMIT_READY, ready: true });

        }else{

            dispatch({ type: PET_SUBMIT_READY, ready: false });
        }
    }

    let handleChange = (evt) => {

        let stateChange = validation(evt)

        setState({
            ...state,
            ...stateChange
        });
    }

    let changeDatePicker = (day) => {

        if(day === undefined){

            // if day is invalid, show error
            setState({
                ...state,
                birthdayValid: false,
                birthdayInvalid: true,
                birthdayErr: 'Invalid date'
            })
        }
    }

    let parseDate = (str, format, locale) => {

        const parsed = dateFnsParse(str, format, new Date(), { locale });

        if (DateUtils.isDate(parsed)) {
          return parsed;
        }
        return undefined;
    }
      
    let formatDate = (date, format, locale) => {
 
        let fmdate = dateFnsFormat(date, format, { locale });

        setState({
            ...state,
            birthdayFormated: fmdate,
            birthday : date.toISOString().split('T')[0],
            birthdayValid: true,
            birthdayInvalid: false,
        })
        
        return fmdate;
    }

    const request = () => ({
        type: PET_SUBMIT_REQUEST,
    });

    const succedded = (message) => ({
        type: PET_SUBMIT_SUCCEEDED,
        message: message,
    });

    const failed = (message) => ({
        type: PET_SUBMIT_FAILED,
        message: message,

    });

    let create_pet_request = async () => {

        try {

            dispatch(request());

            let response = await create_pet({
                name: state.name,
                nickname: state.nickname,
                weight: state.weight,
                height: state.height,
                gender: state.gender,
                color: state.color,
                friendliness: state.friendliness,
                birthday: state.birthday
            })
    
            if(response.status === 200){
    
                dispatch(succedded('Your data has been added successfully'));

                // execute success callback to refresh datagrid
                props.successCallback()

                dispatch({type: PET_CONVERT_UPDATE})
    
            }else{

                dispatch(failed(response.response.data.message));
            }

        } catch (error) {

            console.log(error)
            let err_message = "Something went wrong, Please try again later";

            if(error.response){
                err_message = error.response.data.message
            }

            dispatch(failed(err_message));
        }
    }

    let update_pet_request = async () => {

        try {

            dispatch(request());

            let response = await update_pet(pet.modify.currentID, {

                name: state.name,
                nickname: state.nickname,
                weight: state.weight,
                height: state.height,
                gender: state.gender,
                color: state.color,
                friendliness: state.friendliness,
                birthday: state.birthday
            })
    
            if(response.status === 200){
    
                dispatch(succedded('Your data has been updated successfully'));

                // execute success callback to refresh datagrid
                props.successCallback()
    
            }else{

                dispatch(failed(response.response.data.message));
            }

        } catch (error) {

            let err_message = "Something went wrong, Please try again later";

            if(error.response){
                err_message = error.response.data.message
            }

            dispatch(failed(err_message));

        }
    }

    let submitAction = () => {

        if(pet.modify.modifyType === "create"){
            create_pet_request()
        }else{
            update_pet_request();
        }
    }

    useEffect(() => {
        createReadyState()
    }, [state.name, state.nickname, state.gender, state.friendliness, state.birthday, state.height, state.weight, state.color]);

    // Execute when the modal is being open
    let initData = () => {

        if(pet.modify.modifyType === 'update'){

            setState({
                ...state,
                name: pet.modify.name,
                nickname: pet.modify.nickname,
                weight: pet.modify.weight,
                height: pet.modify.height,
                gender: pet.modify.gender,
                color: pet.modify.color,
                friendliness: pet.modify.friendliness,
                birthday: pet.modify.birthday,
                birthdayFormated: pet.modify.birthdayFormated,
                ...clean_fields
            })
        }
    }

    // Execute when the modal is being closed
    let clearData = () => {

        if(pet.modify.modifyType === 'update'){

            setState({
                ...clear_fields
            })
        }
    }

    return (

        <Modal
            show={props.open}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={props.closeModal}
            onExiting={clearData}
            onShow={initData}
            centered>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {(pet.modify.modifyType === 'create') ? 'Add New Kangaroo' : 'Edit Kangaroo'}
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
                                            <Form.Control required value={state.name} disabled={pet.modify.submitRequest} name="name" onChange={handleChange} placeholder="Enter the name" isValid={state.nameValid} isInvalid={state.nameInvalid}  />
                                            {state.nameInvalid && <div className="input-errors">{state.nameErr}</div>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={4}>Nickname</Col>
                                    <Col xs={8}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control value={state.nickname} disabled={pet.modify.submitRequest} name="nickname" onChange={handleChange} placeholder="Enter the nickname" isValid={state.nicknameValid} isInvalid={state.nicknameInvalid} />
                                            {state.nicknameInvalid && <div className="input-errors">{state.nicknameErr}</div>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={4}>Gender *</Col>
                                    <Col xs={8}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Select aria-label="Default" value={state.gender} disabled={pet.modify.submitRequest} name="gender" onChange={handleChange} isValid={state.genderValid} isInvalid={state.genderInvalid}>
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </Form.Select>
                                            {state.genderInvalid && <div className="input-errors">{state.genderErr}</div>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4}>Friendliness</Col>
                                    <Col xs={8}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Select aria-label="Default"  value={state.friendliness} disabled={pet.modify.submitRequest} name="friendliness" onChange={handleChange} isValid={state.friendlinessValid} isInvalid={state.friendlinessInvalid}>
                                                <option value="">Select Option</option>
                                                <option value="friendly">Friendly</option>
                                                <option value="not-friendly">Not Friendly</option>
                                            </Form.Select>
                                            {state.friendlinessInvalid && <div className="input-errors">{state.friendlinessErr}</div>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </Col>
                            <Col  xs={6}>
                                <Row>
                                    <Col xs={4}>Birthday *</Col>
                                    <Col xs={8}>
                                        <Form.Group  className="mb-3" controlId="formBasicEmail">
                                            <DayPickerInput className="day-picker"  disabled={pet.modify.submitRequest}  format={'MM/dd/yyyy'} value={state.birthdayFormated} formatDate={formatDate} parseDate={parseDate} onDayChange={day => changeDatePicker(day)} placeholder={`mm/dd/yyyy`} />
                                            {state.birthdayValid && <div className="input-success">Valid Date</div>}
                                            {state.birthdayInvalid && <div className="input-errors">{state.birthdayErr}</div>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={4}>Height (m) *</Col>
                                    <Col xs={8}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control placeholder="Enter value in Meters" value={state.height} disabled={pet.modify.submitRequest} name="height" onChange={handleChange} isValid={state.heightValid} isInvalid={state.heightInvalid} />
                                            {state.heightInvalid && <div className="input-errors">{state.heightErr}</div>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4}>Weight (kg) *</Col>
                                    <Col xs={8}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control placeholder="Enter value in Kilogram" value={state.weight} disabled={pet.modify.submitRequest} name="weight" onChange={handleChange} isValid={state.weightValid} isInvalid={state.weightInvalid}  />
                                            {state.weightInvalid && <div className="input-errors">{state.weighttErr}</div>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4}>Color</Col>
                                    <Col xs={8}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control placeholder="Enter color classification" value={state.color} disabled={pet.modify.submitRequest} name="color" onChange={handleChange} isValid={state.colorValid} isInvalid={state.colorInvalid} />
                                            {state.colorInvalid && <div className="input-errors">{state.colorErr}</div>}
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
                            {pet.modify.successOutcome && <div className="success-msg">{pet.modify.successOutcomeMsg}</div>}
                            {pet.modify.failedOutcome && <div className="failed-msg">{pet.modify.failedOutcomeMsg}</div>}
                        </Col>
                        <Col align="right" xs={6}>
                            <Button variant="outline-secondary" className="modal-btn mr10" onClick={props.closeModal}>Close</Button>
                            <Button variant="primary" className="modal-btn" type="submit" disabled={!pet.modify.submitReady} onClick={submitAction}>
                                {pet.modify.submitRequest ? <Spinner animation="border" size="sm" /> : (pet.modify.modifyType === 'create') ? 'Create' : 'Update'}
                            </Button>
                        </Col>
                    </Row>
                </div>
        </Modal>
    );
}

export default PetModal