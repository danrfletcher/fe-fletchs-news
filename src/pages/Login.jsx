import { Header } from "../components/Header"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { FooterBar } from "../components/FooterBar";

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
                                <Form.Control type="email" placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            </Form>
                            <Button variant="primary" type="submit">Sign In</Button>
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