import {React, useEffect, useState} from 'react';
import LogoHeader from './LogoHeader';
import { Button, Navbar, Card, Form } from 'react-bootstrap';
import profile from "../images/profileImage.png";
// Importing Components
import AddMPForm from './AddMPForm';
import EditUserForm from './EditUserForm';
import UpdateMPForm from './UpdateMPForm';




/* Function below displays the list of missing persons to the admin and allows them to make changes to the list as well as make 
  changes to the users */
function AdminHomepage({ getMissingPersonsListFromDatabase, missingPersonList, logOut }) {

  const [addMpClicked, setAddMpClicked] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [identifyingFeatures, setIdentifyingFeatures] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [contact, setContact] = useState("");
  const [editUserClicked, setEditUserClicked] = useState(false);
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);
  const [editSingleUser, setEditSingleUser] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({});
  const [admin, setAdmin] = useState(false);
  const [updateMissingPersonClicked, setUpdateMissingPersonClicked] = useState(false);
  const [missingPersonToBeUpdated, setMissingPersonToBeUpdated] = useState({});
  const [mptoBeUpdatedName, setMpToBeUpdatedName] = useState(missingPersonToBeUpdated.name);
  const [mptoBeUpdatedAge, setMpToBeUpdatedAge] = useState(missingPersonToBeUpdated.age);
  const [mptoBeUpdatedIdentifyingFeatures, setMpToBeUpdatedIdentifyingFeatures] = useState(missingPersonToBeUpdated.identifyingFeatures);
  const [mptoBeUpdatedLastSeen, setMpToBeUpdatedLastSeen] = useState(missingPersonToBeUpdated.lastSeen);
  const [mptoBeUpdatedContact, setMpToBeUpdatedContact] = useState(missingPersonToBeUpdated.contact);


  // The missing person list is displayed when the page laods.
  useEffect(() => {
    getMissingPersonsListFromDatabase();
  }, []);

