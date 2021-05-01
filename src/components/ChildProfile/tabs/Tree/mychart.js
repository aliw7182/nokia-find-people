import OrgChart from "@balkangraph/orgchart.js";
import React, { Component } from "react";
import { removeChildContactRequest } from "../../../../api/childContact";
import {
  createChildContact,
  updateChildContact
} from "../../../../context/children/childProvider";
import { EditNodeForm } from "./EditNodeForm";
import "./my-node.css";

const STAR = (x, y) =>
  `<svg class="field_2" x="${x}" y="${y}" width="20" height="20" viewBox="0 0 20 20" focusable="false" role="presentation"><path d="M12.072 17.284l-3.905 2.053a1 1 0 0 1-1.451-1.054l.745-4.349-3.159-3.08a1 1 0 0 1 .554-1.705l4.366-.635 1.953-3.956a1 1 0 0 1 1.794 0l1.952 3.956 4.366.635a1 1 0 0 1 .555 1.705l-3.16 3.08.746 4.349a1 1 0 0 1-1.45 1.054l-3.906-2.053z" fill="currentColor" fill-rule="evenodd"></path></svg>`;

const EMPTY_STAR = (x, y) =>
  `<svg class="field_2" x="${x}" y="${y}" width="20" height="20" viewBox="0 0 20 20" focusable="false" role="presentation"><path d="M12 16.373l3.98 2.193-.76-4.655 3.276-3.347-4.524-.69L12 5.687l-1.972 4.189-4.524.689L8.78 13.91l-.762 4.655L12 16.373zm0 2.283l-3.016 1.662a2 2 0 0 1-2.939-2.075l.599-3.656-2.57-2.624a2 2 0 0 1 1.129-3.377l3.47-.528 1.518-3.224a2 2 0 0 1 3.618 0l1.519 3.224 3.47.528a2 2 0 0 1 1.127 3.377l-2.569 2.624.599 3.656a2 2 0 0 1-2.94 2.075L12 18.656z" fill="currentColor"></path></svg>`;

