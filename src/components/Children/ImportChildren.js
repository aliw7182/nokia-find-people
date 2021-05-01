import { Spacing, Title } from "../ui/atoms";
import Textfield from "@atlaskit/textfield";
import Button, { ButtonGroup } from "@atlaskit/button";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import { ErrorMessage } from "@atlaskit/form";
import "@atlaskit/css-reset";
import { createChildRequest } from "../../api/children";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";

export const ImportChildren = ({
  setIsOpen,
  children,
  setChildren,
  setIsImport,
}) => {
  const history = useHistory();
  const {
    control,
    register,
    handleSubmit,
    reset,
    errors,
    clearErrors,
  } = useForm();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "children",
  });

  useEffect(() => {
    children.map((child) => append(child));
  }, [children]);

  const onSubmit = (data) => {
    data.children.forEach((item) => {
      createChildRequest({
        ...item,
        gender: item.gender === "Male" ? "male" : "female",
      })
        .then(() => {
          toast.success("Children successfully created!");
        })
        .finally(() => history.goBack());
    });
  };

  const onError = (error) => console.log("onError: ", error);

  const clear = async () => {
    clearErrors();
    reset();
    remove();
    await setChildren([]);
  };

  const backToForm = async () => {
    await clear();
    setIsImport(false);
  };

  const permanency_goal_validate = (value) => {
    switch (value) {
      case "return_to_parent":
      case "adoption":
      case "permanent_legal_custody":
      case "permanent_placement":
      case "appla":
      case "":
        return true;
      default:
        return false;
    }
  };

  const gender_validate = (value) => {
    switch (value) {
      case "male":
      case "female":
      case "Male":
      case "Female":
      case "":
        return true;
      default:
        return false;
    }
  };

  const race_validate = (value) => {
    switch (value) {
      case "american_indian_or_alaska_native":
      case "asian":
      case "black_or_african_american":
      case "hispanic_or_latino":
      case "native_hawaiian_or_other_pacific_islander":
      case "white":
      case "":
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <Title>Imported data</Title>
      <Spacing m={{ t: "20px" }}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Birthday</th>
              <th>Permanency Goal</th>
              <th>Gender</th>
              <th>Race</th>
              <th>Action</th>
            </tr>
            {fields.map(
              (child, index) =>
                child && (
                  <tr key={Math.random().toString(16).slice(2)}>
                    <td style={{ width: "14%" }}>
                      <Textfield
                        name={`children[${index}].first_name`}
                        control={control}
                        ref={register({ required: true })}
                        appearance="none"
                        style={{ padding: 0 }}
                        defaultValue={child.first_name}
                        isReadOnly
                        isRequired
                      />
                      {errors.children &&
                        errors?.children[index]?.first_name?.type ===
                          "required" && (
                          <ErrorMessage>First Name cannot be null</ErrorMessage>
                        )}
                    </td>
                    <td style={{ width: "14%" }}>
                      <Textfield
                        name={`children[${index}].last_name`}
                        control={control}
                        ref={register({ required: true })}
                        appearance="none"
                        style={{ padding: 0 }}
                        defaultValue={child.last_name}
                        isReadOnly
                        isRequired
                      />
                      {errors.children &&
                        errors?.children[index]?.last_name?.type ===
                          "required" && (
                          <ErrorMessage>Last Name cannot be null</ErrorMessage>
                        )}
                    </td>
                    <td style={{ width: "14%" }}>
                      <Textfield
                        name={`children[${index}].birthday`}
                        control={control}
                        ref={register()}
                        appearance="none"
                        style={{ padding: 0 }}
                        defaultValue={
                          new Date(child.birthday).toDateString() || ""
                        }
                        isReadOnly
                      />
                    </td>
                    <td style={{ width: "20%" }}>
                      <Textfield
                        name={`children[${index}].permanency_goal`}
                        control={control}
                        ref={register({
                          validate: (value) => permanency_goal_validate(value),
                        })}
                        appearance="none"
                        style={{ padding: 0 }}
                        defaultValue={child.permanency_goal}
                        isReadOnly
                      />
                      {errors.children &&
                        errors?.children[index]?.permanency_goal?.type ===
                          "validate" && (
                          <ErrorMessage>Not valid value</ErrorMessage>
                        )}
                    </td>
                    <td style={{ width: "12%" }}>
                      <Textfield
                        name={`children[${index}].gender`}
                        control={control}
                        ref={register({
                          validate: (value) => gender_validate(value),
                        })}
                        appearance="none"
                        style={{ padding: 0 }}
                        defaultValue={child.gender}
                        isReadOnly
                      />
                      {errors.children &&
                        errors?.children[index]?.gender?.type ===
                          "validate" && (
                          <ErrorMessage>Not valid value</ErrorMessage>
                        )}
                    </td>
                    <td style={{ width: "26%" }}>
                      <Textfield
                        name={`children[${index}].race`}
                        control={control}
                        ref={register({
                          validate: (value) => race_validate(value),
                        })}
                        appearance="none"
                        style={{ padding: 0 }}
                        defaultValue={child.race}
                        isReadOnly
                      />
                      {errors.children &&
                        errors?.children[index]?.race?.type === "validate" && (
                          <ErrorMessage>Not valid value</ErrorMessage>
                        )}
                    </td>
                    <td style={{ width: "10%" }}>
                      <Button appearance="subtle" onClick={() => remove(index)}>
                        <CrossIcon size="small" />
                      </Button>
                    </td>
                  </tr>
                )
            )}
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <ButtonGroup>
              <Button appearance="primary" type="submit">
                Submit
              </Button>
              <Button onClick={() => setIsOpen(true)}>Import more</Button>
              <Button onClick={() => clear()}>Clear</Button>
              <Button onClick={() => backToForm()}>Back to form</Button>
            </ButtonGroup>
          </div>
        </form>
      </Spacing>
    </>
  );
};