// function gets the list of users from the database
function getUserList() {
  fetch("/users/listusers", {
    method: "GET"
  })
    .then(res => res.json())
    .then(
      (result) => {
        setUserList(result);
      },
      (error) => {
        setError(error);
      }
  );
};
  // Function below deletes a missing person from the list when the button is clicked
  function deleteMissingPersonFromList(_id) {
    fetch("/mp/deletemp", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
    .then(res => res.json())
    .then(response => {
      alert('The Missing Person has been removed from the list', JSON.stringify(response))
      getMissingPersonsListFromDatabase()
    })
    .catch(error => console.log('Error:', error));
  };

  // Logout function is called when the logout button is clicked
  const handleLogout = () => {
    logOut();
  };

  // Sets addmpclicked to true to render the component to add a new missing person
  const handleAddMpClick = () => {
    setAddMpClicked(true);
  };

  // Sets addmpclicked to false thus rendering the homepage
  const handleHomeClick = () => {
    setAddMpClicked(false);
    setEditUserClicked(false);
  };

  // The onchange functions below either sets the values as the admin inputs them if the add new mp button is clicked or saves the info of the 
  // mp that was selected into state if the updateuser clicked
  const handleNameChange = (e) => {
    if (updateMissingPersonClicked) {
      setMpToBeUpdatedName(e.target.value);
    } else {
      setName(e.target.value);
    }
  };

  const handleAgeChange = (e) => {
    if (updateMissingPersonClicked) {
      setMpToBeUpdatedAge(e.target.value);
    } else {
      setAge(e.target.value);
    }
  };

  const handleIdentifyingFeaturesChange = (e) => {
    if (updateMissingPersonClicked) {
      setMpToBeUpdatedIdentifyingFeatures(e.target.value);
    } else {
      setIdentifyingFeatures(e.target.value);
    }
  };

  const handleLastSeenChange = (e) => {
    if (updateMissingPersonClicked) {
      setMpToBeUpdatedLastSeen(e.target.value);
    } else {
      setLastSeen(e.target.value);
    }
  };  

  const handleContactChange = (e) => {
    if (updateMissingPersonClicked) {
      setMpToBeUpdatedContact(e.target.value);
    } else {
      setContact(e.target.value);
    }
  }; 

  // function posts the body to the backend and then adds a new user to the database
  const handleSubmit = (e) => {
    fetch("/mp/addmp", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        age: age,
        identifyingFeatures: identifyingFeatures,
        lastSeen: lastSeen,
        contact: contact
      }),
    })
      .then(res => res.json())
      .then(response => {
        alert('The Missing Person Has Been Added To The Database!', JSON.stringify(response))
        handleHomeClick();
        getMissingPersonsListFromDatabase();
      })
      .catch(error => console.log('Error:', error));
  };

  
  const handleViewUsers = () => {
    setEditUserClicked(true);
    getUserList();
  }; 

  // Function below deletes a user from the database using the id
  function deleteUser(_id) {
    fetch("/user/deleteuser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
    .then(res => res.json())
    .then(response => {
      alert('The User has been removed', JSON.stringify(response))
      getUserList();
    })
    .catch(error => console.log('Error:', error));
  };

  // Sets the user's information into state
  function handleEditUser(user) {
    setEditSingleUser(true);
    setUserToUpdate(user);
  };

  // Function below sets the editsingleuser to false so the admin is returned to the user list
  const handleReturnToUserList = () => {
    setEditSingleUser(false)
  };

  // Function below sets the state of the admin if the form switch is checked or not
  const handleAdminChange = (e) => {
    setAdmin(e.target.checked)
  };

  // Function below updates the user information in the database
  const handleSubmitUserUpdate = () => {
    fetch("/users/updateuser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: userToUpdate._id,
        admin: admin,
      }),
    })
      .then(res => res.json())
      .then(response => {
        alert('The User Has Been Updated!', JSON.stringify(response))
        setEditSingleUser(false);
        getUserList();
      })
      .catch(error => console.log('Error:', error));
  };

  // Function below sets state of missing person {} and the updateMPclicked to true to render the update form
  function updateMissingPerson(missingPerson) {
    setUpdateMissingPersonClicked(true);
    setMissingPersonToBeUpdated(missingPerson);
  };

  const handleReturnToMPList = () => {
    setUpdateMissingPersonClicked(false);
    setMissingPersonToBeUpdated({});
  };

  // Function below updated the user in the database using the id of the user to be updated 
  const handleUpdateMPSubmit = () => {
    fetch("/mp/updatemp", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: missingPersonToBeUpdated._id,
        name: mptoBeUpdatedName,
        age: mptoBeUpdatedAge,
        identifyingFeatures: mptoBeUpdatedIdentifyingFeatures,
        lastSeen: mptoBeUpdatedLastSeen,
        contact: mptoBeUpdatedContact
      }),
    })
      .then(res => res.json())
      .then(response => {
        alert('The Missing Person Has Been Updated!', JSON.stringify(response))
        setUpdateMissingPersonClicked(false);
        getMissingPersonsListFromDatabase();
      })
      .catch(error => console.log('Error:', error));
  }

  /* The list of missing persons are rendered when the page loads. 
    If the admin clicks "Add New Missing Person" then the Add Missinf Person form is rendered
    If the "View Users" button is clicked then the User list is rendered. If the "Edit User" button is clicked then the Edit user form is rendered.
    If the user updates a mp, the form to update the mp is shown
  */
  if (addMpClicked) {
    return (
      <div className='pageStyle'>
        <div className='componentLogoHeader'>
          <LogoHeader />
        </div>

        <Navbar bg="light" expand="lg">
          <Button variant='outline-dark' className='ms-5' onClick={handleHomeClick}>Home</Button>
        </Navbar>

        <AddMPForm
          handleNameChange={handleNameChange}  
          handleAgeChange={handleAgeChange}
          handleIdentifyingFeaturesChange={handleIdentifyingFeaturesChange}
          handleLastSeenChange={handleLastSeenChange}
          handleContactChange={handleContactChange}
          handleSubmit={handleSubmit}
        />
      </div>
    )
  } else if (editUserClicked) {
    if (editSingleUser) {
      return (
        <div className='pageStyle'>
          <div className='componentLogoHeader'>
            <LogoHeader />
          </div>

          <Navbar bg="light" expand="lg">
            <Button variant='outline-dark' onClick={handleReturnToUserList}>Return To User List</Button>
          </Navbar>

          <EditUserForm
            userToUpdate={userToUpdate}
            admin={admin}
            handleAdminChange={handleAdminChange}
            handleSubmitUserUpdate={handleSubmitUserUpdate}
          />

        </div>
      )
    } else {
      return (
        <div className='pageStyle'>
          <div className='componentLogoHeader'>
            <LogoHeader />
          </div>
  
          <Navbar bg="light" expand="lg">
            <Button variant='outline-dark' onClick={handleHomeClick}>Home</Button>
          </Navbar>
  
          {userList.map(user => {
            return (
              <div className='individualCard'>
                <Card style={{ width: '18rem' }} key={user._id}>
                  <Card.Body className='userCardStyling'>
                    <Card.Title className='mb-3'>Username: {user.username}</Card.Title>
                    <Card.Subtitle className='mb-3'>Password: {user.password}</Card.Subtitle> 
                    <Card.Subtitle className='mb-3'>Admin Rights: {user.admin.toString()}</Card.Subtitle>
                  <Button variant="outline-dark" className='mb-3 ms-5' onClick={() => handleEditUser(user)}>Edit User</Button>
                  <Button variant="outline-dark" className='ms-5' onClick={() => deleteUser(user._id)}>Delete User</Button>
                  </Card.Body>
               </Card>
              </div>
            )
          })}
        </div>
      )
    }
  } else {
    if (updateMissingPersonClicked) {
      return (
        <div className='pageStyle'>
          <div className='componentLogoHeader'>
            <LogoHeader />
          </div>

          <Navbar bg="light" expand="lg">
            <Button variant='outline-dark' className='ms-5' onClick={handleReturnToMPList}>Return To Missing Person List</Button>
          </Navbar>

          <UpdateMPForm
            missingPersonToBeUpdated={missingPersonToBeUpdated}
            handleNameChange={handleNameChange}
            handleAgeChange={handleAgeChange}
            handleIdentifyingFeaturesChange={handleIdentifyingFeaturesChange}
            handleLastSeenChange={handleLastSeenChange}
            handleContactChange={handleContactChange}
            handleUpdateMPSubmit={handleUpdateMPSubmit}
          />
        </div>
      )
    } else {
      return (
        <div className='pageStyle'>
          <div className='componentLogoHeader'>
            <LogoHeader />
          </div>
    
          <Navbar bg="light" expand="lg">
            <Button variant='outline-dark' onClick={handleAddMpClick}>Add New Missing Person</Button>
            <Button variant='outline-dark' className='ms-2' onClick={handleViewUsers}>View Users</Button>
            <Button variant='outline-dark' className='ms-5' onClick={handleLogout}>Logout</Button>
          </Navbar>
        
          {/* Mapping over the missing person list passed from state to get the individual missing person to display in a card element */}
          {missingPersonList?.map(missingPerson => {
            return (
              <div className='individualCard'>
              <Card style={{ width: '18rem' }} key={missingPerson._id} className='mt-3' border='danger'>
                <Card.Img variant="top" src={profile}/>
                <Card.Body>
                  <Card.Title className='text-center'>{missingPerson.name}</Card.Title>
                  <Card.Subtitle><b>Age:</b> {missingPerson.age}</Card.Subtitle>
                  <Card.Text>
                    <b>Identifying Features:</b> {missingPerson.identifyingFeatures} <br/>
                    <b>Last Seen:</b> {missingPerson.lastSeen} <br />
                    <b>Contact:</b> {missingPerson.contact}
                  </Card.Text>
                  <Button variant="outline-dark" onClick={() => updateMissingPerson(missingPerson)}>Update</Button>
                  <Button variant="outline-dark" className='ms-5' onClick={() => deleteMissingPersonFromList(missingPerson._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
            )
          })}
        </div>
      )
    }
  } 
};

export default AdminHomepage;
