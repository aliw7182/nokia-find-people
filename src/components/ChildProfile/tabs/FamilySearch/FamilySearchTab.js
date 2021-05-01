import Button, { ButtonGroup } from "@atlaskit/button";
import React, { useContext, useEffect, useState } from "react";
import { ChildContext } from "../../../../pages/ChildProfilePage";
import { Box, Spacing, Title } from "../../../ui/atoms";
import { FamilySearchItem, AddSearchResultForm, GeneratedPDF } from "./";
import Drawer from "@atlaskit/drawer";
import { ModalDialog } from "../../../ui/common";
import { AutomatedSearch } from "./AutomatedSearch";
import { fetchSearchVectorsRequest } from "../../../../api/searchVectors/searchVectorsRequests";

export function FamilySearchTab() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAutomatedOpen, setIsAutomatedOpen] = useState(false);
  const [vectors, setVectors] = useState([]);
  const {
    searchResultState: { searchResults },
    fetchSearchResults,
  } = useContext(ChildContext);

  useEffect(() => {
    fetchSearchVectors();
  }, []);

  const fetchSearchVectors = () => {
    fetchSearchVectorsRequest({}).then((data) =>
      setVectors(
        data.map((item) => ({
          label: item.name,
          value: item.id,
          in_continuous_search: item.in_continuous_search,
        }))
      )
    );
  };
  return (
    <div style={{ width: "100%" }}>
      <Spacing m={{ t: "23px", b: "40px" }}>
        <Box w="100%" d="flex" direction="row-reverse">
          <ButtonGroup appearance="primary">
            <Button onClick={() => setIsAutomatedOpen(true)}>
              Run Automated Search
            </Button>
            {!isFormVisible && (
              <Button onClick={() => setIsFormVisible(true)}>
                Add New Search Result
              </Button>
            )}
            <Button onClick={() => setIsExportOpen(true)}>
              Export Search Result
            </Button>
          </ButtonGroup>
          <Drawer
            onClose={() => setIsExportOpen(false)}
            isOpen={isExportOpen}
            width={"extended"}
          >
            <GeneratedPDF searchResults={searchResults || []} />
          </Drawer>
          <ModalDialog
            isOpen={isAutomatedOpen}
            setIsOpen={setIsAutomatedOpen}
            heading="Run Automated Search"
            hasActions={false}
            body={
              <AutomatedSearch
                vectors={vectors.filter(
                  (vector) => vector.in_continuous_search
                )}
                fetch={fetchSearchResults}
                setIsOpen={setIsAutomatedOpen}
              />
            }
          />
        </Box>
        <Spacing
          m={{ b: "15px" }}
          style={{ display: isFormVisible ? "block" : "none" }}
        >
          <AddSearchResultForm
            vectors={vectors.filter((vector) => !vector.in_continuous_search)}
            setIsFormVisible={setIsFormVisible}
          />
        </Spacing>

        <Spacing m={{ t: "20px" }}>
          {searchResults.filter(
            (searchResult) => searchResult.date_accepted === null
          ).length > 0 && (
            <div style={{ marginBlock: 20 }}>
              <Title>Possible Search Results</Title>
            </div>
          )}
          {searchResults
            .filter((searchResult) => searchResult.date_accepted === null)
            .map(
              (item) =>
                item && (
                  <FamilySearchItem
                    item={item}
                    vectors={vectors}
                    fetch={fetchSearchResults}
                  />
                )
            )}
          {searchResults.filter(
            (searchResult) => searchResult.date_accepted !== null
          ).length > 0 && (
            <div style={{ marginBlock: 20 }}>
              <Title>Accepted Search Results</Title>
            </div>
          )}
          {searchResults
            .filter((searchResult) => searchResult.date_accepted !== null)
            .map(
              (item) =>
                item && (
                  <FamilySearchItem
                    item={item}
                    vectors={vectors}
                    fetch={fetchSearchResults}
                  />
                )
            )}
        </Spacing>
      </Spacing>
    </div>
  );
}
