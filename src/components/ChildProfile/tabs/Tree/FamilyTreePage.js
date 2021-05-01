import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  createContactRequest,
  createTableChildContactRequest,
} from "../../../../api/childContact";
import { relationshipOptions } from "../../../../content/relationshipOptions.data";
import { createChildContact } from "../../../../context/children/childProvider";
import { Spacing } from "../../../ui/atoms";
import { ModalDialog } from "../../../ui/common";
import { AddContactForm } from "../../AddContactForm";
import OrgChart from "./mychart";
import { ChildContext } from "../../../../pages/ChildProfilePage";

export const FamilyTreePage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    state,
    connectionState: { connections },
    familyTreeState: { constructed_tree },
    fetchConnections,
    fetchFamilyTree,
  } = useContext(ChildContext);
  const {
    child: { id },
  } = state;

  const refreshContacts = () => {
    fetchConnections();
    fetchFamilyTree();
  };

  const onAddContact = async (data) => {
    await createContactRequest(data)
      .then((data) => {
        console.log("RESULT", data);
        createTableChildContactRequest({
          child_id: id,
          contact_id: data.id,
        })
          .then(async () => {
            if (data.relationship) {
              const { parent } = relationshipOptions.find(
                (item) => item.value === data.relationship
              );
              console.log("PARENT", parent);
              if (
                data.relationship === "Mother" ||
                data.relationship === "Father"
              ) {
                await createChildContact({
                  child_tree_contact: {
                    child_id: id,
                    parent_id: 0,
                    contact_id: data.id,
                    relationship: data.relationship,
                  },
                });
              } else if (parent) {
                let parentNode = constructed_tree.find((item) => {
                  console.log(item);
                  return item.Relationship === parent;
                });
                console.log("PARENT NODE", parentNode);

                if (!parentNode) {
                  if (parent === "Child") {
                    parentNode = { id: 0 };
                  } else {
                    parentNode = await createChildContact({
                      child_tree_contact: {
                        child_id: id,
                        parent_id: 0,
                        relationship: parent,
                      },
                    });
                  }
                }

                await createChildContact({
                  child_tree_contact: {
                    child_id: id,
                    parent_id: parentNode.id,
                    contact_id: data.id,
                    relationship: data.relationship,
                  },
                });
              }
            }
            toast.success("Contact successfully created!");
          })
          .finally(async () => {
            setIsAddModalOpen(false);
            await refreshContacts();
          });
      })
      .finally(() => setIsAddModalOpen(false));
  };

  console.log("CONTACTS", constructed_tree);

  return (
    <Wrapper>
      {/* <Box d="flex" direction="row-reverse">
        <Button appearance="primary">Print</Button>
        <Button appearance="primary">Export</Button>
      </Box> */}
      <Spacing m={{ b: "20px" }}>
        <OrgChart
          childId={id}
          initialContacts={connections}
          nodes={constructed_tree}
          refreshContacts={refreshContacts}
        />
      </Spacing>
      {/* <Spacing m={{ b: "20px" }}>
        <Box d="flex" justify="space-between">
          <Title size={"16px"}>Contact List</Title>
          <Button appearance="warning" onClick={() => setIsAddModalOpen(true)}>
            Add Contact
          </Button>
        </Box>
      </Spacing> */}
      <ModalDialog
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        heading="Add Contact"
        appearance={null}
        body={
          <AddContactForm
            onSubmit={async (data) => {
              console.log("DATA", data);
              await onAddContact(data).finally(() => refreshContacts());
              console.log("FETCHING");
            }}
            onCancel={() => setIsAddModalOpen(false)}
          />
        }
        hasActions={false}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