class Chart extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.divRef = React.createRef();
    this.state = {
      childId: props.childId,
      chart: null,
      selectedChild: null,
    };
  }

  componentDidMount() {
    const { childId } = this.state;
    const setStateForMethod = this.setState.bind(this);
    var editForm = function () {
      this.nodeId = null;
      this.setStateForMethod = setStateForMethod;
    };
    this.editForm = editForm;

    editForm.prototype.init = function (obj) {
      console.log(obj);
      var that = this;
      this.obj = obj;
      this.editForm = document.getElementById("editForm");
      this.contactInput = document.getElementById("contact");
      this.titleInput = document.getElementById("relationship");
      this.cancelButton = document.getElementById("cancel");
      this.saveButton = document.getElementById("save");

      this.cancelButton.addEventListener("click", function () {
        that.hide();
        that.setStateForMethod({ selectedChild: null });
      });

      this.saveButton.addEventListener("click", function () {
        setTimeout(() => {
          const { contact, relationship, relationship_other } = JSON.parse(
            localStorage.getItem("selectValue")
          );
          var node = chart.get(that?.nodeId);
          node.Name = contact?.label;
          node.Relationship =
            relationship?.value === "Other"
              ? relationship_other
              : relationship?.value;

          updateChildContact(
            {
              child_tree_contact: {
                contact_id: contact.value,
                relationship: node.Relationship,
              },
            },
            that.nodeId
          );
          chart.updateNode(node);
          that.hide();
        }, 500);
      });
    };

    editForm.prototype.show = function (nodeId) {
      this.hide();
      this.nodeId = nodeId;

      this.editForm.style.display = "block";
      var node = chart.get(nodeId);
      this.setStateForMethod({ selectedChild: node });
      console.log("NODE ", node, this.contactInput);
    };

    editForm.prototype.hide = function (showldUpdateTheNode) {
      this.editForm.style.display = "none";
    };

    OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
    OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
    OrgChart.templates.myTemplate.size = [220, 60];
    OrgChart.templates.myTemplate.node =
      '<rect class="yellow-node" x="0" y="0" height="60" width="220" fill="#CCEFFF" stroke-width="0" stroke="#aeaeae" rx="30" ry="30"></rect>';

    OrgChart.templates.myTemplate.ripple = {
      radius: 1,
      color: "#0890D3",
      rect: null,
    };

    OrgChart.templates.myTemplate.plus =
      '<rect x="0" y="0" width="0" height="0" rx="5" ry="5" fill="#2E2E2E" stroke="#aeaeae" stroke-width="0"></rect>' +
      '<line x1="0" y1="5" x2="5" y2="5" stroke-width="0" stroke="#aeaeae"></line>' +
      '<line x1="0" y1="5" x2="5" y2="5" stroke-width="0" stroke="#aeaeae"></line>';

    OrgChart.templates.myTemplate.minus =
      '<rect x="0" y="0" width="0" height="0" rx="5" ry="5" fill="#2E2E2E" stroke="#aeaeae" stroke-width="0"></rect>' +
      '<line x1="4" y1="5" x2="5" y2="5" stroke-width="0" stroke="#aeaeae"></line>';

    OrgChart.templates.myTemplate.expandCollapseSize = 0;

    OrgChart.templates.myTemplate.field_0 =
      '<text width="150" class="field_0" style="font-size: 14px;" fill="#172B4D" x="48" y="15" text-anchor="start">{val}</text>';
    OrgChart.templates.myTemplate.field_1 =
      '<text width="150" class="field_1" style="font-size: 12px;" fill="#6B778C" x="48" y="33" text-anchor="start">{val}</text>';

    OrgChart.templates.myTemplate.nodeMenuButton =
      '<g style="cursor:pointer;" transform="matrix(1,0,0,1,170,13)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="15" height="15"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="0" cy="6" r="2" fill="#ffffff"></circle><circle cx="0" cy="12" r="2" fill="#ffffff"></circle></g>';

    OrgChart.templates.green = Object.assign({}, OrgChart.templates.myTemplate);
    OrgChart.templates.green.size = [220, 60];
    OrgChart.templates.green.node =
      '<rect class="yellow-node" x="0" y="0" height="60" width="220" fill="#CCEFFF" stroke-width="0" stroke="#aeaeae" rx="30" ry="30"></rect>';
    OrgChart.templates.yellow = Object.assign(
      {},
      OrgChart.templates.myTemplate
    );
    OrgChart.templates.yellow.node =
      '<rect class="yellow-node" x="0" y="0" height="60" width="220" fill="#CEE9E9" stroke-width="0" stroke="#aeaeae" rx="30" ry="30"></rect>';
    OrgChart.templates.yellow.field_0 =
      '<text width="150" class="field_0" style="font-size: 14px;" fill="#172B4D" x="68" y="15" text-anchor="start">{val}</text>';
    OrgChart.templates.yellow.field_1 =
      '<text width="150" class="field_1" style="font-size: 12px;" fill="#6B778C" x="68" y="33" text-anchor="start">{val}</text>';

    OrgChart.templates.yellow.img_0 =
      '<clipPath id="ulaImg2">' +
      '<circle cx="30" cy="30" r="30"></circle>' +
      "</clipPath>" +
      '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg2)" xlink:href="{val}" x="0" y="0" width="60" height="60">' +
      "</image>";

    OrgChart.templates.green.img_0 =
      '<clipPath id="ulaImg2">' +
      '<circle cx="30" cy="30" r="30"></circle>' +
      "</clipPath>" +
      '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg2)" xlink:href="{val}" x="0" y="0" width="60" height="60">' +
      "</image>";
    OrgChart.templates.green.field_0 =
      '<text width="150" class="field_0" style="font-size: 14px;" fill="#172B4D" x="68" y="15" text-anchor="start">{val}</text>';
    OrgChart.templates.green.field_1 =
      '<text width="150" class="field_1" style="font-size: 12px;" fill="#6B778C" x="68" y="33" text-anchor="start">{val}</text>';

    OrgChart.templates.green.field_2 = `{val}`;

    OrgChart.templates.yellow.nodeMenuButton =
      '<g style="cursor:pointer;" transform="matrix(1,0,0,1,205,23)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="15" height="15"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="0" cy="6" r="2" fill="#ffffff"></circle><circle cx="0" cy="12" r="2" fill="#ffffff"></circle></g>';
    OrgChart.templates.green.nodeMenuButton =
      '<g style="cursor:pointer;" transform="matrix(1,0,0,1,205,23)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="15" height="15"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="0" cy="6" r="2" fill="#ffffff"></circle><circle cx="0" cy="12" r="2" fill="#ffffff"></circle></g>';

    OrgChart.templates.myTemplate.exportMenuButton =
      '<div style="position:absolute; cursor:pointer; right: 10px; top:10px; background-color:#0052CC; width: 65px; height:32px; display:flex;justify-content:center; align-items:center;border-radius:3px;" control-export-menu="">' +
      '<span style="color:white">Export</span>' +
      "</div>";

    function pdf(nodeId) {
      chart.exportPDF({
        filename: "Chart.pdf",
        expandChildren: true,
        nodeId: nodeId,
      });
    }
    function png(nodeId) {
      chart.exportPNG({
        filename: "Chart.png",
        expandChildren: true,
        nodeId: nodeId,
      });
    }
    function svg(nodeId) {
      chart.exportSVG({
        filename: "Chart.svg",
        expandChildren: true,
        nodeId: nodeId,
      });
    }
    function csv(nodeId) {
      chart.exportCSV({
        filename: "Chart.csv",
        expandChildren: true,
        nodeId: nodeId,
      });
    }

    const chart = new OrgChart(this.divRef.current, {
      nodes: this.props.nodes,
      showXScroll: OrgChart.scroll.visible,
      showYScroll: OrgChart.scroll.visible,
      mouseScrool: OrgChart.action.scroll,
      editUI: new editForm(),
      nodeMouseClick: OrgChart.action.none,
      template: "myTemplate",
      assistantSeparation: 50,
      toolbar: {
        layout: false,
        zoom: false,
        fit: false,
        expandAll: false,
      },
      enableSearch: false,
      tags: {
        child: {
          template: "yellow",
          nodeMenu: {
            add: {
              text: "Add",
            },
          },
        },
        relatives: {
          template: "green",
        },
      },
      nodeMenu: {
        edit: {
          text: "Edit",
          icon: OrgChart.icon.edit(20, 20, "#42526E"),
        },
        add: {
          text: "Add",
          icon: OrgChart.icon.add(20, 20, "#42526E"),
        },
        remove: {
          text: "Remove",
          icon: OrgChart.icon.remove(19, 19, "#42526E"),
        },
      },
      nodeBinding: {
        field_0: "Name",
        field_1: "Relationship",
        field_2: function (sender, node) {
          const rating = Math.floor(Math.random() * Math.floor(5));
          let returnRating = Array(5)
            .fill()
            .map((_, index) =>
              index + 1 > rating
                ? EMPTY_STAR(index * 22 + 65, 35)
                : STAR(index * 22 + 65, 35)
            );

          return returnRating;
        },
        img_0: "Avatar",
      },
      menu: {
        export_pdf: {
          text: "Export PDF",
          icon: OrgChart.icon.pdf(20, 20, "#42526E"),
          onClick: pdf,
        },
        export_png: {
          text: "Export PNG",
          icon: OrgChart.icon.png(20, 20, "#42526E"),
          onClick: png,
        },
        export_svg: {
          text: "Export SVG",
          icon: OrgChart.icon.svg(20, 20, "#42526E"),
          onClick: svg,
        },
        export_csv: {
          text: "Export CSV",
          icon: OrgChart.icon.csv(20, 20, "#42526E"),
          onClick: csv,
        },
      },
    });

    chart.on("update", function (sender, oldNode, newNode) {
      console.log(sender, oldNode, newNode);
      updateChildContact(
        {
          child_tree_contact: {
            relationship: newNode.Relationship,
            parent_id: newNode.pid,
          },
        },
        newNode.id
      );
    });

    const { refreshContacts } = this.props;

    chart.on("add", async function (sender, node) {
      const res = await createChildContact({
        child_tree_contact: { child_id: childId, parent_id: node.pid },
      });
      chart.removeNode(node.id);
      chart.addNode({
        ...res,
        pid: res.parent_id,
        tags: ["relatives"],
        Avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63VcFex7-_JFQOKCju4WMQHp3xHIxlBZUJA&usqp=CAU",
      });
      refreshContacts();
      setTimeout(() => chart.draw(OrgChart.action.update), 2000);
    });

    chart.on("remove", function (sender, nodeId, newIds) {
      console.log(nodeId, newIds);
      Object.keys(newIds.newPidsForIds).map((id) =>
        updateChildContact(
          { child_tree_contact: { parent_id: newIds.newPidsForIds[id] } },
          id
        )
      );

      removeChildContactRequest(nodeId);
    });

    this.chart = chart;
  }

  componentDidUpdate(props) {
    if (this.props.nodes?.length !== props.nodes?.length) {
      console.log("NODES UPDATED AHHAHAHAHAHAH", this.props.nodes);
    }
  }
  render() {
    return (
      <>
        <div
          id="tree"
          style={{ height: "93vh", borderBottom: "1px solid #ccc" }}
          ref={this.divRef}
        ></div>
        <EditNodeForm
          initialContacts={this.props.initialContacts}
          selected={this.state.selectedChild}
        />
      </>
    );
  }
}

export default Chart;
