import Button, { ButtonGroup } from "@atlaskit/button";
import "@atlaskit/css-reset";
import EmailIcon from "@atlaskit/icon/glyph/email";
import MentionIcon from "@atlaskit/icon/glyph/mention";
import MobileIcon from "@atlaskit/icon/glyph/mobile";
import NotificationIcon from "@atlaskit/icon/glyph/notification-direct";
import PeopleIcon from "@atlaskit/icon/glyph/people";
import WatchIcon from "@atlaskit/icon/glyph/watch";
import Select from "@atlaskit/select";
import Tag from "@atlaskit/tag";
import TagGroup from "@atlaskit/tag-group";
import { Text } from "@chakra-ui/react";
import React, {
  memo,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createActionItemRequest } from "../api/actionItems/actionItemRequest";
import {
  createChildSiblingsRequest,
  createChildUserRequest,
  fetchChildrenRequest,
  fetchChildSiblings,
  fetchChildUsersRequest,
  fetchConnectionsRequest,
  fetchFamilyTreeRequest,
  fetchSchoolDistrictsRequest,
  removeChildSiblingsRequest,
  removeChildUserRequest,
} from "../api/children";
import {
  fetchCommunicationTemplateRequest,
  sendCommunicationTemplateToUserRequest,
} from "../api/communicationTemplates";
import {
  ChildInformation,
  ChildTabs,
  RelativesList,
} from "../components/ChildProfile";
import { PossibleSiblingsList } from "../components/ChildProfile/PossibleSiblingsList";
import { SiblingsList } from "../components/ChildProfile/SiblingsList";
import { AddChildForm } from "../components/Children";
import { Box, Label, Rectangle, Spacing, Title } from "../components/ui/atoms";
import { ModalDialog } from "../components/ui/common";
import { MyBreadcrumbs } from "../components/ui/common/MyBreadcrumbs";
import { AvatarGroup } from "../components/ui/molecules/AvatarGroup";
import { constructTree } from "../content/childContact.tree.data";
import { getLocalStorageUser } from "../context/auth/authProvider";
import { updateChild } from "../context/children/childProvider";
import { CHILDREN } from "../helpers";
import {
  attachmentReducer,
  fetchAttachmentsFailure,
  fetchAttachmentsRequest,
  fetchAttachmentsSuccess,
  initialState as attachmentInitialState,
} from "../reducers/attachment";
import { childReducer } from "../reducers/child";
import {
  childProfileReducer,
  fetchChildFailure,
  fetchChildRequest,
  fetchChildSuccess,
  fetchChildUsersFailure,
  fetchChildUsersSuccess,
  initialState,
} from "../reducers/childProfile";
import {
  commentReducer,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess,
  initialState as commentInitialState,
} from "../reducers/comment";
import {
  connectionReducer,
  fetchConnectionsFailure,
  fetchConnectionsSuccess,
  initialState as connectionInitialState,
} from "../reducers/connection";
import {
  familyTreeReducer,
  fetchFamilyTreeFailure,
  fetchFamilyTreeSuccess,
  initialState as familyTreeInitialState,
} from "../reducers/familyTree";
import {
  fetchSearchResultsFailure,
  fetchSearchResultsRequest,
  fetchSearchResultsSuccess,
  initialState as searchResultInitialState,
  searchResultReducer,
} from "../reducers/searchResult";
import { authURL } from "../utils/request";
import { Preloader } from "./Preloader";

export const ChildContext = React.createContext();

