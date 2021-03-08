import React, { useState, useEffect } from "react";
import requireAuth from "../hoc/requireAuth";
import { Card, Button, Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { getStatistics, getSpecificStatistics, sync } from "../actions/data";
import { signout } from "../actions";
import TableContainer from "../Components/Table/container";
import SearchBar from "../Components/SearchBar/SearchBar";
const Main = (props) => {
  const [showing, setShowing] = useState({
    cont: "",
    data: null,
  });
  const [search, setSearch] = useState(false);
  useEffect(() => {
    if (!props.data) {
      props.getStatistics();
    } else if (showing.data) {
      if (showing.data !== props.data.data[showing.cont]) {
        setShowing({ ...showing, data: props.data.data[showing.cont] });
      }
    }
  }, [props.data, props.searchResults]);
  // render card component. response data from api is an object of arrays orgized by continent, so a list of continets has been hard coded 
  // in order to match to each object keys
  const renderCards = () => {
    const continents = [
      "Asia",
      "North-America",
      "South-America",
      "Europe",
      "Africa",
      "Oceania",
      "Others",
    ];
    if (props.data) {
      return continents.map((item) => {
        return (
          <Card key={item} style={{ width: "18rem", height: "18rem" }}>
            <Card.Body>
              <Card.Title>{item}</Card.Title>
              <Card.Text>
                {props.data
                  ? props.data.data[item].map((countries) => {
                    //among the data from each continents, the overview for each continent is also contained in the array, array.map is used 
                    //here in order to find the item that has the same entry for country and continent, and then return the overview data for the 
                    //continent
                      if(countries.country === item){
                        return (
                          <>
                          <div>Active Cases: {countries.cases.active}</div>
                          <div>Recovered Cases: {countries.cases.recovered}</div>

                          <div>Total Deaths: {countries.deaths.total}</div>
                          <div>Total Cases: {countries.cases.total}</div>
                          </>
                        )
                      };
                    })
                  : null}
                
              </Card.Text>
            {/* A button is set here in order to change the state to decide what data gets displayed to the TableContainer component */}
              <Button
                onClick={() => {
                  setShowing({
                    ...showing,
                    cont: item,
                    data: props.data.data[item],
                  });
                  setSearch(false);
                }}
              >
                Show
              </Button>
            </Card.Body>
          </Card>
        );
      });
    } else {
      return null;
    }
  };
  return (
    <>
      <Navbar className="navBar-color" expand="lg" variant="light">
        <Navbar.Brand href="#home">
          NicaSource Interview- Michael Jiang
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#1">
              <Button
                onClick={() => {
                  props.sync(() => {
                    props.getStatistics();
                  });
                }}
              >
                Sync
              </Button>
            </Nav.Link>
            <Nav.Link href="#2">
              <Button
                onClick={() => {
                  props.signout();
                }}
              >
                Sign Out
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="kjga-display-block ">
        {/* search component, takes 2 props, suggestions (a list of items that you would like the user to search) and 
        function to make the api call to the server in order to get the data of a specific country  */}
        <SearchBar
          suggestions={props.data ? props.data.data["country_list"] : []}
          search={(e) => {
            setSearch(true);
            props.getSpecificStatistics(e);
          }}
        />
        <Button
          onClick={() => {
            setSearch(false);
          }}
        >
          Done with Search
        </Button>
        <div className="row">{renderCards()}</div>
        <div className="row">
          {search ? (
            <TableContainer
              data={
                props.searchResults.data
                  ? {
                      cont: props.searchResults.data.continent,
                      data: [props.searchResults.data],
                    }
                  : { cont: "", data: null }
              }
            />
          ) : (
            <TableContainer data={showing} />
          )}
        </div>
      </div>
    </>
  );
};
function mapStateToProps({ data }) {
  return {
    data: data.statistics,
    searchResults: data.specific,
  };
}

export default requireAuth(
  connect(mapStateToProps, {
    getStatistics,
    getSpecificStatistics,
    sync,
    signout,
  })(Main)
);
