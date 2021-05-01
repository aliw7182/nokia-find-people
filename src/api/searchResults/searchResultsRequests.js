import { request } from "../../utils/request";

export const createSearchResultRequest = (data) => {
  return request({
    endpoint: "family_searches",
    method: "POST",
    data: {
      family_search: {
        ...data,
      },
    },
  });
};

export const updateSearchResultRequest = (id, data) => {
  return request({
    endpoint: "family_searches/" + id,
    method: "PUT",
    data: {
      family_search: {
        ...data,
      },
    },
  });
};

export const deleteSearchResultAttachmentRequest = (id) => {
  return request({
    endpoint: "family_search_attachments/" + id,
    method: "DELETE",
  });
};

export const deleteSearchResultConnectionRequest = (id) => {
  return request({
    endpoint: "family_search_connections/" + id,
    method: "DELETE",
  });
};

export const createSearchResultConnectionRequest = (
  family_search_id,
  child_contact_id
) => {
  return request({
    endpoint: "family_search_connections",
    method: "POST",
    data: {
      family_search_connection: {
        family_search_id: family_search_id,
        child_contact_id: child_contact_id,
      },
    },
  });
};

export const automatedSearchResultRequest = ({ family_search_id }) => {
  return request({
    endpoint: "search_jobs/call_apify_task",
    method: "POST",
    data: {
      search_job: {
        family_search_id,
      },
    },
  });
};

export const createSearchResultAttachmentRequest = (
  family_search_id,
  attachment_id
) => {
  return request({
    endpoint: "family_search_attachments",
    method: "POST",
    data: {
      family_search_attachment: {
        family_search_id: family_search_id,
        attachment_id: attachment_id,
      },
    },
  });
};
