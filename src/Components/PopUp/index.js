import React, {useState} from 'react'
import { Modal, Button } from "react-bootstrap"
import InputArea from "../../Components/InputArea"
import { connect } from "react-redux"
import { compose } from "redux"
import { updateStatistics, getStatistics } from "../../actions/data"
const PopUp = (props) => {
    const [show, setShow] = useState(false)
    const [edit, setEdit] = useState({
        "population": props.item.population,
        "cases": {
            "new": props.item.cases['new'],
            "active": props.item.cases["active"],
            "critical": props.item.cases['critical'],
            "recovered": props.item.cases['recovered'],
            "1M_pop": props.item.cases["1M_pop"],
            "total": props.item.cases["total"]
        },
        "deaths": {
            "new": props.item.deaths["new"],
            "1M_pop": props.item.deaths["1M_pop"],
            "total": props.item.deaths["total"],
        },
        "tests": {
            "1M_pop": props.item.tests["1M_pop"],
            "total": props.item.tests["total"],
        },
        "day": props.item.day,
        "time": props.item.time,
    })
    return (
        <>
        <Button variant="primary" onClick={()=> {setShow(true)}}>
              Peek
            </Button>
      
            <Modal
              show={show}
              onHide={()=> {setShow(false)}}
              backdrop="static"
              keyboard={false}
            >
            <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>{props.item.country}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <InputArea val_type = "number" val = {edit.population ? edit.population : "NaN"} label = "Population" change = {(e)=> {setEdit({...edit, population: e.target.value})}}/>
                <InputArea val_type = "number" val = {edit.cases.total ? edit.cases.total : "NaN"} label = "Total Cases" change = {(e)=> {setEdit({...edit, cases: {...edit.cases, total: e.target.value}})}}/>
                <InputArea val_type = "number" val = {edit.cases.active ? edit.cases.active : "NaN"} label = "Active Cases" change = {(e)=> {setEdit({...edit, cases: {...edit.cases, active: e.target.value}})}}/>
                <InputArea val_type = "number" val = {edit.cases.recovered ? edit.cases.recovered : "NaN"} label = "Recovered Cases" change = {(e)=> {setEdit({...edit, cases: {...edit.cases, recovered: e.target.value}})}}/>
                <InputArea val_type = "text" val = {edit.cases.new ? edit.cases.new : "NaN"} label = "New Cases" change = {(e)=> {setEdit({...edit, cases: {...edit.cases, new: e.target.value}})}}/>
                <InputArea val_type = "number" val = {edit.deaths.total ? edit.deaths.total : "NaN"} label = "Total Deaths" change = {(e)=> {setEdit({...edit, deaths: {...edit.deaths, total: e.target.value}})}}/>
                <InputArea val_type = "text" val = {edit.deaths.new ? edit.deaths.new : "NaN"} label = "New Deaths" change = {(e)=> {setEdit({...edit, deaths: {...edit.deaths, new: e.target.value}})}}/>
                <InputArea val_type = "number" val = {edit.tests.total ? edit.tests.total : "NaN"} label = "Total Tests" change = {(e)=> {setEdit({...edit, tests: {...edit.cases, total: e.target.value}})}}/>
                <InputArea val_type = "text" val = {edit.day ? edit.day : "NaN"} label = "Day" change = {(e)=> {setEdit({...edit, day: e.target.value})}}/>
                <InputArea val_type = "text" val = {edit.time ? edit.time : "NaN"} label = "Time" change = {(e)=> {setEdit({...edit, time: e.target.value})}}/>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={()=> {setShow(false)}}>close</Button>
                <Button variant="primary" onClick ={()=> {props.updateStatistics({country: props.item.country, data : edit}, ()=> {
                    props.getStatistics()
                    
                        setShow(false)
                    
                })}}>Save Changes</Button>
            </Modal.Footer>
            </Modal.Dialog>
            </Modal>
            </>
    )
}

export default connect(null, {getStatistics, updateStatistics})(PopUp)
