import React, {useState, useEffect} from 'react'
import requireAuth from "../hoc/requireAuth"
import { Card, Button } from "react-bootstrap"
import { connect } from "react-redux";
import { getStatistics } from "../actions/data"
import TableContainer from "../Components/Table/container"
const Main = (props) => {
    const [showing, setShowing] = useState({
        cont: "",
        data: null
    })
    useEffect(()=> {
        if (!props.data){
            props.getStatistics()
        }
        else if (showing.data){
          if (showing.data !== props.data.data[showing.cont]){
            setShowing({...showing, data: props.data.data[showing.cont]})
          }
        }
        
    }, [props.data])
    const renderCards = () => {
        const continents = ["Asia", "North-America", "South-America", "Europe", "Africa", "Oceania", "Others"]
        return continents.map((item)=> {
            return (
                <Card style={{ width: '18rem', height: "12rem"}}>
              
                <Card.Body>
                  <Card.Title>{item}</Card.Title>
                  
                  <Button onClick = {()=> {setShowing({...showing, cont: item, data: props.data.data[item]})}}>
                      Show
                  </Button>
                </Card.Body>
              </Card>
            )
        })
    }
    return (
        <div className= "kjga-display-block ">
          <div className = "row">
              {renderCards()}
              
            </div>
            <div className = "row">
                <TableContainer data = {showing}/>

            </div>
        
      </div>
    )
}
function mapStateToProps({data}) {
    return {
      data: data.statistics,
    };
  }

export default requireAuth(connect(mapStateToProps, {getStatistics})(Main))
