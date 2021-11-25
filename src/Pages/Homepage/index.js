import React, { useEffect } from 'react';
import 'devextreme/data/odata/store';
import api_config from './../../config/api.endpoint'

//components
import Datatable from './../../components/datatable'

//services
import fetch_data_source from './../../services/pet/datasource'

//Modals
import UpdateCreateModal from './../_modals/updatecreate'

import 'whatwg-fetch';
import 'devextreme/dist/css/dx.light.css';
import 'react-day-picker/lib/style.css';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { PET_CREATE_OPEN, PET_MODAL_CLOSE, PET_UPDATE_OPEN } from './../../constant'

function Home() {

    const pet = useSelector((state) => state.pet)

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        actionState: '',
        showModal: false,
        state: []
    })

    // setup fields for datagrid
    const datafields = [
        {field: 'id', type: 'number'},
        {field: 'name', type: 'string'},
        {field: 'birthday', type: 'date'},
        {field: 'weight', type: 'number', caption: 'Weight (kg)'},
        {field: 'height', type: 'number', caption: 'Height (m)'},
        {field: 'friendliness', type: 'string'},
    ];

    let addNewRecord = () => {

        dispatch({ type: PET_CREATE_OPEN });
    }

    let closeModal = () => {

        dispatch({ type: PET_MODAL_CLOSE });
    }

    let fetchData = () => {

        // call fetch_data_source to request store
        let store = fetch_data_source({
            url: api_config.api_fetch_pet,
            key: 'id',
        })

        setState({
            ...state,
            dataStore: store,
        })
    }

    let clickTableRow = (event) => {

        if(event.data){

            let formattedDateArr = event.data.birthday.split("-");
            let formattedDate = formattedDateArr[1] + '/' +  formattedDateArr[2] + '/' +  formattedDateArr[0]

            //populate details when row is clicked
            dispatch({ 
                type: PET_UPDATE_OPEN,
                currentID: event.data.id,
                name: event.data.name,
                nickname: event.data.nickname,
                weight: event.data.weight,
                height: event.data.height,
                gender: event.data.gender,
                color: event.data.color,
                friendliness: event.data.friendliness,
                birthday: event.data.birthday,
                birthdayFormated: formattedDate,
            });
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (

        <Container>
            <Row className="mb20">
                <Col xs={6}>
                    <div className="main-title">Kangaroo Tracker</div>
                    <p>Click the record to see the details</p>
                </Col>
                <Col align="right" xs={6}>
                    <Button variant="outline-primary" className="chm-nav-button-pay" onClick={addNewRecord} vertical="true">
                        Add New
                    </Button>
                </Col>
            </Row>

            <Datatable source={state.dataStore} fields={datafields} dataClick={clickTableRow} />
            <UpdateCreateModal open={pet.modify.open} closeModal={closeModal} successCallback={fetchData} />
            
        </Container>

    );
    
}

export default Home;