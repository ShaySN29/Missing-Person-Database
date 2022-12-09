import React from 'react';
import { Button, Navbar, Card, Form } from 'react-bootstrap';

// Function below returns the form for the user admin to be changed
function EditUserForm({userToUpdate, handleAdminChange, handleSubmitUserUpdate, admin }) {
    return (
        <div className='editUserForm'>
        <Form className='contactPageForm mt-3'>
          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="input"
              id="username"
              disabled
              defaultValue={userToUpdate.username}
            />
          </Form.Group>
      
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="input"
              id="password"
              disabled
              defaultValue={userToUpdate.password}
            />
          </Form.Group>

          <Form.Check 
            type="switch"
            id="custom-switch"
            label="Admin Rights"
            defaultChecked={admin}
            onChange={handleAdminChange}
          />

          <Button variant="outline-dark" className="m-4" onClick={handleSubmitUserUpdate}>Submit</Button>
        </Form>
      </div>
  )
};

export default EditUserForm;