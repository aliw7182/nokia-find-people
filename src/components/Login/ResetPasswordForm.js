import Button, { ButtonGroup } from "@atlaskit/button";
import { FormHeader, FormSection } from "@atlaskit/form";
import EmailIcon from "@atlaskit/icon/glyph/email";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Spacing } from "../ui/atoms";
import { TextInput } from "../ui/molecules";
import { useHistory } from "react-router-dom";

export const ResetPasswordForm = ({ onSubmit }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();
  const [pending, setPending] = useState(false);

  const onSubmitHandle = (data) => {
    setPending(true);

    onSubmit(data)
      .then(() => history.push(`/`))
      .finally(() => setPending(false));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandle)} noValidate>
      <FormSection>
        <FormHeader title="Forgot password?" />
        <TextInput
          name="email"
          register={register({ required: true })}
          control={control}
          error={errors.email}
          label="Email"
          elemBeforeInput={<EmailIcon primaryColor="#42526E" />}
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
