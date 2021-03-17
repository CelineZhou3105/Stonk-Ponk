import React, { useState } from 'react';
import { TextField, SettingsLabel } from '../css/Form';
import { FlexRowLeftDiv, FlexColumnLeftDiv, LongLineDivider } from '../css/Div';
import Navigation from './Navigation';
import { EditButton } from '../css/Button';
import { ProfilePhoto } from '../css/Image';
import profile from '../images/blobfish.png';
import { changeDetails } from '../services/changeDetails';

const Settings = () => {

    // initialise variables
    const [firstName, setFirstName] = useState('Bobfish');
    const [lastName, setLastName] = useState('The Blobfish');
    const [emailAdd, setEmailAdd] = useState('ayowassup@itsurgirl.com');
    const [pass, setPass] = useState('hellothisisBobTheBlobf1sh!');

    const EditFirstName = () => {
        console.log("Edit first name!");
        if (changeDetails.changeFirstName(firstName)) {
            alert("You changed your first name!");
        }
    }

    const EditLastName = () => {
        console.log("Edit last name!");
        if (changeDetails.changeLastName(lastName)) {
            alert("You changed your last name!");
        }
    }

    const EditEmail = () => {
        console.log("Edit email!");
        changeDetails.changeEmail(emailAdd);
    }

    const ChangePassword = () => {
        console.log("Change password!");
        changeDetails.changePassword(pass);
    }


    return (
        <div>
            <Navigation />
            <main>
                <h1>Account Settings</h1>
                <FlexRowLeftDiv>
                    <ProfilePhoto src={profile} alt="Your profile picture" />
                    <FlexColumnLeftDiv>
                        <SettingsLabel htmlFor="firstName">First Name</SettingsLabel>
                        <SettingsLabel htmlFor="lastName">Last Name</SettingsLabel>
                        <SettingsLabel htmlFor="emailAdd">Email</SettingsLabel>
                        <SettingsLabel htmlFor="pass">Password</SettingsLabel>
                    </FlexColumnLeftDiv>
                    <FlexColumnLeftDiv>
                        <TextField type="text" id="firstName" value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
                        <TextField type="text" id="lastName" value={lastName} required onChange={(e) => setLastName(e.target.value)} />
                        <TextField type="text" id="emailAdd" value={emailAdd} required onChange={(e) => setEmailAdd(e.target.value)} />
                        <TextField type="password" id="pass" value={pass} required onChange={(e) => setPass(e.target.value)} />
                    </FlexColumnLeftDiv>
                    <FlexColumnLeftDiv>
                        <EditButton aria-label="Edit First Name Button" onClick={EditFirstName}>Edit</EditButton>
                        <EditButton aria-label="Edit Last Name Button" onClick={EditLastName}>Edit</EditButton>
                        <EditButton aria-label="Edit Email Button" onClick={EditEmail}>Edit</EditButton>
                        <EditButton aria-label="Change Password Button" onClick={ChangePassword}>Change Password</EditButton>
                    </FlexColumnLeftDiv>
                </FlexRowLeftDiv>
                <LongLineDivider />
                <FlexRowLeftDiv>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider" />
                    </label>
                    <FlexColumnLeftDiv>
                        <h3>Suggestions</h3>
                        <p>These are suggestions on how to improve your portfolio over time.</p>
                        <p>Depending on the composition of your portfolio and earnings, we will give you suggestions on your next investment move.</p>
                    </FlexColumnLeftDiv>
                </FlexRowLeftDiv>
            </main>
        </div>
    );
};

export default Settings;