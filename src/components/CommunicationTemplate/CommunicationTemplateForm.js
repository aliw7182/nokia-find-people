import Button from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import AddIcon from "@atlaskit/icon/glyph/add";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Form, Label, Spacing } from "../ui/atoms";
import { SelectInput, TextInput } from "../ui/molecules";
import { WysiwygEditor } from "../WYSIWYG";

export const TEMPLATE_TYPES = [
  { value: "sms", label: "SMS" },
  { value: "letter", label: "Letter" },
  { value: "email", label: "Email" },
];

export const CommunicationTemplateForm = React.forwardRef(
  (
    {
      onSubmit,
      isUpdate = false,
      initialValues = {},
      setRefresh,
      setIsOpenEdit,
      refresh,
    },
    ref
  ) => {
    const history = useHistory();
    const { register, handleSubmit, control, errors } = useForm({
      defaultValues: initialValues,
    });
    const [orgRoles, setOrgRoles] = useState([]);
    const [upd, setUpd] = useState(1);
    const [text, setText] = useState("");
    const [htmlText, setHtmlText] = useState("");
    const [rawData, setRawData] = useState("");
    const [pending, setPending] = useState(false);

    const onSubmitHandle = (data) => {
      setPending(true);
      const requestData = {
        name: data.name,
        template_type: data.template_type.value,
        content: htmlText,
      };
      onSubmit({ communication_template: requestData })
        .then(() => {
          toast.success(
            `Template successfully ${isUpdate ? "updated" : "created"}!`
          );
          if (isUpdate) {
            history.push("../communications-templates");
            setRefresh(!refresh);
            setIsOpenEdit(false);
          } else {
            history.goBack();
          }
        })
        .finally(() => setPending(false));
    };

    console.log("INITIAALLLL", initialValues);

    return (
      <>
        <Form
          ref={ref}
          w="100%"
          onSubmit={handleSubmit(onSubmitHandle)}
          noValidate
        >
          <FormSection>
            <Box d="flex">
              <Spacing m={{ t: "18px", l: "10px" }}>
                <TextInput
                  className="input"
                  name={"name"}
                  register={register({ required: true })}
                  control={control}
                  error={errors.name}
                  label="Name of template"
                />
              </Spacing>
              <Spacing m={{ t: "18px", l: "10px" }}>
                <SelectInput
                  defaultValue={initialValues?.template_type}
                  name="template_type"
                  register={{ required: true }}
                  control={control}
                  error={errors.template_type}
                  label="Template type"
                  options={TEMPLATE_TYPES}
                />
              </Spacing>
            </Box>
            <Spacing m={{ t: "58px", l: "10px", b: "-10px" }}>
              <Label>Content of template</Label>
            </Spacing>
            <WysiwygEditor
              upd={upd}
              withMention={false}
              defaultValue={initialValues?.content}
              onChange={(tex, raw, html) => {
                setText(tex);
                setRawData(raw);
                setHtmlText(html);
              }}
            />
            {!isUpdate && (
              <Button
                style={{ position: "absolute", top: 80, right: 40 }}
                isDisabled={pending}
                iconBefore={<AddIcon />}
                type="submit"
                appearance="warning"
              >
                Add
              </Button>
            )}
          </FormSection>
        </Form>
      </>
    );
  }
);
