import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import PeopleIcon from "@atlaskit/icon/glyph/people";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone-uploader";
import { useHistory } from "react-router-dom";
import Folder48Icon from "@atlaskit/icon-file-type/glyph/folder/48";
import { AddChildForm } from "../components/Children";
import { Box, Spacing, Title } from "../components/ui/atoms";
import { ModalDialog } from "../components/ui/common";
import {
  DropzoneLayout,
  DropzonePreview,
  DropzoneSubmitButton,
} from "../components/ui/molecules";
import { createChild } from "../context/children/childProvider";
import { parse } from "papaparse";
import { ImportChildren } from "../components/Children/ImportChildren";
import { fetchSchoolDistrictsRequest } from "../api/children";

export const AddChildPage = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState([]);
  const [isImport, setIsImport] = useState();
  const [schoolDistrictOptions, setSchoolDistrictsOptions] = useState([]);
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  const handleSubmit = (files) => {
    let data = [];
    files.forEach(async (object, index) => {
      const text = await object.file.text();
      const result = parse(text, { header: true });
      result.data.pop();
      data.push(result.data);
      if (index === files.length - 1) {
        setChildren(data);
        setIsImport(true);
        setIsOpen(false);
      }
    });
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

  useEffect(() => {
    fetchSchoolDistricts();
  }, []);

  return (
    <>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        width="small"
        hasActions={false}
        body={
          <div style={{ padding: "20px 0" }}>
            <Dropzone
              inputContent={
                <Box d="flex" direction="column" align="center">
                  <Folder48Icon size="xlarge" />
                  <span style={{ fontSize: "15px" }}>Drop .csv File</span>
                </Box>
              }
              PreviewComponent={DropzonePreview}
              LayoutComponent={(e) => (
                <DropzoneLayout {...e} setIsOpen={setIsOpen} />
              )}
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              accept="text/csv"
              submitButtonContent="Upload"
              SubmitButtonComponent={DropzoneSubmitButton}
            />
          </div>
        }
      />
      {isImport ? (
        <div>
          <ImportChildren
            children={children}
            setChildren={setChildren}
            setIsOpen={setIsOpen}
            setIsImport={setIsImport}
          />
        </div>
      ) : (
        <>
          <Title>Add Child</Title>
          <Spacing m={{ t: "28px" }}>
            <Breadcrumbs>
              <BreadcrumbsItem
                iconBefore={
                  <Spacing m={{ r: "7px" }}>
                    <PeopleIcon primaryColor="#2684FF" />
                  </Spacing>
                }
                text="Children"
                onClick={() => history.goBack()}
              />
              <BreadcrumbsItem text="Add Child" />
            </Breadcrumbs>
          </Spacing>
          <AddChildForm
            onSubmit={createChild}
            setIsImportOpen={setIsOpen}
            schoolDistrictOptions={schoolDistrictOptions}
          />
        </>
      )}
    </>
  );
};
