import Button from "@atlaskit/button";
import Select from "@atlaskit/select";
import Textfield from "@atlaskit/textfield";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  fetchPhoneNumbers,
  fetchPhoneSettings,
  purchasePhone
} from "../../api/settings";
import { useAuth } from "../../context/auth/authContext";
import { Box, Label, Spacing } from "../ui/atoms";
import { ModalDialog } from "../ui/common";

function PhoneSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const { user } = useAuth();
  const [phone, setPhone] = useState({});

  useEffect(() => {
    fetchPhone();
  }, []);

  const fetchPhone = () => fetchPhoneSettings().then(setPhone);

  useEffect(() => {
    if (isModalOpen) {
      fetchNumbers();
    }
  }, [isModalOpen]);

  const fetchNumbers = () => {
    fetchPhoneNumbers().then(setNumbers);
  };

  const handlePhoneChange = () => {
    console.log(selectedPhone, user);
    setFetching(true)
    purchasePhone({
      phone: selectedPhone.value,
      friendly_name: selectedPhone.label,
      organization_id: user.selectedOrganization.value.id,
    })
      .then(() => {
        toast.success("Changed successfully!");
      })
      .catch(() => {
        toast.error("Catched error!");
      })
      .finally(() => {
        setIsModalOpen(false);
        fetchPhone();
        setFetching(false)
      });
  };

  console.log("PHONNEE", phone);

  return (
    <div>
      <Spacing m="30px 10px">
        <Box d="flex">
          <Box>
            <Label htmlFor={"phone"}>Your current phone</Label>
            <Textfield
              style={{ width: 350 }}
              disabled={true}
              name={"phone"}
              value={phone?.phone || `+13238706031`}
            />
          </Box>

          <Spacing m="23px 10px">
            {phone?.phone ? null : (
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
                Change
              </Button>
            )}
          </Spacing>
        </Box>
        <ModalDialog
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          isLoading={fetching}
          onClick={() => handlePhoneChange()}
          heading="Change the phone number"
          positiveLabel="Select"
          width="small"
          body={
            <>
              <Select
                className="multi-select"
                classNamePrefix="react-select"
                onChange={setSelectedPhone}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                options={numbers?.map((item) => ({
                  value: item.phone_number,
                  label: item.friendly_name,
                }))}
                placeholder="Choose a phone number"
              />
            </>
          }
        />
      </Spacing>
    </div>
  );
}

export default PhoneSettings;
