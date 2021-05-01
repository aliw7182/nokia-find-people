import React from "react";
import PropTypes from "prop-types";
import "./my-node.css";
import styled from "styled-components";
import { Box } from "../../../ui/atoms";
import { Avatar } from "../../../ui/molecules/Avatar";
const propTypes = {
  nodeData: PropTypes.object.isRequired,
};

const MyNode = ({ nodeData }) => {
  const selectNode = () => {
    alert("Hi All. I'm " + nodeData.name + ". I'm a " + nodeData.title + ".");
  };

  return (
    // <div onClick={selectNode}>
    //   <div className="position">{nodeData.ava}</div>
    //   <div className="position">{nodeData.title}</div>
    //   <div className="fullname">{nodeData.name}</div>
    // </div>
    <Card className="myChart">
      <Box d="flex" align="center">
        <Avatar
          name={nodeData.name}
        />
        <div className="content">
          <span className="name">{nodeData.name}</span>
          <span className="title">{nodeData.title}</span>
        </div>
      </Box>
    </Card>
  );
};

const Card = styled.div`
  .orgchart.myChart > ul > li > ul li::before {
    border-top-color: #a0a0a0;
  }

  .orgchart.myChart > ul > li > ul li .oc-node::before,
  .orgchart.myChart ul li .oc-node:not(:only-child)::after {
    background-color: #a0a0a0;
  }
  background: #cee9e9;
  border-radius: 50px;
  padding-right: 23px;
  .content {
    text-align: left;
    margin-left: 8px;
  }
  span {
    display: block;
  }
  .name {
    font-family: Helvetica;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #172b4d;
  }
  .title {
    font-family: Helvetica;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #6b778c;
  }
`;

MyNode.propTypes = propTypes;

export default MyNode;
