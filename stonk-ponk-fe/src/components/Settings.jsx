import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, SettingsLabel } from '../css/Form';
import { FlexRowLeftDiv, FlexColumnLeftDiv, PageContainer, LineDivider, SettingRowDiv, SettingEditRowDiv } from '../css/Div';
import Navigation from './Navigation';
import { EditButton } from '../css/Button';
import { ProfilePhoto } from '../css/Image';
import profile from '../images/blobfish.png';
import { settings } from '../services/settings';
import { PageTitle } from '../css/Text';

const Settings = () => {

    const history = useHistory();

    // initialise variables
    // change this to get from backend
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [pass, setPass] = useState('hellothisisBobTheBlobf1sh!');

    const [nameDisabled, setNameDisabled] = useState(true);
    const [credentialsDisabled, setCredentialsDisabled] = useState(true);

    useEffect(() => {
        settings.getUser()
            .then(response => response.json())
            .then(json => {
                setFirstName(json.first_name);
                setLastName(json.last_name);
                setEmailAdd(json.email);
            })
            .catch((error) => {
                Promise.resolve(error)
                    .then((error) => {
                        alert(`${error.status} ${error.statusText}`);
                    });
            })
    }, []);

    const EditName = () => {
        setNameDisabled(true);
        settings.changeName(firstName, lastName);
    }

    const EditLoginCredentials = () => {
        setCredentialsDisabled(true);
        settings.changeLoginCredentials(emailAdd, pass, pass).then(() => {
            alert("You changed your login credentials! Please relog, logging out...");
            setTimeout(() => {
                localStorage.removeItem('token');
                history.push('/');
            }, 3000);
        }).catch((error) => {
            Promise.resolve(error)
                .then((e) => {
                    alert(`${e.status} ${e.statusText}`);
                });
        });
    }

    return (
        <div>
            <Navigation settings="true" />
            <PageContainer>
                <PageTitle>Account Settings</PageTitle>
                <FlexRowLeftDiv>
                    <ProfilePhoto src={profile} alt="Your profile picture" style={{ width: "10%", height: "10%", marginRight: "40px" }} />
                    <SettingRowDiv style={{ width: "20%" }}>
                        <FlexColumnLeftDiv style={{ width: "30%", fontWeight: "bold" }}>
                            <SettingsLabel htmlFor="firstName">First Name</SettingsLabel>
                            <SettingsLabel htmlFor="lastName">Last Name</SettingsLabel>
                        </FlexColumnLeftDiv>
                        <FlexColumnLeftDiv >
                            <TextField type="text" id="firstName" value={firstName} disabled={nameDisabled} onChange={(e) => setFirstName(e.target.value)} />
                            <TextField type="text" id="lastName" value={lastName} disabled={nameDisabled} onChange={(e) => setLastName(e.target.value)} />
                        </FlexColumnLeftDiv>
                    </SettingRowDiv>
                    <SettingRowDiv style={{ width: "20%" }}>
                        <FlexColumnLeftDiv style={{ width: "30%", fontWeight: "bold" }}>
                            <SettingsLabel htmlFor="emailAdd">Email</SettingsLabel>
                            <SettingsLabel htmlFor="pass">Password</SettingsLabel>
                        </FlexColumnLeftDiv>
                        <FlexColumnLeftDiv>
                            <TextField type="text" id="emailAdd" value={emailAdd} disabled={credentialsDisabled} onChange={(e) => setEmailAdd(e.target.value)} />
                            <TextField type="password" id="pass" value={pass} disabled={credentialsDisabled} onChange={(e) => setPass(e.target.value)} />
                        </FlexColumnLeftDiv>
                    </SettingRowDiv>
                    <FlexColumnLeftDiv>
                        {nameDisabled ?
                            <EditButton aria-label="Edit Name Button" onClick={() => setNameDisabled(false)}>Edit Name</EditButton>
                            :
                            <SettingEditRowDiv>
                                <EditButton aria-label="Save changes to names button" onClick={EditName}>Save</EditButton>
                                <EditButton aria-label="Cancel changes to names button" onClick={() => setNameDisabled(true)}>Cancel</EditButton>
                            </SettingEditRowDiv>
                        }
                        {credentialsDisabled ?
                            <EditButton aria-label="Edit Login Credentials Button" onClick={() => setCredentialsDisabled(false)}>Edit Login Credentials</EditButton>
                            :
                            <SettingEditRowDiv>
                                <EditButton aria-label="Save changes to credentials button" onClick={EditLoginCredentials}>Save</EditButton>
                                <EditButton aria-label="Cancel changes to credentials button" onClick={() => setCredentialsDisabled(true)}>Cancel</EditButton>
                            </SettingEditRowDiv>
                        }
                    </FlexColumnLeftDiv>
                </FlexRowLeftDiv>
                <LineDivider />
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
            </PageContainer>
        </div>
    );
};

export default Settings;