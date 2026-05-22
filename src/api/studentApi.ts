import API from "./api";

export const getStudents = async () => {
  const response = await API.get("/api/v1/students");

  return response.data;
};

export const getStudentById = async (id: number) => {
  const response = await API.get(`/api/v1/students/${id}`);

  return response.data;
};

export const createStudent = async (data: any) => {
  const response = await API.post("/api/v1/students", data);

  return response.data;
};

export const updateStudent = async (id: number, data: any) => {
  const response = await API.put(`/api/v1/students/${id}`, data);

  return response.data;
};

export const vacateStudent = async (id: number) => {
  const response = await API.put(`/api/v1/students/vacate/${id}`);

  return response.data;
};
