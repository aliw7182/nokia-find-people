import Button, { ButtonGroup } from "@atlaskit/button";
import { FormHeader, FormSection } from "@atlaskit/form";
import LockIcon from "@atlaskit/icon/glyph/lock";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Spacing } from "../ui/atoms";
import { TextInput } from "../ui/molecules";
import { useHistory } from "react-router-dom";

export const NewPasswordForm = ({ onSubmit }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors, watch } = useForm();
  const [pending, setPending] = useState(false);

  const onSubmitHandle = (data) => {
    setPending(true);
    data.token = history.location.search.substring(7); // ?token=#{@token}
    onSubmit(data)
      .then(() => history.push(`/`))
      .finally(() => setPending(false));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandle)} noValidate>
      <FormSection>
        <FormHeader title="New password" />
        <TextInput
          name={"password"}
          register={register({ required: true })}
          control={control}
          error={errors.password}
          label="New password"
          elemBeforeInput={<LockIcon primaryColor="#42526E" />}
        />
        <TextInput
          name={"password_repeat"}
          register={register({
            required: true,
            validate: (value) =>
              value === watch("password") || "Passwords don't match.",
          })}
          control={control}
          type="password"
          error={errors["password_repeat"]}
          label="Repeat password"
          elemBeforeInput={<LockIcon primaryColor="#42526E" />}
        />
      </FormSection>
      <Spacing m={{ t: "20px" }}>
        <ButtonGroup>
          <Button 
            isDisabled={pending} 
            style={{ fontSize: 14 }} 
            type="submit" 
            appearance="primary"
          >
            Send
          </Button>
        </ButtonGroup>
      </Spacing>
    </Form>
  );
};