export function ChildProfilePage(props) {
  const comment_id = new URLSearchParams(props.location.search).get("comment");
  const id = props.match.params.id;
  const user = getLocalStorageUser();
  const [templates, setTemplates] = useState([]);
  const [siblings, setSiblings] = useState({ siblings: [], possible: [] });
  const [templateType, setTemplateType] = useState("");
  const [templatePending, setTemplatePending] = useState(false);
  const [templateHtml, setTemplateHtml] = useState("");
  const [templatePreview, setTemplatePreview] = useState("");
  const [templateUser, setTemplateUser] = useState([]);
  const [templateId, setTemplateId] = useState();
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [assignedUsers, setAssignedUsers] = useState(null);
  const [children, setChildren] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState(null);
  const [validationState, setValidationState] = useState("default");
  const [buttonPending, setButtonPending] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenChildSelect, setIsOpenChildSelect] = useState(false);
  const history = useHistory();

  const [state, dispatch] = useReducer(childProfileReducer, initialState);
  const [childrenState, dispatchChildren] = useReducer(
    childReducer,
    initialState
  );

  const [connectionState, connectionDispatch] = useReducer(
    connectionReducer,
    connectionInitialState
  );
  const [familyTreeState, familyTreeDispatch] = useReducer(
    familyTreeReducer,
    familyTreeInitialState
  );
  const [commentState, commentDispatch] = useReducer(
    commentReducer,
    commentInitialState
  );
  const [attachmentState, attachmentDispatch] = useReducer(
    attachmentReducer,
    attachmentInitialState
  );
  const [searchResultState, searchResultDispatch] = useReducer(
    searchResultReducer,
    searchResultInitialState
  );

  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [schoolDistrictOptions, setSchoolDistrictsOptions] = useState([]);

  useEffect(() => {
    dispatch(fetchChildRequest());
    fetchSchoolDistricts();
    fetchChildrenRequest({ view: "short" }).then(setChildren);
    fetchChildProfile();
    fetchFamilyTree();
    fetchTemplates();
    fetchSiblings();
    fetchComments();
    fetchAttachments();
    fetchSearchResults();
    (user.role === "admin" || user.role === "manager") && fetchChildUsers();
  }, []);

  useEffect(() => {
    setTemplateHtml("");
    setTemplatePreview("");
    setFilteredTemplates(
      templates
        .filter((item) => item.template_type === templateType)
        .map((item) => ({
          value: item,
          label: `${item.name} - ${item.template_type}`,
        }))
    );
  }, [templateType]);

  useEffect(() => {
    console.log("TEmplate User", templateUser);
    const firstUser = templateUser && templateUser[0]?.value;
    const text = templateHtml
      .replaceAll(
        "{{child_name}}",
        `${state.child?.first_name} ${state.child?.last_name}`
      )
      .replaceAll("{{contact_name}}", `${firstUser?.fullName}`)
      .replaceAll(
        "{{orgranization_name}}",
        localStorage.getItem("organizationName")
      );
    setTemplatePreview(text);
  }, [templateHtml, templateUser, state.child]);

  const fetchSiblings = () => fetchChildSiblings(id).then(setSiblings);

  const createSiblings = (sibling_id) => {
    const data = {
      siblingship: {
        child_id: id,
        sibling_id,
      },
    };

    return createChildSiblingsRequest(data).then(fetchSiblings);
  };

  const fetchTemplates = () => {
    fetchCommunicationTemplateRequest().then((data) => {
      setTemplates(data);
    });
  };

  const fetchChildProfile = () => {
    fetchChildrenRequest({ id: id, view: "extended" })
      .then((item) => item && dispatch(fetchChildSuccess(item)))
      .catch((e) => dispatch(fetchChildFailure(e.message)));
  };

  const fetchChildUsers = useCallback(() => {
    fetchChildUsersRequest({ id: id })
      .then(
        (item) =>
          item &&
          dispatch(
            fetchChildUsersSuccess({
              child_users: item.child_users,
              not_child_users: item.not_child_users,
            })
          )
      )
      .catch((e) => dispatch(fetchChildUsersFailure(e.message)));
  }, [id]);

  const fetchConnections = () => {
    fetchConnectionsRequest({ id: id })
      .then(
        (item) =>
          item &&
          item.contacts &&
          connectionDispatch(fetchConnectionsSuccess(item.contacts))
      )
      .catch((e) => connectionDispatch(fetchConnectionsFailure(e.message)));
  };

  const fetchFamilyTree = () => {
    fetchFamilyTreeRequest({ id: id })
      .then(
        (item) =>
          item &&
          item.family_tree &&
          familyTreeDispatch(
            fetchFamilyTreeSuccess({
              family_tree: item.family_tree,
              constructed_tree: constructTree({
                contacts: item.family_tree,
                firstName: item.first_name,
                lastName: item.last_name,
              }),
            })
          )
      )
      .catch((e) => familyTreeDispatch(fetchFamilyTreeFailure(e.message)));
  };

  const fetchComments = () => {
    commentDispatch(fetchCommentsRequest());
    fetchChildrenRequest({ id: id, view: "comments" })
      .then(
        (data) =>
          data &&
          data.comments &&
          commentDispatch(fetchCommentsSuccess(data.comments))
      )
      .catch((e) => commentDispatch(fetchCommentsFailure(e.message)));
  };

  const fetchAttachments = () => {
    attachmentDispatch(fetchAttachmentsRequest());
    fetchChildrenRequest({ id, view: "attachments" })
      .then(
        (data) =>
          data &&
          data.attachments &&
          attachmentDispatch(fetchAttachmentsSuccess(data.attachments))
      )
      .catch((e) => attachmentDispatch(fetchAttachmentsFailure(e.message)));
  };

  const fetchSearchResults = async () => {
    searchResultDispatch(fetchSearchResultsRequest());
    await fetchChildrenRequest({ id, view: "family_searches" })
      .then(
        (data) =>
          data &&
          data.family_searches &&
          searchResultDispatch(fetchSearchResultsSuccess(data.family_searches))
      )
      .catch((e) => attachmentDispatch(fetchSearchResultsFailure(e.message)));
  };

  const fetchSchoolDistricts = () => {
    fetchSchoolDistrictsRequest().then((data) => {
      setSchoolDistrictsOptions(
        data.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    });
  };

  const onRemoveSiblingship = async (id) => {
    removeChildSiblingsRequest(id)
      .then(() => toast.success("Successfully removed!"))
      .catch(() => toast.error("Happened error!"))
      .finally(() => {
        fetchSiblings();
      });
  };

  const handleChildrenSelect = async () => {
    console.log("SELECTED CHILDREN", selectedChildren);
    let promises = [];
    for (let i = 0; i < selectedChildren?.length; i++) {
      const sibling_id = selectedChildren && selectedChildren[i]?.value;
      if (sibling_id) {
        promises.push(createSiblings(sibling_id));
      }
    }

    Promise.all(promises)
      .then(() => toast.success("Successfully created!"))
      .catch(() => toast.error("Happened error!"))
      .finally(() => {
        setIsOpenChildSelect(false);
        fetchSiblings();
      });
  };

  const handleTemplateSendSubmit = async () => {
    let promises = [];
    for (let i = 0; i < templateUser?.length; i++) {
      const user = templateUser && templateUser[i]?.value;
      if (user) {
        promises.push(sendTemplateToUser(user));
      }
    }

    Promise.all(promises)
      .then(() => toast.success("Successfully sent!"))
      .catch(() => toast.error("Happened error!"))
      .finally(() => {
        setTemplatePending(false);
        setIsTemplateOpen(false);
        setTemplateHtml("");
        setTemplateUser();
      });
  };

  const sendTemplateToUser = async (connection) => {
    const text = templateHtml
      .replaceAll(
        "{{child_name}}",
        `${state.child?.first_name} ${state.child?.last_name}`
      )
      .replaceAll("{{contact_name}}", `${connection?.fullName}`)
      .replaceAll(
        "{{orgranization_name}}",
        localStorage.getItem("organizationName")
      );
    const body = {
      email: connection?.value,
      contact_id: connection?.contact?.id,
      template_id: templateId,
      child_contact_id: connection.child_contact_id,
      child_id: id,
      content: text,
      template_type: templateType,
      phone: connection?.value,
    };
    console.log(body);

    setTemplatePending(true);
    await sendCommunicationTemplateToUserRequest({ template_send: body }).then(
      (res) => {
        if (templateType === "Letter") {
          window.open(
            `${authURL}/templates_sent/generate_pdf.pdf?id=${res.id}`,
            "",
            "width=1000, height=500"
          );
        }
      }
    );
    fetchConnections();
  };

  const onSubmitUsers = async () => {
    !assignedUsers && setValidationState("error");
    setButtonPending(true);
    if (assignedUsers) {
      await createChildUserRequest({
        user_child: {
          users: assignedUsers.map((item) => ({
            user_id: item.value,
            child_id: state.child.id,
            date_approved: new Date(),
            date_denied: null,
          })),
        },
      });
      await createActionItemRequest({
        action_item: {
          items: assignedUsers.map((item) => ({
            title: "Access granted",
            description: `You have been assigned to a child`,
            child_id: state.child.id,
            user_id: item.value,
            action_type: "access_granted",
          })),
        },
      })
        .then(() => {
          toast.success("Assigned successfully!");
          fetchChildUsers();
        })
        .finally(() => {
          setButtonPending(false);
          setIsOpen(false);
        });
    } else {
      setButtonPending(false);
    }
  };

  const openModal = () => {
    setAssignedUsers(null);
    setIsOpen(true);
  };

  const AssignedUser = memo(({ data }) => (
    <div style={{ marginLeft: "8px" }}>
      <AvatarGroup data={data} />
    </div>
  ));

  const assignUser = () => {
    user?.role === "user" &&
      createChildUserRequest({
        user_child: {
          users: [
            {
              user_id: user.id,
              child_id: id,
            },
          ],
        },
      }) &&
      createActionItemRequest({
        action_item: {
          title: "Child Permission Request",
          description: `${user.first_name} ${user.last_name} has requested access for ${state.child.first_name} ${state.child.last_name}`,
          child_id: id,
          related_user_id: user.id,
          action_type: "access_request",
        },
      }).then(() => history.goBack());
  };

  const removeUser = (id) => {
    removeChildUserRequest(id)
      .then(async () => await fetchChildUsers())
      .catch((e) => console.log(e));
  };

  console.log("CHILDREn", childrenState);

  return (
    <ChildContext.Provider
      value={{
        state,
        commentState,
        connectionState,
        attachmentState,
        familyTreeState,
        searchResultState,
        dispatch,
        connectionDispatch,
        attachmentDispatch,
        fetchConnections,
        fetchFamilyTree,
        fetchChildSiblings,
        fetchComments,
        fetchAttachments,
        fetchSearchResults,
        setCurrentCommentId,
        loading: state.loading,
      }}
    >
      {state.loading ? (
        <Preloader />
      ) : state.hasAccess ? (
        <>
          <ModalDialog
            isOpen={isOpenEdit}
            setIsOpen={setIsOpenEdit}
            width="medium"
            hasActions={false}
            body={
              <Box d="flex" direction="column" align="center">
                <Spacing m={{ t: "30px" }}>
                  <Title>Edit Child Profile</Title>
                </Spacing>
                <Spacing m={{ b: "30px" }}>
                  <AddChildForm
                    onSubmit={updateChild}
                    setIsOpenEdit={setIsOpenEdit}
                    child={state.child}
                    fetch={fetchChildProfile}
                    schoolDistrictOptions={schoolDistrictOptions}
                  />
                </Spacing>
              </Box>
            }
          />
          <Box d="flex" justify="space-between">
            <Title>{`${state.child.first_name} ${state.child.last_name}`}</Title>
            {user?.role !== "user" && (
              <>
                <Box d="flex">
                  <ButtonGroup>
                    <Button
                      appearance="primary"
                      iconBefore={<NotificationIcon />}
                    >
                      Set Reminder
                    </Button>
                    <Button
                      appearance="primary"
                      iconBefore={<WatchIcon />}
                      onClick={() => openModal()}
                    >
                      Assign
                    </Button>
                    <Button
                      onClick={() => setIsOpenChildSelect(true)}
                      appearance="primary"
                      iconBefore={<PeopleIcon />}
                    >
                      Siblings
                    </Button>
                  </ButtonGroup>
                  <ModalDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    heading="Assign a User"
                    positiveLabel="Assign"
                    onClick={() => onSubmitUsers()}
                    width="small"
                    isLoading={buttonPending}
                    body={
                      <>
                        <TagGroup>
                          {state.child_users?.map((user) => (
                            <Tag
                              appearance="rounded"
                              text={user.name}
                              onBeforeRemoveAction={() => {
                                removeUser(user.id);
                                return false;
                              }}
                            />
                          ))}
                        </TagGroup>
                        <Select
                          className="multi-select"
                          classNamePrefix="react-select"
                          isMulti
                          menuPortalTarget={document.body}
                          value={assignedUsers}
                          validationState={validationState}
                          onChange={(e) => {
                            setAssignedUsers(e);
                            setValidationState("default");
                          }}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          options={state.not_child_users}
                          placeholder="Choose a User(s)"
                        />
                      </>
                    }
                  />
                  <AssignedUser data={state.child_users || []} />
                </Box>
              </>
            )}
          </Box>
          <Spacing m={{ t: "28px" }}>
            <MyBreadcrumbs
              text1="Children"
              text2={`${state.child.first_name} ${state.child.last_name}`}
              path={`../${CHILDREN}`}
            />
          </Spacing>
          <Spacing m={{ t: "22px" }}>
            <ChildInformation
              child={state.child}
              setIsOpenEdit={setIsOpenEdit}
            />
          </Spacing>
          <Box d="flex">
            <Spacing style={{ width: "50%" }} m={{ t: "22px", r: "20px" }}>
              <RelativesList relatives={connectionState.connections || []} />
            </Spacing>
            <Spacing m={{ t: "22px" }} style={{ width: "50%" }}>
              <Rectangle p="14px 26px 14px 26px">
                <SiblingsList
                  onRemoveSiblingship={onRemoveSiblingship}
                  openModal={() => setIsOpenChildSelect(true)}
                  childId={id}
                  siblings={siblings.siblings}
                />
                <PossibleSiblingsList
                  createSiblings={createSiblings}
                  siblings={siblings.possible}
                />
              </Rectangle>
            </Spacing>
          </Box>
          <Spacing m={{ t: "22px" }}>
            <ModalDialog
              isOpen={isOpenChildSelect}
              setIsOpen={setIsOpenChildSelect}
              heading="Select children"
              positiveLabel="Select"
              onClick={() => handleChildrenSelect()}
              width="small"
              isLoading={buttonPending}
              isDisabled={!selectedChildren}
              body={
                <>
                  <Select
                    className="multi-select"
                    classNamePrefix="react-select"
                    isMulti
                    menuPortalTarget={document.body}
                    value={selectedChildren}
                    validationState={validationState}
                    onChange={(e) => {
                      setSelectedChildren(e);
                    }}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    options={children
                      ?.filter(
                        (child) =>
                          !siblings?.siblings
                            ?.map(({ sibling }) => sibling.id)
                            .includes(child.id) && child.id != id
                      )
                      .map((child) => ({
                        value: child.id,
                        label: `${child?.first_name} ${child?.last_name}`,
                      }))}
                    placeholder="Select children"
                  />
                </>
              }
            />
          </Spacing>
          <Spacing m={{ t: "16px" }}>
            <Box d="flex">
              <ButtonGroup>
                <Button
                  appearance="primary"
                  onClick={() => {
                    setTemplateType("Letter");
                    setIsTemplateOpen(true);
                  }}
                  iconBefore={<EmailIcon />}
                  //isSelected
                >
                  Generate Letter
                </Button>
                <Button
                  appearance="primary"
                  onClick={() => {
                    setTemplateType("Email");
                    setIsTemplateOpen(true);
                  }}
                  iconBefore={<MentionIcon />}
                  //isSelected
                >
                  Send Email
                </Button>
                <Button
                  appearance="primary"
                  onClick={() => {
                    setTemplateType("SMS");
                    setIsTemplateOpen(true);
                  }}
                  iconBefore={<MobileIcon />}
                  //isSelected
                >
                  Send SMS Text
                </Button>
              </ButtonGroup>
            </Box>
          </Spacing>
          <ModalDialog
            isOpen={isTemplateOpen}
            setIsOpen={setIsTemplateOpen}
            onClick={handleTemplateSendSubmit}
            heading="Choose Template"
            positiveLabel="Send"
            isLoading={templatePending}
            isDisabled={!templateUser || templateHtml === ""}
            body={
              <div>
                <Spacing m="10px 0px">
                  <Select
                    className="multi-select"
                    classNamePrefix="react-select"
                    menuPortalTarget={document.body}
                    onChange={(e) => setTemplateUser(e)}
                    isMulti
                    value={templateUser}
                    validationState={validationState}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    options={
                      templateType === "Letter"
                        ? connectionState.connections.map((item) => ({
                            label: `${item?.contact?.first_name} ${item?.contact?.last_name}`,
                            value: {
                              ...item,
                              fullName: `${item?.contact?.first_name} ${item?.contact?.last_name}`,
                            },
                          }))
                        : connectionState.connections
                            .reduce(
                              (a, { contact }) =>
                                a.concat(
                                  contact.communications
                                    .filter((item) => {
                                      if (templateType === "SMS") {
                                        return (
                                          item.communication_type === "phone"
                                        );
                                      } else if (templateType === "Email") {
                                        return (
                                          item.communication_type === "email"
                                        );
                                      }
                                    })
                                    .map((item) => ({
                                      ...item,
                                      fullName: `${contact?.first_name} ${contact?.last_name}`,
                                      child_contact_id: contact?.id,
                                    }))
                                ),
                              []
                            )
                            .map((item) => ({
                              label: `${item?.fullName}  ${item?.value}`,
                              value: item,
                            }))
                    }
                    placeholder="Choose contact"
                  />
                </Spacing>
                <Select
                  className="select"
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}
                  onChange={(e) => {
                    console.log("EEE", e, state.child);
                    setTemplateId(e.value.id);
                    setTemplateHtml(
                      templateType === "SMS"
                        ? e.value.content.replace(/<(?:.|\n)*?>/gm, "")
                        : e.value.content
                    );
                    setValidationState("default");
                  }}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  options={filteredTemplates}
                  placeholder="Choose Template"
                />

                <Spacing style={{ marginTop: 15, marginBottom: 15 }}>
                  <Label>Template Preview</Label>
                </Spacing>
                <Text
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                  dangerouslySetInnerHTML={{ __html: templatePreview }}
                />
                {/* <Spacing m={{ t: "20px" }}>
                  {dynamicVariables.map((variable) => {
                    const inputName = variable.substring(
                      2,
                      variable.length - 2
                    );
                    return (
                      <TextInput
                        className="input"
                        width={350}
                        name={inputName}
                        register={register({ required: false })}
                        control={control}
                        error={errors[inputName]}
                        label={inputName}
                      />
                    );
                  })}
                </Spacing> */}
              </div>
            }
          />
          <Spacing m={{ t: "40px" }}>
            <ChildTabs currentCommentId={currentCommentId} />
          </Spacing>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {state.child.first_name ? (
            <>
              <h4 style={{ marginBottom: "10px" }}>
                You do not have access to view this child's profile
              </h4>
              <Box>
                {!state.child.request_pending ? (
                  <Button onClick={() => assignUser()} appearance="primary">
                    Request access
                  </Button>
                ) : (
                  <Button isDisabled>Request pending</Button>
                )}
                <Button
                  onClick={() => history.goBack()}
                  appearance="subtle-link"
                >
                  Go back
                </Button>
              </Box>
            </>
          ) : (
            <>
              <h4 style={{ marginBottom: "10px" }}>Child not found</h4>
              <Button onClick={() => history.goBack()} appearance="subtle-link">
                Go back
              </Button>
            </>
          )}
        </div>
      )}
    </ChildContext.Provider>
  );
}
