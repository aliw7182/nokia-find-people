import Button from "@atlaskit/button";
import SearchIcon from "@atlaskit/icon/glyph/search";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { fetchOrganizations } from "../../context/organization/organizationProvider";
import { Box, Form, Spacing } from "../ui/atoms";
import { SelectInput } from "../ui/molecules";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import "@atlaskit/css-reset";
import { TableWrapper } from "../ui/common";

export const AddOrganizationForm = ({ setOrgRoles }) => {
  const { handleSubmit, control, errors, watch, setValue } = useForm();
  const [roles, setRoles] = useState([
    { label: "Organization admin", value: "admin" },
    { label: "Organization manager", value: "manager" },
    { label: "Organization user", value: "user" },
  ]);
  const [role, setRole] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [organization, setOrganization] = useState(null);

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "user_organizations",
  });
  const superAdminOrganization = watch("organization");

  const clearOrganization = () => {
    setValue("organization", null, { shouldDirty: true });
    setOrganization(null);
  };

  const clearRole = () => {
    setValue("role", null, { shouldDirty: true });
    setRole(null);
  };

  const onAddOrganizationHandle = (data) => {
    clearRole();
    clearOrganization();
    fields.map(
      (item, index) =>
        item.organization.value === data.organization.value && remove(index)
    );
    prepend({
      organization: {
        label: data.organization?.label,
        value: data.organization?.value,
      },
      role: {
        label: data.role?.label,
        value: data.role?.value,
      },
    });
  };

  useEffect(() => {
    clearRole();
    const super_admin_role = [
      {
        label: "Super Admin",
        value: "super_admin",
      },
      ...options,
    ];
    if (superAdminOrganization && superAdminOrganization?.value === 3) {
      setRoles(super_admin_role);
    } else {
      setRoles(options);
    }
  }, [superAdminOrganization]);

  useEffect(() => {
    fetchOrganizations({ view: "short" }).then((items) => {
      if (items) {
        var options = items.map(function (item) {
          return {
            label: item.name,
            value: item.id,
          };
        });
        setOrganizations(options);
      }
    });
  }, []);

  useEffect(() => {
    setOrgRoles(
      fields.map((item) => ({
        id: item.organization.value,
        role: item.role.value,
      }))
    );
  }, [fields]);

  return (
    <>
      <Form
        w="100%"
        onSubmit={handleSubmit(onAddOrganizationHandle)}
        noValidate
      >
        <Spacing m={{t: "8px"}}>
            <Box align="flex-end" d="flex">
              <SelectInput
                marginY="0px"
                className="input"
                name="organization"
                elemAfterInput={<SearchIcon />}
                options={organizations}
                register={{ required: true }}
                control={control}
                error={errors.organization}
                myValue={organization}
                myOnChange={setOrganization}
                label="Organization"
                placeholder="Choose organization"
              />
              <SelectInput
                marginY="0px"
                marginX="8px"
                className="input"
                name="role"
                label="Role"
                register={{ required: true }}
                options={roles}
                control={control}
                myOnChange={setRole}
                myValue={role}
                error={errors.role}
                placeholder="Select a role"
              />
              <Button type="submit" appearance="primary">
                Add
              </Button>
            </Box>
          </Spacing>
      </Form>
      <Spacing m={{ t: "33px" }}>
        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>Organization</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => {
                return (
                  <tr key={item.organization.value}>
                    <td>{item.organization.label}</td>
                    <td>{item.role.label}</td>
                    <td>
                      <Button
                        height="32px"
                        width="32px"
                        onClick={() => remove(index)}
                      >
                        <CrossIcon size="small" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrapper>
      </Spacing>
    </>
  );
};

const options = [
  { label: "Organization admin", value: "admin" },
  { label: "Organization manager", value: "manager" },
  { label: "Organization user", value: "user" },
];
