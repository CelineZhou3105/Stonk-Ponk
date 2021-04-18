import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, SettingsLabel, SettingsModalLabel } from '../css/Form';
import { FlexRowLeftDiv, FlexColumnLeftDiv, PageContainer, LineDivider, SettingRowDiv, SettingEditRowDiv, SettingFieldDiv, ModalContainer, ModalContent, SettingModalDiv, FlexColumnCenterDiv } from '../css/Div';
import Navigation from './Navigation';
import { EditButton, SaveButton, CancelButton, CloseButton } from '../css/Button';
import { ProfilePhoto } from '../css/Image';
import profile from '../images/blobfish.png';
import { PageTitle } from '../css/Text';
import { checkPassword } from '../helpers/helpers';
import { settings } from '../services/settings';
import Alert from '@material-ui/lab/Alert';

const Settings = () => {

    const history = useHistory();

    // initialise variables
    // change this to get from backend
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [passNew, setPassNew] = useState('');
    const [passOld, setPassOld] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

    const [oldFirstName, setOldFirstName] = useState('');
    const [oldLastName, setOldLastName] = useState('');
    const [oldEmail, setOldEmail] = useState('');

    const [nameDisabled, setNameDisabled] = useState(true);
    const [emailDisabled, setEmailDisabled] = useState(true);
    const [modalDisabled, setModalDisabled] = useState(true);

    // Tracks when errors occurs - for showing error banners to the user
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Upon successful change of credentials - for showing success banner to user
    const [success, setSuccess] = useState(false);

    // Handle errors when they are returned by the fetch calls
    const handleError = useCallback((error) => {
        setError(true);
        if (error === "Expired token") {
            setErrorMsg("Your session has expired. Logging out...");
            setTimeout(() => {
                localStorage.removeItem('token');
                history.push('/');
            }, 3000);
        } else {
            setErrorMsg(error);
        }
    }, [history]);

    useEffect(() => {
        settings.getUser()
            .then(response => response.json())
            .then(json => {
                setFirstName(json.first_name);
                setLastName(json.last_name);
                setEmailAdd(json.email);
            })
            .catch((error) => {
                handleError(error);
            })
    }, [handleError]);

    const EditName = () => {
        setNameDisabled(true);
        setOldFirstName(firstName);
        setOldLastName(lastName);
        settings.changeName(firstName, lastName);
    }

    const EditEmail = () => {
        setEmailDisabled(true);
        setOldEmail(emailAdd);
        settings.changeEmail(emailAdd).then(() => {
            setSuccess(true);
            setTimeout(() => {
                localStorage.removeItem('token');
                history.push('/');
            }, 3000);
        }).catch((error) => {
            handleError(error);
        });
    }

    const ChangePassword = () => {
        if (checkPassword(passNew, passConfirm)) {
            settings.changePassword(passNew, passOld).then(() => {
                alert("You changed your login credentials! Please relog, logging out in 3 seconds...");
                setTimeout(() => {
                    localStorage.removeItem('token');
                    history.push('/');
                }, 3000);
            }).catch((error) => {
                Promise.resolve(error)
                    .then((e) => {
                        if (e.status === 403) {
                            alert(`Old password incorrect. Please re-enter your password.`);
                        } else {
                            alert(`${e.status} ${e.statusText}`);
                        }
                    });
            });
        }
    }

    const CancelName = () => {
        setFirstName(oldFirstName);
        setLastName(oldLastName);
        setNameDisabled(true);
    }

    const CancelEmail = () => {
        setEmailAdd(oldEmail);
        setEmailDisabled(true);
    }
    return (
        <div>
            <Navigation settings="true" />
            {success && (
                <Alert variant="filled" severity="success">
                    You changed your login credentials! Please log in again. Logging out...
                </Alert>
            )}
            {error && (
                <Alert variant="filled" severity="error">
                    {errorMsg}
                </Alert>
            )}
            <PageContainer>
                <PageTitle>Account Settings</PageTitle>
                <FlexRowLeftDiv>
                    <ProfilePhoto src={profile} alt="Your profile picture" style={{ width: "13%", height: "10%" }} />
                    <FlexColumnLeftDiv>
                        <SettingRowDiv style={{ width: "40%", height: "80px", fontWeight: "bold" }}>
                            <SettingFieldDiv>
                                <SettingsLabel htmlFor="firstName">First Name</SettingsLabel>
                                <TextField type="text" id="firstName" value={firstName} disabled={nameDisabled} onChange={(e) => setFirstName(e.target.value)} />
                            </SettingFieldDiv>
                            <SettingFieldDiv>
                                <SettingsLabel htmlFor="lastName">Last Name</SettingsLabel>
                                <TextField type="text" id="lastName" value={lastName} disabled={nameDisabled} onChange={(e) => setLastName(e.target.value)} />
                            </SettingFieldDiv>
                            <SettingFieldDiv>
                                {nameDisabled ?
                                    <EditButton aria-label="Edit Name Button" onClick={() => setNameDisabled(false)}>Edit Name</EditButton>
                                    :
                                    <SettingEditRowDiv>
                                        <SaveButton aria-label="Save changes to names button" onClick={EditName}>Save</SaveButton>
                                        <CancelButton aria-label="Cancel changes to names button" onClick={CancelName}>Cancel</CancelButton>
                                    </SettingEditRowDiv>
                                }
                            </SettingFieldDiv>

                        </SettingRowDiv>
                        <SettingRowDiv style={{ width: "26%", height: "80px", fontWeight: "bold" }}>
                            <SettingFieldDiv>
                                <SettingsLabel htmlFor="emailAdd">Email</SettingsLabel>
                                <TextField type="text" id="emailAdd" value={emailAdd} disabled={emailDisabled} onChange={(e) => setEmailAdd(e.target.value)} />
                            </SettingFieldDiv>
                            <SettingFieldDiv>
                                {emailDisabled ?
                                    <EditButton aria-label="Edit Email Button" onClick={() => setEmailDisabled(false)}>Edit Email</EditButton>
                                    :
                                    <SettingEditRowDiv>
                                        <SaveButton aria-label="Save changes to Email button" onClick={EditEmail}>Save</SaveButton>
                                        <CancelButton aria-label="Cancel changes to Email button" onClick={CancelEmail}>Cancel</CancelButton>
                                    </SettingEditRowDiv>
                                }
                            </SettingFieldDiv>
                        </SettingRowDiv>
                        <SettingRowDiv>
                            <EditButton aria-label="Edit password Button" onClick={() => setModalDisabled(false)}>Edit Password</EditButton>
                        </SettingRowDiv>
                        {!modalDisabled &&
                            <ModalContainer>
                                <ModalContent>
                                    <CloseButton onClick={() => setModalDisabled(true)}>&times;</CloseButton>
                                    <FlexColumnCenterDiv>
                                        <SettingModalDiv>
                                            <SettingsModalLabel htmlFor="passOld">Old Password</SettingsModalLabel>
                                            <TextField type="password" id="passOld" value={passOld} required onChange={(e) => setPassOld(e.target.value)}></TextField>
                                            <SettingsModalLabel htmlFor="passNew">New Password</SettingsModalLabel>
                                            <TextField type="password" id="passNew" value={passNew} required onChange={(e) => setPassNew(e.target.value)}></TextField>
                                            <SettingsModalLabel htmlFor="passConfirm">Confirm Password</SettingsModalLabel>
                                            <TextField type="password" id="passConfirm" value={passConfirm} required onChange={(e) => setPassConfirm(e.target.value)}></TextField>
                                        </SettingModalDiv>
                                        <EditButton aria-label="Save password button" onClick={ChangePassword} style={{ marginTop: "8%" }}>Save Password</EditButton>
                                    </FlexColumnCenterDiv>
                                </ModalContent>
                            </ModalContainer>
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