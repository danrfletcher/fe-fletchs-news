import { Header } from "../components/Header"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { FooterBar } from "../components/FooterBar";
import { useEffect, useState } from "react";
import { useLoggedInUser } from "../contexts/LoggedInUser";
import { login } from "../utils/users-api";
import { useNavigate, useLocation } from 'react-router';
import { useNavigationHistory } from "../contexts/NavigationHistory";
import { device } from "../styles/media-queries";

const StyledMain = styled.main`
    position: absolute;
    height: 90vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    `
const FormWrap = styled.div`
    `
const StyledCard = styled(Card)`
min-width: 90vw;
max-width: 1000px;
    @media ${device.medium} {
        min-width: 80vw;
    }
    @media ${device.large} {
        min-width: 40vw;
    }
    @media ${device.xl} {
        min-width: 30vw;
    }
    `
const StyledFooter = styled.footer`
    position: absolute;
    top: 100%;
    transform: translateY(-10px);
    `
const BadLogin = styled(Card.Text)`
    color: #FF8080
    `

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {page} = useNavigationHistory();

    const {user, setUser} = useLoggedInUser();

    const [usernameEntered, setUsernameEntered] = useState(false);
    const [passwordEntered, setPasswordEntered] = useState(false);

    const [flagUsername, setFlagUsername] = useState(false);
    const [flagPassword, setFlagPassword] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            navigate('/')
        } 
    }, [user]);

    const handleSignIn = async (event) => {
        event.preventDefault();
        if (!usernameEntered) {
            setFlagUsername(true); 
        }
        if (!passwordEntered) {
            setFlagPassword(true)
        }
        else {
            try {
                const token = await login(username, password)

                await setUser({username: username, accessToken: token})
                if (token?.response?.status === 401) {
                    setFailedLogin(true)
                } else if (typeof token === 'string') {
                    await setUser({username: username, accessToken: token})
                    if (page.length > 1) {
                        navigate(-1)
                    } else {
                        navigate('/')
                    }
                } else {
                    const error = new Error('Login failed');
                    error.statusCode = token.response.status;
                    error.statusText = token.response.statusText;
                    throw error;
                }
            } catch (error) {
                navigate(`/error/${error.statusCode}`, { state: { statusText: error.statusText || 'Error occurred' }});
            }
        }
    }
    
    const updateUsername = (event) => {
        setUsername(event.target.value);
        if (event.target.value.length > 0) {
            setFlagUsername(false);
            setUsernameEntered(true);
        }
        else {
            setUsernameEntered(false)
        }
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
        if (event.target.value.length > 0) {
            setFlagPassword(false);
            setPasswordEntered(true);
        }
        else {
            setPasswordEntered(false)
        }
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
                                    value={password}
                                    onChange={updatePassword}
                                    id={flagPassword ? 'invalid-form' : null}
                                    />
                            </Form.Group>
                            </Form>
                            {failedLogin ? (
                            <BadLogin>
                                Username or password is incorrect.
                            </BadLogin>
                            ) : (null)}
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