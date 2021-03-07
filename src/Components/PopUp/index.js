import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import InputArea from "../../Components/InputArea";
import { connect } from "react-redux";
import { updateStatistics, getStatistics } from "../../actions/data";
const PopUp = (props) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState({
    cases: {
      new: props.item.cases["new"],
      active: props.item.cases["active"],
      critical: props.item.cases["critical"],
      recovered: props.item.cases["recovered"],
      "1M_pop": props.item.cases["1M_pop"],
      total: props.item.cases["total"],
    },
    deaths: {
      new: props.item.deaths["new"],
      "1M_pop": props.item.deaths["1M_pop"],
      total: props.item.deaths["total"],
    },
  });
  const [newCD, setNewCD] = useState({
    cases: 0,
    deaths: 0,
    recovered: 0,
  });
  const updateValues = (cases, deaths, recovered) => {
    let UpdatedDeath = props.item.deaths.total + deaths
    let UpdatedCases = props.item.cases.total + cases - recovered 
    let UpdatedRecovered = props.item.cases.recovered + recovered
    let UpdatedActive = props.item.cases.recovered + cases - recovered - deaths 
    setEdit({
      ...edit,
      cases: {
        ...edit.cases,
        total: UpdatedCases,
        active: UpdatedActive,
        recovered: UpdatedRecovered
      },
      deaths: {
          ...edit.deaths,
          total: UpdatedDeath
      }
    });

  }
  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          setShow(true);
        }}
      >
        Add
      </Button>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>{props.item.country}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputArea
              val_type="number"
              val={newCD.cases}
              label="Add New Cases"
              change={(e) => {
                updateValues(e.target.value, 0, 0)
                setNewCD({
                  ...newCD,
                  cases: e.target.value
                })
              }}
            />
            <InputArea
              val_type="number"
              val={newCD.deaths}
              label="Add New Deaths"
              change={(e) => {
                updateValues(0, e.target.value, 0)
                setNewCD({
                  ...newCD,
                  deaths: e.target.value
                })
              }}
            />
            <InputArea
              val_type="number"
              val={newCD.recovered}
              label="Add New Recovered Cases"
              change={(e) => {
                updateValues( 0, 0, e.target.value)
                setNewCD({
                  ...newCD,
                  recovered: e.target.value
                })
              }}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShow(false);
              }}
            >
              close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                console.log(edit);
                props.updateStatistics(
                  { country: props.item.country, data: edit },
                  () => {
                    props.getStatistics();

                    setShow(false);
                  }
                );
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default connect(null, { getStatistics, updateStatistics })(PopUp);
