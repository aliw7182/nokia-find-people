import React, { useContext, useEffect, useState } from "react";
import { templatesSentTableColumns } from "../../../../content/columns.data";
import { templatesSentTableData } from "../../../../content/templatesSent.data";
import { Spacing, Title } from "../../../ui/atoms";
import { Table } from "../../../ui/common/Table";
import { ConnectionContext } from "./ConnectionModal";

const TemplatesSentTab = () => {
  const {
    templateState: { templates, loading },
  } = useContext(ConnectionContext);

  const [toggled, setToggled] = useState([
    Array(templates?.length).fill(false),
  ]);

  useEffect(() => {
    setToggled(Array(templates?.length).fill(false));
  }, [templates]);

  const handleToogle = (index) => {
    const toggleCopy = toggled;
    toggled[index] = !toggled[index];
    setToggled([...toggleCopy]);
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Title size="18px" style={{ marginTop: 30 }}>
        Messages sent to this user
      </Title>
      <Spacing m={{ t: "23px" }}>
        <Table
          emptyView="Empty"
          pending={loading}
          head={templatesSentTableColumns}
          items={templatesSentTableData(templates, handleToogle, toggled)}
        />
      </Spacing>
    </div>
  );
};

export default TemplatesSentTab;
