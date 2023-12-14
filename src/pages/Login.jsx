import { Header } from "../components/Header"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { FooterBar } from "../components/FooterBar";
import { useEffect, useState } from "react";

const StyledMain = styled.main`
    position: absolute;
    height: 90vh;
    width: 100vw;
    `
const FormWrap = styled.div`
    `
const StyledCard = styled(Card)`
    margin: 20px;
    top: 50%;
    transform: translateY(-50%);
    `
const StyledFooter = styled.footer`
    position: absolute;
    top: 100%;
    transform: translateY(-10px);
    `

export const Login = () => {
    const [usernameEntered, setUsernameEntered] = useState(false);
    const [passwordEntered, setPasswordEntered] = useState(false);
    const [flagUsername, setFlagUsername] = useState(false);
    const [flagPassword, setFlagPassword] = useState(false);
    const [username, setUsername] = useState("");
    
    const regex = /.+/
    const handleSignIn = (event) => {
        event.preventDefault();
        if (!usernameEntered) {
            setFlagUsername(true);
        } if (!passwordEntered) {
            setFlagPassword(true)
        } else {
            setPasswordEntered()
        }
    }
    
    const updateUsername = (event) => {
        setUsername(event.target.value);
        if (event.target.value.length > 0) {
            setFlagUsername(false);
            setUsernameEntered(true)
        }
        else {
            setUsernameEntered(false)
        }
    }

    const updatePasswordEntered = (event) => {
        if (event.target.value.length > 0) {
            setFlagPassword(false)
            setPasswordEntered(true)
        } else {
            setPasswordEntered(false);
        };
    }

    return (
        <>
            <Header />
            <FormWrap>
                <StyledMain>
                    <StyledCard>
                        <Card.Header>
                            <Nav variant="pills" defaultActiveKey="#first">
                            <Nav.Item>
                                <Nav.Link href="#first">Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#link">Sign Up</Nav.Link>
                            </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    id={flagUsername ? 'invalid-form' : null}
                                    type="text" 
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={updateUsername}
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password" 
                                    placeholder="Password"
                                    onChange={updatePasswordEntered}
                                    id={flagPassword ? 'invalid-form' : null}
                                    />
                            </Form.Group>
                            </Form>
                            <Button onClick={handleSignIn} variant="primary" type="submit">Sign In</Button>
                        </Card.Body>
                    </StyledCard>
                </StyledMain>
            </FormWrap>
            <StyledFooter>
                <FooterBar />
            </StyledFooter>
        </>
    )
}