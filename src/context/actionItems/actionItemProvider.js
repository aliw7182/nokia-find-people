import { toast } from "react-toastify";
import {
  fetchActionItemsRequest,
  deleteActionItemRequest,
} from "../../api/actionItems";

const fetchActionItems = (params = {}) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return fetchActionItemsRequest(params).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

const deleteActionItem = (itemId) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return deleteActionItemRequest(itemId).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

export { fetchActionItems, deleteActionItem };
