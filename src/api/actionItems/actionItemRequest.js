import { request } from "../../utils/request";

export const fetchActionItemsRequest = (params) => {
  return request({
    endpoint: "action_items?view=extended&page=" + params.page,
    method: "GET",
    meta: params.meta,
  });
};

export const fetchActionItemsMeta = () => {
  return request({
    endpoint: "action_items",
    method: "GET",
    meta: true,
  });
};

export const createActionItemRequest = (data) => {
  return request({
    endpoint: "action_items",
    method: "POST",
    data,
  });
}

export const deleteActionItemRequest = async (itemId) => {
  return request({
    endpoint: `action_items/${itemId}`,
    method: "DELETE",
  });
};
