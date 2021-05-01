import { request } from "../../utils/request";

export const fetchPhoneNumbers = () => {
  return request({
    endpoint: `available_phone_numbers/0987654321poiuytrewq`,
    method: "GET",
    isV1: false,
  });
};

export const fetchPhoneSettings = () => {
  return request({
    endpoint: `twilio_phone_numbers`,
    method: "GET",
  });
};

export const purchasePhone = (data) => {
  return request({
    endpoint: `choose_phone_number/0987654321poiuytrewq`,
    method: "POST",
    data,
    isV1: false,
  });
};

export const fetchEmailSettings = () => {
  return request({
    endpoint: `sendgrid_domains`,
    method: "GET",
  });
};

export const authenticateDomain = (data) => {
  return request({
    endpoint: `authenticate_domain/1234567890qwertyuiop`,
    method: "POST",
    data,
    isV1: false,
  });
};
