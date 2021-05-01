import { request } from "../../utils/request";

export const createCommunicationTemplateRequest = (data) => {
  return request({
    endpoint: "communication_templates",
    method: "POST",
    data,
  });
};

export const sendCommunicationTemplateToUserRequest = (data) => {
  return request({
    endpoint: "communication_templates/send_message_to_contact",
    method: "POST",
    data,
  });
};

export const fetchCommunicationTemplateRequest = () => {
  return request({
    endpoint: "communication_templates",
    method: "GET",
  });
};

export const deleteCommunicationTemplateRequest = async (templateId) => {
  return request({
    endpoint: `communication_templates/${templateId}`,
    method: "DELETE",
  });
};

export const updateCommunicationTemplateRequest = (templateId) => async (
  data
) => {
  return request({
    endpoint: `communication_templates/${templateId}`,
    method: "PUT",
    data,
  });
};

export const fetchTemplatesSentByContactId = (contactId) => {
  return request({
    endpoint: `templates_sent?id=${contactId}`,
    method: "GET",
  });
};
