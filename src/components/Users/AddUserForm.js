import Button from "@atlaskit/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Form } from "../ui/atoms";
import { TextInput } from "../ui/molecules";
import { AddOrganizationForm } from "./AddOrganizationForm";

export const AddUserForm = ({ onSubmit }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();
  const [orgRoles, setOrgRoles] = useState([]);
  const [pending, setPending] = useState(false);

  const onSubmitHandle = (data) => {
    setPending(true);
    data["organizations"] = orgRoles;
    if (orgRoles.length > 0) {
      data.role = orgRoles[0].role;
      data.organization_id = orgRoles[0].id;
    }
    console.log(data);

    onSubmit(data)
      .then(() => history.goBack())
      .finally(() => setPending(false));
  };

  return (
    <Box>
      <Box d="flex" justify="space-evenly" mt="16px">
        <Form
          w="400px"
          d="flex"
          onSubmit={handleSubmit(onSubmitHandle)}
          noValidate
        >
          <TextInput
            width="100%"
            className="input"
            name={"first_name"}
            register={register({ required: true })}
            control={control}
            error={errors.first_name}
            label="First name"
          />
          <TextInput
            width="100%"
            className="input"
            name={"last_name"}
            register={register({ required: true })}
            control={control}
            error={errors.last_name}
            label="Last name"
          />
          <TextInput
            width="100%"
            className="input"
            name={"email"}
            register={register({
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
            control={control}
            error={errors.email}
            label="Email"
          />
          <TextInput
            width="100%"
            name={"phone"}
            register={register({
              required: true,
            })}
            control={control}
            error={errors.phone}
            label="Phone"
            type={"phone"}
          />
          <Box mt="16px">
            <Button isDisabled={pending} type="submit" appearance="primary">
              Add New User
            </Button>
          </Box>
        </Form>
        <Box w="500px">
          <AddOrganizationForm setOrgRoles={setOrgRoles} />
        </Box>
      </Box>
    </Box>
  );
};
