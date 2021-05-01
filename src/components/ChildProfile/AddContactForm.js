import Button, { ButtonGroup } from "@atlaskit/button";
import Textfield from "@atlaskit/textfield";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { relationshipOptions } from "../../content/relationshipOptions.data";
import { states } from "../../content/states.data";
import { race_options, sex_options } from "../../helpers";
import { getObjectByLabel } from "../Children";
import { Box, Form, Label, Spacing } from "../ui/atoms";
import { DatepickerInput, SelectInput, TextInput } from "../ui/molecules";

const DynamicDataItem = ({ filed, onClick }) => {
  return (
    <Box d="flex" align="center">
      <div style={{ width: 180, marginLeft: 5, overflow: "scroll" }}>
        {filed}
      </div>{" "}
      <Button
        spacing="none"
        onClick={onClick}
        appearance="subtle"
        style={{
          borderRadius: 20,
          marginLeft: 15,
          padding: "3px 9px",
        }}
      >
        ✕
      </Button>
    </Box>
  );
};

export const AddContactForm = ({ onSubmit, onCancel, contact }) => {
  const { register, handleSubmit, control, errors, watch } = useForm({
    defaultValues: contact
      ? {
          first_name: contact.first_name,
          last_name: contact.last_name,
          relationship: contact.relationship,
          // email: contact.email,
          // phone: contact.phone,
          sex: contact.sex,
          race: contact.race,
          // address: contact.address,
          // address_2: contact.address_2,
          city: contact.city,
          birthday: new Date(contact.birthday),
          zip: contact.zip,
        }
      : {},
  });
  const [pending, setPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [phonesList, setPhonesList] = useState([]);
  const [emailsList, setEmailsList] = useState([]);
  const [addressesList, setAddressesList] = useState([]);
  const [removeIds, setRemoveIds] = useState([]);
  const [currentPhone, setCurrentPhone] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const relationship = watch("relationship"); // you can supply default value as second argument

  const onSubmitHandle = (data) => {
    setPending(true);

    console.log(data);
    const {
      state,
      relationship,
      sex,
      race,
      relationship_other,
      ...rest
    } = data;

    let submitData = rest;

    if (state?.value) {
      submitData.state = state.value;
    }
    if (relationship?.value) {
      submitData.relationship =
        relationship.value === "Other"
          ? relationship_other
          : relationship.value;
    }

    if (sex?.value) {
      submitData.sex = sex.value;
    }

    if (race?.value) {
      submitData.race = race.value;
    }

    onSubmit(submitData, emailsList, phonesList, addressesList, removeIds);
  };

  return (
    <>
      <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
        <Spacing
          m={{ b: "15px" }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <TextInput
            marginX="8px"
            className="input"
            name={"first_name"}
            register={register({ required: true })}
            control={control}
            error={errors.first_name}
            label="First name"
          />
          <TextInput
            marginX="8px"
            className="input"
            name={"last_name"}
            register={register({ required: false })}
            control={control}
            error={errors.last_name}
            label="Last name"
          />
          <SelectInput
            defaultValue={
              contact?.relationship &&
              getObjectByLabel(relationshipOptions, contact?.relationship)
            }
            marginX="8px"
            name={"relationship"}
            register={{ required: false }}
            control={control}
            options={relationshipOptions}
            error={errors.relationship}
            label="Relationship"
            placeholder="Relationship"
          />
          {/* <TextInput
            marginX="8px"
            className="input"
            name={"email"}
            register={register({
              required: false,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
            control={control}
            error={errors.email}
            label="Email"
          /> */}
          <DatepickerInput
            marginX="8px"
            name={"birthday"}
            register={{ required: false }}
            control={control}
            error={errors.birthday}
            label="Birthday"
            placeholder="Select birthday"
          />
          {/* <TextInput
            marginX="8px"
            name={"phone"}
            register={register({
              required: false,
            })}
            control={control}
            error={errors.phone}
            label="Phone"
            type={"phone"}
          /> */}
          <SelectInput
            marginX="8px"
            defaultValue={
              contact?.sex && getObjectByLabel(sex_options, contact.sex)
            }
            name="sex"
            control={control}
            error={errors.sex}
            label="Sex"
            options={sex_options}
          />
          <SelectInput
            marginX="8px"
            defaultValue={
              contact?.race && getObjectByLabel(race_options, contact.race)
            }
            name="race"
            control={control}
            error={errors.race}
            label="Race"
            options={race_options}
          />

          {/* <TextInput
            marginX="8px"
            className="input"
            name={"address_2"}
            register={register({ required: false })}
            control={control}
            error={errors.address_2}
            label="Another Address"
          /> */}
          <TextInput
            marginX="8px"
            name={"city"}
            register={register({ required: false })}
            control={control}
            error={errors.city}
            label="City"
          />
          <SelectInput
            defaultValue={
              contact?.state && { label: contact?.state, value: contact?.state }
            }
            marginX="8px"
            menuPlacement="top"
            name={"state"}
            register={{ required: false }}
            control={control}
            options={states.map((state) => ({ label: state, value: state }))}
            error={errors.state}
            label="State"
            placeholder="Choose State"
          />
          <TextInput
            marginX="8px"
            name={"zip"}
            register={register({ required: false })}
            control={control}
            error={errors.zip}
            label="Zip"
          />

          <>
            <Box
              d="flex"
              justify="center"
              style={{ marginTop: 7, marginLeft: 10 }}
            >
              <div style={{ width: 200 }}>
                <Label htmlFor={"address"}>Address</Label>
                <Textfield
                  name="address"
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                />
                <div style={{ marginBottom: 5 }} />
                {contact?.communications
                  ?.filter(
                    (item) =>
                      item.communication_type === "address" &&
                      !removeIds.includes(item.id)
                  )
                  .map((item) => (
                    <DynamicDataItem
                      filed={item.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setRemoveIds([...removeIds, item.id]);
                      }}
                    />
                  ))}
                {addressesList.map((address, index) => (
                  <DynamicDataItem
                    filed={address}
                    onClick={(e) => {
                      e.stopPropagation();
                      setAddressesList(
                        addressesList.filter(
                          (_, removeIndex) => removeIndex !== index
                        )
                      );
                    }}
                  />
                ))}
              </div>
              <Button
                isDisabled={currentAddress?.length < 5}
                onClick={(e) => {
                  e.stopPropagation();
                  setAddressesList([...addressesList, currentAddress]);
                  setCurrentAddress("");
                }}
                appearance="primary"
                style={{
                  borderRadius: 20,
                  marginLeft: 5,
                  marginRight: 8,
                  marginTop: 25,
                }}
              >
                +
              </Button>
            </Box>

            <Box d="flex" justify="center">
              <div style={{ width: 200 }}>
                <Label htmlFor={"phone"}>Phone number</Label>
                <Textfield
                  name="phone"
                  value={currentPhone}
                  onChange={(e) => setCurrentPhone(e.target.value)}
                />
                <div style={{ marginBottom: 5 }} />
                {contact?.communications
                  ?.filter(
                    (item) =>
                      item.communication_type === "phone" &&
                      !removeIds.includes(item.id)
                  )
                  .map((item) => (
                    <DynamicDataItem
                      filed={item.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setRemoveIds([...removeIds, item.id]);
                      }}
                    />
                  ))}
                {phonesList.map((phone, index) => (
                  <DynamicDataItem
                    filed={phone}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhonesList(
                        phonesList.filter(
                          (_, removeIndex) => removeIndex !== index
                        )
                      );
                    }}
                  />
                ))}
              </div>
              <Button
                isDisabled={
                  !currentPhone.match(/\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/)
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setPhonesList([...phonesList, currentPhone]);
                  setCurrentPhone("");
                }}
                appearance="primary"
                style={{
                  borderRadius: 20,
                  marginLeft: 5,
                  marginRight: 8,
                  marginTop: 25,
                }}
              >
                +
              </Button>
            </Box>
            <div style={{ marginBottom: 5 }} />
            <Box d="flex" justify="center">
              <div style={{ margin: "0px 8px", width: 200 }}>
                <Label htmlFor={"email"}>Email</Label>
                <Textfield
                  value={currentEmail}
                  name="email"
                  onChange={(e) => setCurrentEmail(e.target.value)}
                />
                {contact?.communications
                  ?.filter(
                    (item) =>
                      item.communication_type === "email" &&
                      !removeIds.includes(item.id)
                  )
                  .map((item) => (
                    <DynamicDataItem
                      filed={item.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setRemoveIds([...removeIds, item.id]);
                      }}
                    />
                  ))}
                {emailsList.map((email, index) => (
                  <DynamicDataItem
                    filed={email}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEmailsList(
                        emailsList.filter(
                          (_, removeIndex) => removeIndex !== index
                        )
                      );
                    }}
                  />
                ))}
              </div>
              <Button
                isDisabled={
                  !currentEmail.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setEmailsList([...emailsList, currentEmail]);
                  setCurrentEmail("");
                }}
                appearance="primary"
                style={{ borderRadius: 20, marginTop: 25 }}
              >
                +
              </Button>
            </Box>
          </>

          {relationship?.value === "Other" ? (
            <TextInput
              marginX="8px"
              className="input"
              name={"relationship_other"}
              register={register({ required: false })}
              control={control}
              error={errors.relationship_other}
              label="Relationship name"
            />
          ) : (
            <div style={{ width: 250 }} />
          )}
        </Spacing>
        <Box d="flex" w="100%" justify="center" mb="20px">
          <ButtonGroup>
            <Button isDisabled={pending} type="submit" appearance="primary">
              Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ButtonGroup>
        </Box>
      </Form>
    </>
  );
};
