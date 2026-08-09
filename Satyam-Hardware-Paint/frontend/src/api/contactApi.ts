import api from './axiosConfig';

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export const submitContactForm = (data: ContactFormData) =>
  api.post('/contact', data);
