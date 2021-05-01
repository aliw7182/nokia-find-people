import Button from "@atlaskit/button";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import { Box, Spacing } from "../../../ui/atoms";
import { SelectInput } from "../../../ui/molecules";
import { getLocalStorageUser } from "../../../../context/auth/authProvider";
import {
  automatedSearchResultRequest,
  createSearchResultRequest,
} from "../../../../api/searchResults/searchResultsRequests";
import { toast } from "react-toastify";

export function AutomatedSearch({ vectors, fetch, setIsOpen }) {
  const { control, errors, handleSubmit } = useForm();
  const {
    state: {
      child: { id: child_id },
    },
    connectionState: { connections },
  } = useContext(ChildContext);
  const { id: user_id } = getLocalStorageUser();
  const [pending, setPending] = useState(false);
  const onHandle = async ({
    search_vector: { value: search_vector_id },
    connection: { value: child_contact_id },
  }) => {
    try {
      setPending(true);
      const { id: family_search_id } = await createSearchResultRequest({
        search_vector_id,
        child_contact_id,
        user_id,
        child_id,
      });
      await automatedSearchResultRequest({
        family_search_id,
      });
    } catch (e) {
      toast.error("Couldn't run automated task");
    } finally {
      await fetch();
      setPending(false);
      setIsOpen(false);
    }
  };
  return (
    <Spacing p={{ b: "16px" }}>
      <form onSubmit={handleSubmit(onHandle)}>
        <Box d="flex" align="flex-end">
          <SelectInput
            register={{ required: true }}
            error={errors.search_vector}
            marginY="0px"
            className="input"
            name="search_vector"
            options={vectors}
            control={control}
            label="Select Automated Search Vector"
          />
          <SelectInput
            register={{ required: true }}
            error={errors.connection}
            marginY="0px"
            marginX={"16px"}
            className="input"
            name="connection"
            options={connections.map(
              ({ id, contact: { first_name, last_name } }) => ({
                label: `${first_name} ${last_name}`,
                value: id,
              })
            )}
            control={control}
            label="Select Connection"
          />
          <Button type="submit" appearance="primary" isDisabled={pending}>
            Run Now
          </Button>
        </Box>
      </form>
    </Spacing>
  );
}
