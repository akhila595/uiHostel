import API from "./api";

export const getDashboardSummary = async () => {
  const response = await API.get("/api/v1/dashboard/summary");

  return response.data;
};

export const getDueTodayStudents = async () => {
  const response = await API.get("/api/v1/dashboard/due-today");

  return response.data;
};

export const getOverdueStudents = async () => {
  const response = await API.get("/api/v1/dashboard/overdue");

  return response.data;
};
