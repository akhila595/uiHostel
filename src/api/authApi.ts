import API from "./api";

export const loginApi = async (email: string, password: string) => {
  const response = await API.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const registerApi = async (data: any) => {
  const response = await API.post("/api/auth/register", data);

  return response.data;
};
