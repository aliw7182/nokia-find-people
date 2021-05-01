import { request } from "../../utils/request";

export const createAttachmentRequest = (data) => {
  return request({
    endpoint: "attachments",
    data,
    method: "POST",
  });
};

export const createChildAttachmentRequest = (data) => {
  return request({
    endpoint: "child_attachments",
    data,
    method: "POST",
  });
};

export const createConnectionAttachmentRequest = (data) => {
  return request({
    endpoint: "connection_attachments",
    data,
    method: "POST",
  });
}

export const removeChildAttachmentRequest = (childAttachmentId) => {
  return request({
    endpoint: "child_attachments/" + childAttachmentId,
    method: "DELETE",
  });
}

export const removeAttachmentRequest = (attachmentId) => {
  return request({
    endpoint: "attachments/" + attachmentId,
    method: "DELETE",
  });
}
