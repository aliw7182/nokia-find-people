import Button from "@atlaskit/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { states } from "../../content/states.data";
import { Box, Form } from "../ui/atoms";
import { SelectInput, TextInput } from "../ui/molecules";
import { SelectOrganizationLogo } from "./SelectOrganizationLogo";

export const AddOrganizationForm = ({ onSubmit }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors } = useForm();

  const [pending, setPending] = useState(false);
  const [logoUrl, setLogoUrl] = useState();

  const onSubmitHandle = (data) => {
    setPending(true);
    data.logo = logoUrl ? logoUrl : data.logo;
    onSubmit(data)
      .then(() => history.push("../organizations"))
      .finally(() => setPending(false));
  };

  return (
    <Form w="100%" justify="center" direction="row" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
      <Box w="450px">
        <TextInput
          width="100%"
          name={"name"}
          register={register({ required: true })}
          control={control}
          error={errors.name}
          label="Name"
        />
        <TextInput
          width="100%"
          name={"phone"}
          register={register({ required: true })}
          control={control}
          error={errors.phone}
          label="Phone"
        />
        <TextInput
          width="100%"
          name={"website"}
          register={register({ required: true })}
          control={control}
          error={errors.website}
          label="Website"
        />
        <TextInput
          width="100%"
          name={"address"}
          register={register({ required: true })}
          control={control}
          error={errors.address}
          label="Address"
        />
        <TextInput
          width="100%"
          name={"city"}
          register={register({ required: true })}
          control={control}
          error={errors.city}
          label="City"
        />
        <SelectInput
          menuPlacement="top"
          width="100%"
          name={"state"}
          register={{ required: true }}
          control={control}
          options={states.map((state) => ({ label: state, value: state }))}
          error={errors.state}
          label="State"
          placeholder="Choose State"
        />
        <TextInput
          width="100%"
          name={"zip"}
          register={register({ required: true })}
          control={control}
          error={errors.zip}
          label="Zip"
        />
        <SelectOrganizationLogo
          width="100%"
          control={control}
          setLogoUrl={setLogoUrl}
          setPending={setPending}
        />
        <Box mt="16px">
          <Button
            width="100%"
            isDisabled={pending}
            type="submit"
            appearance="primary"
          >
            Add New Organization
          </Button>
        </Box>
      </Box>
    </Form>
  );
};
