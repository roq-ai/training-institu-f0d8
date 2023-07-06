import axios from 'axios';
import queryString from 'query-string';
import { TechnologyInterface, TechnologyGetQueryInterface } from 'interfaces/technology';
import { GetQueryInterface } from '../../interfaces';

export const getTechnologies = async (query?: TechnologyGetQueryInterface) => {
  const response = await axios.get(`/api/technologies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTechnology = async (technology: TechnologyInterface) => {
  const response = await axios.post('/api/technologies', technology);
  return response.data;
};

export const updateTechnologyById = async (id: string, technology: TechnologyInterface) => {
  const response = await axios.put(`/api/technologies/${id}`, technology);
  return response.data;
};

export const getTechnologyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/technologies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTechnologyById = async (id: string) => {
  const response = await axios.delete(`/api/technologies/${id}`);
  return response.data;
};
