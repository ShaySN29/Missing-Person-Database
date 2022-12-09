import {React, useEffect, useState} from 'react';
import LogoHeader from './LogoHeader';
import { Button, Navbar, Form, Card } from 'react-bootstrap';
import profile from "../images/profileImage.png";


/* Function below displays the list of missing persons to the user and allows them to make contact with the admin */
function UserHomepage( {getMissingPersonsListFromDatabase, missingPersonList, logOut}) {

  const [contactButtonClicked, setContactButtonClicked] = useState(false);
  const [error, setError] = useState(null);

  // The missing persons list is retrieved from the database when the component renders
  useEffect(() => {
    getMissingPersonsListFromDatabase();
  }, []);

  // The state of contactButtonClicked is set to true so the contact page can render
  const handleContactButtonClick = () => {
    setContactButtonClicked(true);
  };

  // When the home button on the contact page is clicked the state of contactButtonClicked is set to false so the homepage renders
  const handleHomeButtonClick = () => {
    setContactButtonClicked(false);
  };

  // The logout function is called that will log the user out and the login page is rendered
  const handleLogout = () => {
    logOut();
  };

  // Alert when the user submits the contact form
  const handleSubmit = () => {
    alert("Your submissin has been sent. We will contact you shortly.")
  };

  // Conditional render if the user selects the contact us button or is on the homepage
  if (contactButtonClicked) {
    return (
      <div id="contactButtonDiv">
        <div className='componentLogoHeader'>
          <LogoHeader />
        </div>

        <Navbar bg="light" expand="lg">
          <Button variant='outline-dark' className='ms-5' onClick={handleHomeButtonClick}>Home</Button>
        </Navbar>

        <div className='contactFormDiv mt-4'>
          <h5>Contact us if you have any information or would like to add a missing person to the database</h5>
          <Form className='contactPageForm mt-3'>
            <Form.Group className="mb-3">
              <Form.Label>Contact Details</Form.Label>
              <Form.Control
                type="input"
                id="contactEmail"
                placeholder="Enter Your Email Address"
              />
            </Form.Group>
          
            <Form.Group className="mb-3">
              <Form.Label>Message:</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                id="contactText"
                placeholder="Enter Text here"
              />
            </Form.Group>
          
            <Button variant="outline-dark" className="centerItem m-4" onClick={handleSubmit}>Submit</Button>
          </Form>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='.pageStyle'>
        <div className='componentLogoHeader'>
          <LogoHeader />
      </div>
      
        <Navbar bg="light" expand="lg">
            <Button variant='outline-dark' className='ms-2' onClick={handleContactButtonClick}>Contact Us</Button>
            <Button variant='outline-dark' className='ms-5' onClick={handleLogout}>Logout</Button>
        </Navbar>

        {/* Mapping over the missing person list passed from state to get the individual missing person to display in a card element */}
        {missingPersonList?.map(missingPerson => {
          return (
            <div className='individualCard'>
            <Card style={{ width: '18rem' }} key={missingPerson._id} className='mt-3' border="danger">
              <Card.Img variant="top" src={profile} />
              <Card.Body>
                <Card.Title className='text-center'>{missingPerson.name}</Card.Title>
                <Card.Subtitle><b>Age:</b> {missingPerson.age}</Card.Subtitle>
                <Card.Text>
                  <b>Identifying Features:</b> {missingPerson.identifyingFeatures} <br />
                  <b>Last Seen:</b> {missingPerson.lastSeen} <br />
                  <b>Contact:</b> {missingPerson.contact}
                </Card.Text>
              </Card.Body>
              </Card>
              </div>
          )
        })}
      </div>
    )
  };
};

export default UserHomepage;
