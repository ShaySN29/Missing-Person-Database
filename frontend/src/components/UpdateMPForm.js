import React from 'react';
import { Button, Form } from 'react-bootstrap';

// Function component returns the form to update the missing person selected
function UpdateMPForm({missingPersonToBeUpdated, handleNameChange, handleAgeChange, handleIdentifyingFeaturesChange, handleLastSeenChange, handleContactChange, handleUpdateMPSubmit}) {
  return (
    <div className='updateMPFormDiv mt-4'> 
            <Form className='contactPageForm mt-3'>
              <Form.Group className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="input"
                  id="mpName"
                  defaultValue={missingPersonToBeUpdated.name}
                  onChange={handleNameChange}
                />
              </Form.Group>
            
              <Form.Group className="mb-3">
                <Form.Label>Age:</Form.Label>
                <Form.Control
                  type="input"
                  id="mpAge"
                  defaultValue={missingPersonToBeUpdated.age}
                  onChange={handleAgeChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Identifying Features:</Form.Label>
                <Form.Control
                  type="input"
                  id="mpIdentifyingFeatures"
                  defaultValue={missingPersonToBeUpdated.identifyingFeatures}
                  onChange={handleIdentifyingFeaturesChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Seen:</Form.Label>
                <Form.Control
                  type="input"
                  id="mpLastSeen"
                  defaultValue={missingPersonToBeUpdated.lastSeen}
                  onChange={handleLastSeenChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact:</Form.Label>
                <Form.Control
                  type="input"
                  id="mpContact"
                  defaultValue={missingPersonToBeUpdated.contact}
                  onChange={handleContactChange}
                />
              </Form.Group>

              <Button variant="outline-dark" className="m-4" onClick={handleUpdateMPSubmit}>Update</Button>
            </Form>
          </div>
  )
};

export default UpdateMPForm;