import Select from "@atlaskit/select";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import { formErrors } from "../../../helpers/formErrors";
import { Box, Label, StyledTextError } from "../atoms";

export const SelectInput = (props) => {
  const {
    name,
    register,
    error,
    control,
    type,
    id,
    placeholder = null,
    elemBeforeInput = null,
    elemAfterInput = null,
    width = 240,
    label = null,
    isMulti = false,
    options,
    defaultValue = null,
    myValue,
    myOnChange,
    menuPlacement = "bottom",
    marginX = "0px",
    marginY = "8px",
    validationState = "default",
    className,
  } = props;

  return (
    <Box w={`${width}px`} mt={marginY} mb={marginY} ml={marginX} mr={marginX}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        ref={{ register }}
        rules={register}
        defaultValue={defaultValue}
        render={(props) => (
          <Select
            validationState={validationState}
            menuPlacement={menuPlacement}
            control={control}
            inputId={id}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 999999 }),
            }}
            options={options}
            defaultValue={defaultValue}
            value={myValue}
            onChange={(value) => {
              props.onChange(value);
              myOnChange && myOnChange(value);
            }}
            className={className}
          />
        )}
        width={width}
        elemAfterInput={elemAfterInput}
        placeholder={placeholder}
        className="multi-select"
        classNamePrefix="react-select"
      />
      {error && (
        <StyledTextError>
          {error.message || formErrors[error?.type]}
        </StyledTextError>
      )}
    </Box>
  );
};

SelectInput.propTypes = {
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
