import { baseUrl } from '../utils/local';
import request from './requestService';

export function getGroupById(value) {
  return request.post(`${baseUrl()}/getGroupById`, { id: value })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getGroupAndMembersById(value) {
  return request.post(`${baseUrl()}/getGroupAndMembersById`, { id: value })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function searchGroups(values) {
  return request.post(`${baseUrl()}/searchGroups`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function createGroup(values) {
  return request.post(`${baseUrl()}/createGroup`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getUsersForGroups(values) {
  return request.post(`${baseUrl()}/getUsersForGroups`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function updateGroup(values) {
  return request.post(`${baseUrl()}/updateGroup`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function activeMembersforGroupById(value) {
  return request.post(`${baseUrl()}/activeMembersforGroupById`, {id: value})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function deleteGroup(value) {
  return request.post(`${baseUrl()}/deleteGroup`, {id: value})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function changeGroupStatusById(values) {
  return request.post(`${baseUrl()}/changeGroupStatusById`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}