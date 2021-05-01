import { sideRelatives } from "./relationshipOptions.data";

const constructTree = ({ firstName = "", lastName = "", contacts = [] }) => {
  const nodes = [
    {
      id: 0,
      Name: `${firstName} ${lastName}`,
      Relationship: "child",
      tags: ["child"],
      Avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63VcFex7-_JFQOKCju4WMQHp3xHIxlBZUJA&usqp=CAU",
    },
  ];

  contacts.forEach((item) => {
    nodes.push({
      id: item.id,
      tags: [
        "relatives",
        sideRelatives.includes(item?.relationship) && "assistant",
      ],
      Name: `${item?.contact?.first_name || ""} ${
        item?.contact?.last_name || ""
      }`,
      contactId: item?.contact?.id,
      Relationship: item?.relationship,
      pid: item.parent_id || 0,
      Avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63VcFex7-_JFQOKCju4WMQHp3xHIxlBZUJA&usqp=CAU",
    });
  });

  return nodes;
};

export { constructTree };
