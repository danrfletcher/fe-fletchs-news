import { useState, useEffect, useRef } from 'react'
import { Image, Button } from 'react-bootstrap';
import AvatarImage from '../assets/avatar-placeholder.svg'
import styled from 'styled-components';
import { useLoggedInUser } from '../contexts/LoggedInUser';
import { useFocusedComments } from '../contexts/FocusedComments';
import { useNavigate } from 'react-router';

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
const FormLabel = styled(({userInput, ...restOfProps}) => (<label {...restOfProps} />))`
    position: absolute;
    margin-left: 10px;
    top: 0;
    left: 0;
    color: #d3d3d3;
    transition: 0.2s all;
    cursor: text;
    font-size: ${(props) => (props.userInput ? '0.75rem' : null)};
    top: ${(props) => (props.userInput ? '-24px' : null)};
    }
    `
const CommentBox = styled.section`
    display: flex;
    margin: 35px 10px 35px 10px
    `
const StyledButton = styled(Button)`
    `
const CommentControls = styled.div`
    display: flex;
    width: 100%;
    justify-content: right;
    margin-top: 5px;
    & > ${StyledButton}:first-child {
        margin-right: 10px;
    }
    & > ${StyledButton} * {
        margin-top: 5px;
    }
    & > ${StyledButton}:last-child {
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
    const {comments, setComments} = useFocusedComments();
    const {user} = useLoggedInUser();
    const navigate = useNavigate();

    //Form validation regex
    const regex = /[\w\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{1,}/i;

    //Update state when form is/is not in focus
    const handleFocus = () => {
        setFormFocus(true)
    };
    const handleBlur = () => {
        if (input === "") {
            setValid(false)
            setFormFocus(false)
        }
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

    const handlePostComment = (event) => {
        console.log(user)
        event.preventDefault();
        if (!user) {
            navigate('../../login')
        }

        setInput("");
        //API call
    };
    
    const handleCancel = () => {
        setInput("")
        setFormFocus(false);
    }

    return (
        <CommentBox>
            <StyledAvatarImage src={AvatarImage} roundedCircle />
            <FormWrap onFocus={handleFocus}>
                <CommentInput
                    type="text" id="comment" 
                    onChange={updateInput} 
                    required  
                    value={input}
                    pattern={regex}
                    onBlur={handleBlur}
                />
                <FormLabel userInput={input === "" ? false : true} htmlFor="comment">Add a comment...</FormLabel>
                {formFocus ? (
                <CommentControls>
                    {valid ? (<StyledButton onClick={handlePostComment} variant="success">Comment</StyledButton>) : null}
                    <StyledButton onClick={handleCancel} variant="danger">Cancel</StyledButton>
                </CommentControls>
            ) : null}
            </FormWrap>
        </CommentBox>
    )
}