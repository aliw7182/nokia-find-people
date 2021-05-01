import Button from "@atlaskit/button";
import Tag from "@atlaskit/tag";
import Textfield from "@atlaskit/textfield";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authenticateDomain, fetchEmailSettings } from "../../api/settings";
import { useAuth } from "../../context/auth/authContext";
import { Preloader } from "../../pages";
import { Box, Label, Spacing } from "../ui/atoms";
import { ModalDialog } from "../ui/common";

function EmailSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [newDomainName, setNewDomainName] = useState("");
  const { user } = useAuth();
  const [email, setEmail] = useState({});

  useEffect(() => {
    fetchEmail();
  }, []);

  const fetchEmail = () => {
    setFetching(true);
    fetchEmailSettings()
      .then(setEmail)
      .finally(() => setFetching(false));
  };

  const handleDomainChange = () => {
    setFetching(true);
    authenticateDomain({
      domain: {
        name: newDomainName,
        organization_id: user.selectedOrganization.value.organization.id,
      },
    })
      .then(() => {
        toast.success("Changed successfully!");
      })
      .catch(() => {
        toast.error("Catched error!");
      })
      .finally(() => {
        setIsModalOpen(false);
        fetchEmail();
        setFetching(false);
      });
  };

  console.log("EMAIL", email);

  return (
    <div>
      <Spacing m="30px 10px">
        <Box d="flex">
          {fetching ? (
            <div style={{ width: 660, margin: "10px auto" }}>
              <Preloader />
            </div>
          ) : (
            <>
              <Box>
                <Label htmlFor={"domain"}>Authenticated domain name</Label>
                <Textfield
                  style={{ width: 350 }}
                  disabled={true}
                  name={"domain"}
                  value={email?.domain || "Don`t have a domain name"}
                />
                <Box>
                  {email?.dns ? (
                    <>
                      <div
                        style={{
                          marginTop: 25,
                          marginBottom: 20,
                          fontSize: 17,
                        }}
                      >
                        To verify your domain, set this records to you DNS
                        config
                      </div>
                      {Object.keys(email?.dns).map((key) => {
                        return (
                          <Box
                            d="flex"
                            align="center"
                            justify="center"
                            style={{ marginBottom: 10 }}
                          >
                            <div
                              style={{
                                textAlign: "left",
                                width: 100,
                                marginRight: 20,
                              }}
                            >
                              {key.toUpperCase()}
                            </div>
                            <div style={{ marginRight: 20 }}>
                              <Tag
                                isRemovable={false}
                                text={
                                  email?.dns[key]?.valid
                                    ? "CONFIRMED"
                                    : "PENDING"
                                }
                                color={
                                  email?.dns[key]?.valid ? "green" : "yellow"
                                }
                              />
                            </div>

                            <div style={{ marginRight: 20, marginTop: -15 }}>
                              <Label htmlFor={"host"}>Host</Label>
                              <Textfield
                                style={{ width: 200 }}
                                name={"host"}
                                value={email?.dns[key]?.host}
                              />
                            </div>
                            <div style={{ marginRight: 10, marginTop: -15 }}>
                              <Label htmlFor={"data"}>Data</Label>
                              <Textfield
                                style={{ width: 250 }}
                                name={"data"}
                                value={email?.dns[key]?.data}
                              />
                            </div>
                          </Box>
                        );
                      })}
                    </>
                  ) : null}
                </Box>
              </Box>
              <Spacing m="23px 10px">
                {email?.domain ? null : (
                  <Button
                    size="large"
                    style={{
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => setIsModalOpen(true)}
                    appearance="primary"
                  >
                    Authenticate
                  </Button>
                )}
              </Spacing>
            </>
          )}
        </Box>
        <ModalDialog
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          isLoading={fetching}
          isDisabled={!(newDomainName?.length > 0)}
          onClick={() => handleDomainChange()}
          heading="Authenticate the domain name"
          positiveLabel="Confirm"
          width="small"
          body={
            <>
              <Textfield
                style={{ width: 350 }}
                disabled={true}
                onChange={(e) => setNewDomainName(e.target.value)}
                name={"domain"}
                value={newDomainName}
              />
            </>
          }
        />
      </Spacing>
    </div>
  );
}

export default EmailSettings;
