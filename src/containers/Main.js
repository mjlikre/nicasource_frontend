import React, {useState, useEffect} from 'react'
import requireAuth from "../hoc/requireAuth"
import { Card, Button } from "react-bootstrap"
import { connect } from "react-redux";
import { getStatistics, getSpecificStatistics } from "../actions/data"
import TableContainer from "../Components/Table/container"
import SearchBar from "../Components/SearchBar/SearchBar"
const Main = (props) => {
    const [showing, setShowing] = useState({
        cont: "",
        data: null
    })
    const [search, setSearch] = useState(false)
    useEffect(()=> {
        if (!props.data){
            props.getStatistics()
        }
        else if (showing.data){
          if (showing.data !== props.data.data[showing.cont]){
            setShowing({...showing, data: props.data.data[showing.cont]})
          }
        }
        
    }, [props.data, props.searchResults])
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
          <SearchBar suggestions = {props.data? props.data.data["country_list"] : []} search = {(e) => {
            setSearch(true)
            props.getSpecificStatistics(e)
            }}/>
          <Button onClick = {() => {
            setSearch(false)
          }}>Done with Search</Button>
          <div className = "row">
              {renderCards()}
              
            </div>
            <div className = "row">
              {
                search ? 
                  <TableContainer data = {props.searchResults.data ? {cont: props.searchResults.data.continent, data:[props.searchResults.data]} : {cont: "", data:null} }/>
                  :
                  <TableContainer data = {showing}/>
              }
                

            </div>
        
      </div>
    )
}
function mapStateToProps({data}) {
    return {
      data: data.statistics,
      searchResults: data.specific
    };
  }

export default requireAuth(connect(mapStateToProps, {getStatistics, getSpecificStatistics})(Main))
