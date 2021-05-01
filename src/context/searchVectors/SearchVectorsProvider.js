import { toast } from "react-toastify";
import {
  fetchSearchVectorsRequest,
  createSearchVectorRequest,
  deleteSearchVectorRequest,
  updateSearchVectorRequest,
} from "../../api/searchVectors";

const fetchSearchVectors = (params = null) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return fetchSearchVectorsRequest(params).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

const createSearchVector = (params) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return createSearchVectorRequest(params).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

const deleteSearchVector = (params) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return deleteSearchVectorRequest(params).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

const updateSearchVector = (id, data) => {
  const errorStatuses = {
    500: "Error on Server!",
  };

  return updateSearchVectorRequest(id, data).catch((err) =>
    toast.error(errorStatuses[err.status])
  );
};

export {
  fetchSearchVectors,
  createSearchVector,
  deleteSearchVector,
  updateSearchVector,
};
