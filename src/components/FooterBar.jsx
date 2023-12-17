import footerBar from '../assets/footer-bar.svg'
import styled from 'styled-components'


const FooterWrap = styled.div`
    display: flex;
    width: 100vw;
    & > div {
        width: 12.5vw;
        height: 10px;
    }
    `
const Block1 = styled.div`
    background-color: #FF8080
    `
const Block2 = styled.div`
    background-color: #FF6699
    `
const Block3 = styled.div`
    background-color: #FFCC80
    `
const Block4 = styled.div`
    background-color: #FFE680
    `
const Block5 = styled.div`
    background-color: #80FF80
    `
const Block6 = styled.div`
    background-color: #80FFFF
    `
const Block7 = styled.div`
    background-color: #80CCFF
    `
const Block8 = styled.div`
    background-color: #B380FF
    `

export const FooterBar = () => {
    return (
        <FooterWrap>
            <Block1 className="footer-block"></Block1>
            <Block2></Block2>
            <Block3></Block3>
            <Block4></Block4>
            <Block5></Block5>
            <Block6></Block6>
            <Block7></Block7>
            <Block8></Block8>
        </FooterWrap>
    )
}