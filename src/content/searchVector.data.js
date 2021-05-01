import Button, { ButtonGroup } from "@atlaskit/button";
import { Box } from "../components/ui/atoms";
import Lozenge from "@atlaskit/lozenge";
import { Avatar } from "../components/ui/molecules/Avatar";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import EditIcon from "@atlaskit/icon/glyph/edit";
import Can from "../accessControl/Can";
import { SEARCHVECTOR } from "../helpers";
import { ACTIONS } from "../accessControl/actions";

const searchVectorTableData = (
  data,
  setIsOpen,
  setCurrentSearchVector,
  setIsAddModalOpen
) =>
  data.map((item, index) => ({
    key: index,
    id: item.id,
    cells: [
      {
        key: "name",
        content: <p align="left">{item.name}</p>,
      },
      {
        key: "description",
        content: (
          <p
            align="left"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></p>
        ),
      },
      // {
      //   key: "in_continuous_search",
      //   content: <p align="left">{item.in_continuous_search ? "Yes" : "No"}</p>,
      // },
      {
        key: "priority",
        content: <p align="center">{`${Math.floor(Math.random() * 6)}`}</p>,
      },
      {
        key: "Actions",
        content: (
          <div align="center">
            <Can
              perform={`${SEARCHVECTOR}:${ACTIONS.EDIT}`}
              yes={() => (
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      setIsAddModalOpen(true);
                      setCurrentSearchVector(item);
                    }}
                    height="32px"
                    width="32px"
                  >
                    <EditIcon size="small" />
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentSearchVector(item);
                    }}
                    height="32px"
                    width="32px"
                  >
                    <CrossIcon size="small" />
                  </Button>
                </ButtonGroup>
              )}
            />
          </div>
        ),
      },
    ],
  }));

const inContinuousSearchOptions = [
  {
    label: "Yes",
    value: true,
  },
  { label: "No", value: false },
];

export { searchVectorTableData, inContinuousSearchOptions };
