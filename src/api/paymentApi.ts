import API from "./api";

export const payFee = async (data: any) => {
  const response = await API.post("/api/v1/payments", data);

  return response.data;
};

export const getPaymentHistory = async (studentId: number) => {
  const response = await API.get(`/api/v1/payments/student/${studentId}`);

  return response.data;
};

export const getPaymentsThisMonth = async () => {
  const response = await API.get("/api/v1/payments/this-month");

  return response.data;
};
