import { baseUrl } from '../utils/local';
import request from './requestService';

export function createTestplanForProject(values) {
  return request.post(`${baseUrl()}/createTestplanForProject`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function searchTestplans(values) {
  return request.post(`${baseUrl()}/searchTestplans`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getTagsForTestplan() {
  return request.post(`${baseUrl()}/getTagsForTestplan`, {})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function createTestplan(values) {
  return request.post(`${baseUrl()}/createTestplan`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getTestplanById(value) {
  return request.post(`${baseUrl()}/getTestplanById`, { id: value })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function updateTestplan(values) {
  return request.post(`${baseUrl()}/updateTestplan`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function deleteTestplan(value) {
  return request.post(`${baseUrl()}/deleteTestplan`, { id: value })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getTestcasesCount(value) {
  return request.post(`${baseUrl()}/getTestcasesCount`, { id: value })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function downloadTestplanFile(value) {
  return request.get(`${baseUrl()}/downloadTestplanFile`, { 
		params: {fileName: value},
		responseType: 'blob',
		headers: {
			'Accept' : ['application/octet-stream', 'application/*']
		}
	})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function cancelFile(values) {
  return request.post(`${baseUrl()}/cancelFile`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}


