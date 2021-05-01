import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { relationshipOptions } from "../../../../content/relationshipOptions.data";
import { Box, Form, Spacing } from "../../../ui/atoms";
import { SelectInput, TextInput } from "../../../ui/molecules";

export const EditNodeForm = ({ initialContacts, selected }) => {
  const history = useHistory();
  const { register, handleSubmit, control, errors, watch } = useForm({});
  const [contacts, setContacts] = useState([]);
  const relationship = watch("relationship"); // you can supply default value as second argument
  const [pending, setPending] = useState(false);

  useEffect(() => {
    console.log("initialContacts", initialContacts);
    const options = initialContacts
      .filter(({ contact }) => !!contact)
      .map(({ contact: item }) => ({
        label: `${item?.first_name} ${item?.last_name}`,
        value: item.id,
      }));
    setContacts(options);
  }, [initialContacts]);

  useEffect(() => {
    console.log(contacts);
  }, [contacts]);

  const onSubmitHandle = (data) => {
    localStorage.setItem("selectValue", JSON.stringify({ ...data }));
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmitHandle)}
        id="editForm"
        style={{
          display: "none",
          left: "60%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          position: "fixed",
          backgroundColor: "white",
          border: "1px solid grey",
          borderRadius: 10,
          zIndex: 10000,
          padding: 10,
        }}
      >
        <Box d="flex">
          Edit
          <Button
            style={{ position: "absolute", right: 10 }}
            id="cancel"
            appearance="primary"
          >
            X
          </Button>
        </Box>
        <FormSection>
          {selected && (
            <SelectInput
              menuPlacement="top"
              name={"contact"}
              id="contact"
              register={{ required: true }}
              control={control}
              label="Contact"
              defaultValue={{
                value: selected?.contactId,
                label: selected?.Name,
              }}
              options={contacts}
            />
          )}
          {selected && (
            <SelectInput
              menuPlacement="top"
              name={"relationship"}
              id="relationship"
              register={{ required: true }}
              control={control}
              label="Relationship"
              defaultValue={{
                value: selected?.id,
                label: selected?.Relationship,
              }}
              options={relationshipOptions}
            />
          )}
          {relationship?.value === "Other" && (
            <TextInput
              className="input"
              name={"relationship_other"}
              register={register({ required: true })}
              control={control}
              error={errors.relationship_other}
              label="Relationship name"
            />
          )}
          <Spacing m={{ t: "10px" }}>
            <Button
              isDisabled={pending}
              type="submit"
              id="save"
              appearance="primary"
            >
              Save
            </Button>
          </Spacing>
        </FormSection>
      </Form>
    </>
  );
};
