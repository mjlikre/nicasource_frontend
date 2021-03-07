import React, {useState} from 'react'
import { Modal } from "react-bootstrap"
import InputArea from "../../Components/InputArea"
const PopUp = (props) => {
    const [show, setShow] = useState(false)
    return (
        <>
        <Button variant="primary" onClick={this.handleShow}>
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
           
                
               
                
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={()=> {setShow(false)}}>close</Button>
                <Button variant="primary" onClick ={ ()=> {console.log("lol")}}>Save Changes</Button>
            </Modal.Footer>
            </Modal.Dialog>
            </Modal>
            </>
    )
}

export default PopUp
