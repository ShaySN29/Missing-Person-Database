import React from 'react';
import { Button, Form } from 'react-bootstrap';

// Functional component returns the form to add a new missing person
function AddMPForm({handleNameChange, handleAgeChange, handleIdentifyingFeaturesChange, handleLastSeenChange, handleContactChange, handleSubmit  }) {
  return (
    <div className='addMPFormDiv mt-4'> 
    <Form className='contactPageForm mt-3'>
      <Form.Group className="mb-3">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="input"
          id="mpName"
          placeholder="Enter The Name of the Missing Person"
          onChange={handleNameChange}
        />
      </Form.Group>
    
      <Form.Group className="mb-3">
        <Form.Label>Age:</Form.Label>
        <Form.Control
          type="input"
          id="mpAge"
          placeholder="Enter the age of the Missing Person"
          onChange={handleAgeChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Identifying Features:</Form.Label>
        <Form.Control
          type="input"
          id="mpIdentifyingFeatures"
          placeholder="Enter any identifying features of the Missing Person"
          onChange={handleIdentifyingFeaturesChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Seen:</Form.Label>
        <Form.Control
          type="input"
          id="mpLastSeen"
          placeholder="Enter details about the last seen date and location of the Missing Person"
          onChange={handleLastSeenChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contact:</Form.Label>
        <Form.Control
          type="input"
          id="mpContact"
          placeholder="Enter contact details"
          onChange={handleContactChange}
        />
      </Form.Group>

      <Button variant="outline-dark" className="m-4" onClick={handleSubmit}>Submit</Button>
    </Form>
  </div>
  )
};

export default AddMPForm;