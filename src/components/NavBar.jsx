import styled, { keyframes } from 'styled-components';
import { List, Search } from 'react-bootstrap-icons'
import fletchsNewsImage from '../assets/fletchs-news-mini-white.png';
import { useState, useEffect } from 'react';
import { useLoggedInUser } from '../contexts/LoggedInUser';
import { Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signOut } from '../utils/users-api';
import AvatarImage from '../assets/avatar-placeholder.svg'
import { device } from '../styles/media-queries';

const Nav = styled.nav`
    background-color: #1b1d1c;
    color: #d1d2d2;
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    align-items: center;
    `
const LogoAndCategories = styled.div``

const MenuIcons = styled.div`
    & > * {
        margin-left: 15px;
        height: 40px;
        font-size: 1.5rem
    }
    `
const Logo = styled.img`
    max-height: 40px;
    `
const slideInFromLeft = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
    `
const slideOutToLeft = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
`;
const MobileNavBar = styled.div`
    width: 70vw;
    height: 100vh;
    position: absolute;
    z-index: 3;
    background-color: #1f1f1f;
    top: 0;
    left: 0;
    animation: ${slideInFromLeft} 0.5s ease forwards;
    @media ${device.medium} {
        width: 50vw;
    }
    @media ${device.large} {
        width: 30vw;
    }
    @media ${device.xl} {
        width: 20vw;
    }
    @media ${device.xxl} {
        width: 10vw;
    }
    `
const MobileNavList = styled.ul`
    list-style-type: none;
    font-size: 2rem;
    margin-top: 20px;
    text-decoration: none;
    `
const StyledAvatarImage = styled(Image)`
    height: 2rem;
    width: 2rem;
    border: 1px solid lightgrey;
    ` 
const MiniUserProfile = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    `
const Username = styled.p`
    margin: 0;
    `

const navPages = [
    "Home",
    "Articles",
]

export const NavBar = () => {
    const [mobileClicked, setMobileClicked] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const {user, setUser} = useLoggedInUser();

    const handleSignOut = async () => {
        try {
            await signOut(user.accessToken)
            setUser({})
            setLoggedIn(false);
        } catch (err) {
            console.log("Something went wrong")
        }
    }

    return (
        <Nav>
           <Link to="/">
               <LogoAndCategories>
                    <Logo src={fletchsNewsImage} />
               </LogoAndCategories>
           </Link>
           <MenuIcons>
                <div onClick={() => {setMobileClicked(!mobileClicked)}}>
                    <List />
                </div>
           </MenuIcons>
           {mobileClicked ? (
            <MobileNavBar>
                <MobileNavList>
                    {navPages.map((navPage, index) => (
                        <li key={index}>{navPage}</li>
                    ))}
                    {Object.keys(user).length > 0 ? (
                        <li key={user.username}>
                            <MiniUserProfile>
                                <StyledAvatarImage src={user.avatar ? user.avatar : AvatarImage} roundedCircle />
                                <Username>&nbsp;&nbsp;{user.username}</Username>
                            </MiniUserProfile>
                            <Button variant="danger" onClick={handleSignOut}>Sign Out</Button>
                        </li>
                    ) : (
                    <Link to="/login">
                        <Button variant="primary">Sign In/Up</Button>
                    </Link>
                    )}
                </MobileNavList>
            </MobileNavBar>
           ) : (null)}
        </Nav>
    )
}