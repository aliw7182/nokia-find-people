import Button, { ButtonGroup } from "@atlaskit/button";
import ArrowDownIcon from "@atlaskit/icon/glyph/arrow-down";
import ArrowUpIcon from "@atlaskit/icon/glyph/arrow-up";
import PdfIcon from "@atlaskit/icon/glyph/pdf";
import { SimpleTag as Tag } from "@atlaskit/tag";
import { Text } from "@chakra-ui/react";
import moment from "moment";
import { ACTIONS } from "../accessControl/actions";
import Can from "../accessControl/Can";
import { COMMUNICATION_TEMPLATES } from "../helpers";
import { authURL } from "../utils/request";
import { humanReadableDateFormat } from "./date";

const colors = {
  failed: "red",
  queued: "yellow",
  sent: "teal",
  delivered: "green",
  open: "green",
};

const templatesSentTableData = (data, setToggled, toggled) => {
  return data.reduce((array, item, index) => {
    const newArr = [
      ...array,
      {
        key: index,
        cells: [
          {
            key: "date",
            content: moment(item?.created_at).format(humanReadableDateFormat),
          },
          {
            key: "template_type",
            content: item?.communication_template?.template_type,
          },
          {
            key: "opened",
            content: (
              <Tag
                text={
                  item?.opened?.toUpperCase() ||
                  (item?.communication_template?.template_type === "Letter"
                    ? "GENERATED"
                    : "PENDING")
                }
                color={colors[item?.opened] || (item?.communication_template?.template_type === "Letter"
                ? "green"
                : "yellow")}
              />
            ),
          },
          {
            key: "updated_at",
            content: moment(item?.updated_at).format(humanReadableDateFormat),
          },
          {
            key: "actions",
            content: (
              <Toogler
                toggled={toggled[index]}
                onToggle={() => setToggled(index)}
              />
            ),
          },
        ],
      },
    ];
    return toggled[index]
      ? [
          ...newArr,
          {
            key: index,
            cells: [
              {
                key: "content",
                content: (
                  <div>
                    <Button
                      style={{ marginLeft: 10 }}
                      iconBefore={<PdfIcon />}
                      appearance="warning"
                      onClick={() =>
                        window.open(
                          `${authURL}/templates_sent/generate_pdf.pdf?id=${item.id}`
                        )
                      }
                    >
                      Get as PDF
                    </Button>{" "}
                    <Text
                      dangerouslySetInnerHTML={{
                        __html: `<div style="padding: 10px"><b>Content</b>: <br /> <div style="padding:10px">${item?.content}</div></div>`,
                      }}
                    />
                  </div>
                ),
                colSpan: 5,
              },
            ],
          },
        ]
      : newArr;
  }, []);
};

const Toogler = ({ toggled, onToggle }) => {
  return (
    <div align="center">
      <Can
        perform={`${COMMUNICATION_TEMPLATES}:${ACTIONS.EDIT}`}
        yes={() => (
          <ButtonGroup>
            <Button onClick={onToggle} height="32px" width="32px">
              {toggled ? (
                <ArrowUpIcon size="small" />
              ) : (
                <ArrowDownIcon size="small" />
              )}
            </Button>
          </ButtonGroup>
        )}
      />
    </div>
  );
};

export { templatesSentTableData };
