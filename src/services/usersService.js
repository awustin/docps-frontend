import { baseUrl } from '../utils/local';
import request from './requestService';

export function UserLogIn(params) {
  return request.post(`${baseUrl()}/userLogIn`, params)
    .then((response) => response)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getGroupById(value) {
  return request.post(`${baseUrl()}/getGroupById`, { id: value })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getUserInfoById(id) {
  return request.post(`${baseUrl()}/getUserInfoById`, { id: id })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function createUser(values) {
  return request.post(`${baseUrl()}/createUser`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function searchUsers(values) {
  return request.post(`${baseUrl()}/searchUsers`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function updateUser(values) {
  return request.post(`${baseUrl()}/updateUser`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function deleteUserById(id) {
  return request.post(`${baseUrl()}/deleteUserById`, {id: id})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getCurrentUserInfoById(id) {
  return request.post(`${baseUrl()}/getCurrentUserInfoById`, id)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}