import styled from 'styled-components';
import { List, Search } from 'react-bootstrap-icons'
import fletchsNewsImage from '../assets/fletchs-news-mini-white.png';

const Nav = styled.nav`
    background-color: #1b1d1c;
    color: #d1d2d2;
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    align-items: center;
    max-height: 50px;
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

export const NavBar = () => {
    return (
        <Nav>
           <LogoAndCategories>
                <Logo src={fletchsNewsImage} />
           </LogoAndCategories>
           <MenuIcons>
                <Search />
                <List />
           </MenuIcons>
        </Nav>
    )
}