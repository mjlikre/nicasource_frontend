import React from "react";
import { Table } from "react-bootstrap";
export default function TableContainer(props) {
  return (
    <>
      <h3>{props.data.cont}</h3>
      <Table striped bordered>
        <thead className="thead-dark">
          <tr>
            <th className="paymentTable">Country</th>
            <th className="paymentTable">Population</th>
            <th className="paymentTable">Total Cases</th>
            <th className="paymentTable">Total Recovered</th>
            <th className="paymentTable">Deaths</th>
            <th className="paymentTable"></th>
          </tr>
        </thead>

        <tbody>
          {props.data.data
            ? props.data.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <th className="paymentTable">{item.country}</th>
                    <th className="paymentTable">{item.population}</th>
                    <th className="paymentTable">{item.cases.total}</th>
                    <th className="paymentTable">{item.cases.recovered}</th>
                    <th className="paymentTable">{item.deaths.total}</th>
                    <th className="paymentTable"></th>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </>
  );
}
