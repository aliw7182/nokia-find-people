import DatePicker from "react-date-picker";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import { formErrors } from "../../../helpers/formErrors";
import { Box, Label, StyledTextError } from "../atoms";
import styled from "styled-components";
import CalendarIcon from "@atlaskit/icon/glyph/calendar";

export const DatepickerInput = (props) => {
  const {
    name,
    register,
    error,
    control,
    placeholder = null,
    elemAfterInput = null,
    width = 240,
    label = null,
    marginX = "0px",
    marginY = "8px",
    value,
  } = props;
  return (
    <StyledBox
      w={`${width}px`}
      mt={marginY}
      mb={marginY}
      ml={marginX}
      mr={marginX}
    >
      {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
      <Controller
        format={"dd/MM/yyyy"}
        control={control}
        ref={register}
        rules={register}
        name={name}
        value={value}
        as={StyledDatePicker}
        width={width}
        elemAfterInput={elemAfterInput}
        placeholder={placeholder}
        id={name}
        clearIcon={null}
        maxDate={new Date()}
        minDate={new Date(1899, 12, 31)}
        calendarIcon={<CalendarIcon />}
      />
      {error && (
        <StyledTextError>
          {error.message || formErrors[error?.type]}
        </StyledTextError>
      )}
    </StyledBox>
  );
};
const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const StyledLabel = styled(Label)`
  margin-bottom: 4px;
  margin-top: 4px;
`;

const StyledDatePicker = styled(DatePicker)`
  .react-date-picker__wrapper {
    border-color: #dfe1e6 !important;
    border-radius: 3px !important;
    border-width: 2px !important;
    border-style: solid !important;
  }
  .react-date-picker__calendar {
    background: red;
  }
  .react-date-picker__button__icon {
    stroke: #172b4d;
    color: #172b4d;
  }
  background-color: transparent;
  min-height: 36px;
`;

DatepickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  control: PropTypes.any.isRequired,
  elemBeforeInput: PropTypes.node,
  elemAfterInput: PropTypes.node,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.number,
  label: PropTypes.node,
};
