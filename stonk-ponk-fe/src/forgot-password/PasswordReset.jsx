import React from 'react';
import Particles from 'react-particles-js';

import './style.css';

function PasswordReset() {
    return (
        <>
            <div id="password-reset-particle-container">
                <Particles 
                    width={"100%"}
                    height={"100%"}
                    params={{
                        "particles": {
                            "number": {
                                "value": 70
                            },
                            "size": {
                                "value": 3
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            }
                        }
                    }}
                />
            </div>
            <div id="password-reset-form">
                <h1 id="password-reset-title">Reset your password</h1>
                <form>
                    <label for="email">Enter your email below</label>
                    <input id="email" type="email" required/>
                    <input className="submit-button" type="submit" value="Submit"/>
                </form>
            </div>
        </>
    )
}

export default PasswordReset;