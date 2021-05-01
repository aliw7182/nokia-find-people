import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ACTIONS } from "../../accessControl/actions";
import Can from "../../accessControl/Can";
import { inContinuousSearchOptions } from "../../content/searchVector.data";
import { SEARCHVECTOR } from "../../helpers";
import { Box, Form, Label } from "../ui/atoms";
import { SelectInput, TextInput } from "../ui/molecules";
import { WysiwygEditor } from "../WYSIWYG";

export const AddSearchVectorForm = ({
  onSubmit,
  onCancel,
  currentSearchVector,
  pending,
}) => {
  const { register, handleSubmit, control, errors, watch } = useForm({
    defaultValues: currentSearchVector
      ? {
          ...currentSearchVector,
          in_continuous_search: currentSearchVector.in_continuous_search
            ? inContinuousSearchOptions[0]
            : inContinuousSearchOptions[1],
        }
      : { name: null, in_continuous_search: null },
  });
  const [htmlText, setHtmlText] = useState("");
  const automated = watch("in_continuous_search", { value: false });

  const onSubmitHandle = (data) => {
    console.log(data);
    data.in_continuous_search = data.in_continuous_search?.value;
    data.description = htmlText;
    onSubmit(data);
  };

  return (
    <>
      <Form w="100%" onSubmit={handleSubmit(onSubmitHandle)} noValidate>
        <Box d="block" mb="20px">
          <TextInput
            marginY="16px"
            className="input"
            name="name"
            register={register({ required: true })}
            control={control}
            error={errors.name}
            label="Name"
          />
          <Label>Description</Label>
          <WysiwygEditor
            withMention={false}
            onChange={(text, raw, html) => setHtmlText(html)}
            defaultValue={currentSearchVector?.description}
          />
          <Box d="flex">
            <SelectInput
              menuPlacement="top"
              marginY="16px"
              defaultValue={
                currentSearchVector
                  ? currentSearchVector.in_continuous_search
                    ? inContinuousSearchOptions[0]
                    : inContinuousSearchOptions[1]
                  : null
              }
              name={"in_continuous_search"}
              register={{ required: true }}
              control={control}
              options={inContinuousSearchOptions}
              error={errors.in_continuous_search}
              label="In Continuous Search"
              placeholder="In Continuous Search"
            />
            {automated?.value && (
              <Can
                perform={`${SEARCHVECTOR}:${ACTIONS.ADD_TASK_ID}`}
                yes={() => (
                  <TextInput
                    marginX="16px"
                    marginY="16px"
                    className="input"
                    name={"task_id"}
                    register={register({ required: true })}
                    control={control}
                    error={errors.task_id}
                    label="Task Id"
                  />
                )}
              />
            )}
          </Box>
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
