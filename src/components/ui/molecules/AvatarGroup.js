import Button from "@atlaskit/button";
import { Avatar } from "./Avatar";
import Popup from "@atlaskit/popup";
import { useState } from "react";
import { ButtonItem, PopupMenuGroup, Section } from "@atlaskit/menu";

const MAX_VISIBLE = 3;

export const AvatarGroup = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div w="100%" style={{ display: "flex" }}>
      {data &&
        data.slice(0, MAX_VISIBLE).map((item) => (
          <div style={{ marginRight: "2px" }}>
            <Avatar size="medium" name={item.name} />
          </div>
        ))}
      {data && data.length > MAX_VISIBLE && (
        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          content={() => (
            <div style={{ maxHeight: 200 }}>
              <OtherAvatars data={data.slice(MAX_VISIBLE)} />
            </div>
          )}
          placement="bottom-start"
          trigger={(triggerProps) => (
            <Button
              appearance="subtle"
              {...triggerProps}
              isSelected={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              +{data.length - MAX_VISIBLE}
            </Button>
          )}
        />
      )}
    </div>
  );
};

const OtherAvatars = ({ data }) => {
  return (
    <PopupMenuGroup onClick={(e) => e.stopPropagation()}>
      <Section>
        {data.map((item) => (
          <ButtonItem>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar size="small" name={item.name} />
              <span style={{ marginLeft: "6px" }}>{item.name}</span>
            </div>
          </ButtonItem>
        ))}
      </Section>
    </PopupMenuGroup>
  );
};
