import { useContext } from "react";
import styled from "styled-components";
import { ConnectionContext } from "../Connections/ConnectionModal";

export const ContactInfoTab = () => {
  const { currentConnection } = useContext(ConnectionContext);
  return (
    <div style={{ paddingTop: 17 }}>
      <InfoItem>
        <b>Email:</b>
        <span>
          {currentConnection?.contact?.communications
            ?.filter((cm) => cm.communication_type === "email")
            .map((cm) => (
              <div style={{ width: 200 }}>{cm.value}</div>
            ))}
        </span>
      </InfoItem>
      <InfoItem>
        <b>Address:</b>
        <span>
          {currentConnection?.contact?.communications
            ?.filter((cm) => cm.communication_type === "address")
            .map((cm) => (
              <div style={{ width: 200 }}>{cm.value}</div>
            ))}
        </span>
      </InfoItem>
      <InfoItem>
        <b>Phone:</b>
        <span>
          {currentConnection?.contact?.communications
            ?.filter((cm) => cm.communication_type === "phone")
            .map((cm) => (
              <div style={{ width: 200 }}>{cm.value}</div>
            ))}
        </span>
      </InfoItem>
    </div>
  );
};

const InfoItem = styled.div`
  display: flex;
  margin: 13px 0;
  span,
  b {
    font-size: 15px;
  }
  b {
    margin-right: 15px;
  }
`;
