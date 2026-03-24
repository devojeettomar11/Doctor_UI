import httpClient from '@/services/httpClient';

export const fetchMyStore = async (email) => {
  const response = await httpClient.get(`/medicalStores/me?email=${email}`);
  return response.data;
};

export const setupStore = async (storeData) => {
  const response = await httpClient.post(`/medicalStores/setup`, storeData);
  return response.data;
};

export const fetchDashboardStats = async (storeId) => {
  const response = await httpClient.get(`/medicalStores/${storeId}/stats`);
  return response.data;
};

export const fetchInventory = async (storeId) => {
  const response = await httpClient.get(`/inventory?storeId=${storeId}`);
  return response.data;
};

export const addMedicine = async (medicineData) => {
  const response = await httpClient.post(`/inventory`, medicineData);
  return response.data;
};

export const updateMedicine = async (id, medicineData) => {
  const response = await httpClient.put(`/inventory/${id}`, medicineData);
  return response.data;
};

export const deleteMedicine = async (id) => {
  const response = await httpClient.delete(`/inventory/${id}`);
  return response.data;
};

export const fetchOrders = async (storeId, status = 'All') => {
  const response = await httpClient.get(`/orders?storeId=${storeId}&status=${status}`);
  return response.data;
};

export const auditOrder = async (id, auditData) => {
  const response = await httpClient.put(`/orders/${id}/audit`, auditData);
  return response.data;
};
