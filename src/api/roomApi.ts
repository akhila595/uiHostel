import API from "./api";

export const getRooms = async () => {
  const response = await API.get("/api/v1/rooms");

  return response.data;
};

export const getRoomById = async (id: number) => {
  const response = await API.get(`/api/v1/rooms/${id}`);

  return response.data;
};

export const createRoom = async (data: any) => {
  const response = await API.post("/api/v1/rooms", data);

  return response.data;
};

export const updateRoom = async (id: number, data: any) => {
  const response = await API.put(`/api/v1/rooms/${id}`, data);

  return response.data;
};

export const deleteRoom = async (id: number) => {
  const response = await API.delete(`/api/v1/rooms/${id}`);

  return response.data;
};
