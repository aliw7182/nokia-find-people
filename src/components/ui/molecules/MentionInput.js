import React, { useState, useEffect } from "react";
import Textfield from "@atlaskit/textfield";
import styled from "styled-components";
import { formErrors } from "../../../helpers/formErrors";
import { Box, Label, StyledTextError } from "../atoms";
import PropTypes from "prop-types";

export const MentionInput = (props) => {
  const {
    name,
    register,
    error,
    control,
    type,
    placeholder = null,
    elemBeforeInput = null,
    elemAfterInput = null,
    width = 240,
    label = null,
    mentions,
    reset,
    isSubmitSuccessful
  } = props;

  const [text, setText] = useState("");
  const [userName, setUserName] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [isTypingName, setIsTypingName] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');

  useEffect(()=> {
    showSuggestions();
  },[userName])

  useEffect(() => {
    if (isSubmitSuccessful) {
      setText('');
    }
  }, [isSubmitSuccessful, reset]);

  const showSuggestions = () => {
    let suggestion = [];
    if (userName.length > 0) {
      const regex = new RegExp(`^${userName}`, "i");
      suggestion = mentions.sort().filter(v => regex.test(v));
      console.log(suggestion, mentions)
      setSuggestions(suggestion);
    }
    else{
      setSuggestions([]);
    }
  };

  const onTextChange = event => {
    let value = event.target.value;
    const lastChar = value.split("")[value.length - 1];
    if (lastChar === " " || value === "") {
      setSuggestions([]);
      setIsTypingName(false);
    }

    if (lastChar === "@") {
      setIsTypingName(true);
    }

    if (isTypingName) {
      const words = value.split(" ");
      let v=words[words.length - 1].substring(1);
      setUserName(v);
    }

    setText(value);
  };

  const selectedText = value => {
    setSuggestions([]);
    setText(text.substr(0, text.length - userName.length) + value);
  };

  const handleKeyDown = (event) => {
    const { which } = event;
    
    if (which === 40 ) { // 40 is the character code of the down arrow
      event.preventDefault();
      if(!selectedSuggestion || !selectedSuggestion.length) setSelectedSuggestion(suggestions[0]);
      else {
        let index = suggestions.indexOf(selectedSuggestion);
        setSelectedSuggestion(suggestions[(index+1)%suggestions.length]);
      }
    }
    
    if (which === 13) { // 13 is the character code for enter
      if(suggestions.length > 0){
        event.preventDefault();
        if(selectedSuggestion.length>0){
          selectedText(selectedSuggestion);
          setSelectedSuggestion('');
        }
      }
    }
  }

  console.log(selectedSuggestion)

  const renderSuggestions = () => (
    <StyledList styles={{"width": "50px", "display": suggestions ? "inline-block" : "none", "left": `${(text.length - userName.length)*7}px`}}>
      {suggestions.map((item, index) => (
        <StyledListItem color={selectedSuggestion===item ? "background-color : #daf4fa;" : ''} key={index} onClick={() => selectedText(item)}>
          {item}
        </StyledListItem>
      ))}
    </StyledList>
  );

return (
  <Box w={`${width}px`} onKeyDown = {(e)=>handleKeyDown(e)}>

    {label && <Label htmlFor={name}>{label}</Label>}

    <StyledTextField
      controls={control}
      ref={register}
      elemBeforeInput={elemBeforeInput}
      elemAfterInput={elemAfterInput}
      name={name}
      placeholder={placeholder}
      id={name}
      type={type || name}
      width={width}
      isCompact
      value={text} 
      onChange={event => onTextChange(event)}
    />

    {renderSuggestions()}

    {error && (
      <StyledTextError>
        {error.message || formErrors[error?.type]}
      </StyledTextError>
    )}
  </Box>
  );
};

const StyledListItem = styled.li`
  padding: 5px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  ${props => props.color}
`

const StyledList = styled.ul`
  width: "50px";
  background-color: #fff;
  font-size: 14px;
  max-height: 200px;
  overflow: auto;
  margin: 0 auto;
  padding: 0;
  max-height: 390px;
  overflow-y: auto;
  border-left: none;
  border-right: none;
  position: "absolute";
  borderRadius: "6px";
  background: "white";
  boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 4px";
  ${props => props.left && props.display}
`

const StyledTextField = styled(Textfield)`
  min-height: 36px;
  background-color: #fff;
  border-radius: 3px;
  transition: 0.3s ease-in-out;
  padding: 9px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  border: 1px solid #dedede;
  &::placeholder {
    color: #a4b0be;
    font-size: 14px;
  }
`;

MentionInput.propTypes = {
name: PropTypes.string.isRequired,
register: PropTypes.any.isRequired,
errors: PropTypes.any.isRequired,
control: PropTypes.any.isRequired,
mentions: PropTypes.any.isRequired,
elemBeforeInput: PropTypes.node,
placeholder: PropTypes.string,
type: PropTypes.string,
width: PropTypes.number,
height: PropTypes.number,
label: PropTypes.node,
reset: PropTypes.any.isRequired,
isSubmitSuccessful: PropTypes.any.isRequired
};

 
