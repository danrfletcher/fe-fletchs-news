import { useState, useEffect, useRef } from 'react'
import { Image, Button } from 'react-bootstrap';
import AvatarImage from '../assets/avatar-placeholder.svg'
import styled from 'styled-components';

const StyledAvatarImage = styled(Image)`
    height: 2rem;
    width: 2rem;
    border: 1px solid lightgrey;
    ` 
const FormWrap = styled.form`
    position: relative;
    width: 100vw;
    margin-right: 10px;
    line-height: 22px;
    `
const CommentInput = styled.input`
    width: 100%;
    border: 0;
    outline: 0;
    margin-left: 10px;
    border-bottom: 2px solid #d3d3d3;
    color: #111;
    &:focus~label {
        font-size: 0.75rem;
        top: -24px;
    }
    `
const FormLabel = styled.label`
    position: absolute;
    margin-left: 10px;
    top: 0;
    left: 0;
    color: #d3d3d3;
    transition: 0.2s all;
    cursor: text;
    }
    `
const CommentBox = styled.section`
    display: flex;
    margin: 35px 10px 35px 10px
    `
const CommentControls = styled.div`
    display: flex;
    width: 100%;
    justify-content: right;
    & > ${Button}:first-child {
        margin-right: 10px;
    }
    & > ${Button} * {
        margin-top: 5px;
    }
    & > ${Button}:last-child {
        margin-right: -10px;
    }
    `

export const PostComment = () => {
    //State variables
    const [input, setInput] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [formFocus, setFormFocus] = useState(false);
    const [valid, setValid] = useState(false);
    const formRef = useRef();

    //Form validation regex
    const regex = /[\w\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{1,}/i;

    //Update state when form is/is not in focus
    const handleFocus = () => {
        setFormFocus(true)
    };
    const handleBlur = () => {
        setInput("")
        setValid(false)
        setFormFocus(false)
    };

    //Update state when form is valid/invalid
    useEffect(() => {
        const uIElement = formRef.current
        if (regex.test(input)) {
            setValid(true)
        }
        if (input === "") setValid(false)
    }, [input])

    const updateInput = (event) => {
        setInput(event.target.value);
        if (!valid) setValid(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //Optimistic render
        setInput("");
        //API call
    };
    
    return (
        <CommentBox>
            <StyledAvatarImage src={AvatarImage} roundedCircle />
            <FormWrap onFocus={handleFocus} onBlur={handleBlur}>
                <CommentInput
                    type="text" id="comment" 
                    onChange={updateInput} 
                    required  
                    value={input}
                    pattern={regex}
                />
                <FormLabel htmlFor="comment">Add a comment...</FormLabel>
                {formFocus ? (
                <CommentControls>
                    {valid ? (<Button variant="success">Comment</Button>) : null}
                    <Button variant="danger">Cancel</Button>
                </CommentControls>
            ) : null}
            </FormWrap>
        </CommentBox>
    )
}