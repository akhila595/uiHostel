import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAuthData = async (
  token: string,
  customerId: string,
  hostelName: string,
) => {
  await AsyncStorage.setItem("token", token);

  await AsyncStorage.setItem("customerId", customerId);

  await AsyncStorage.setItem("hostelName", hostelName);
};

export const clearAuthData = async () => {
  await AsyncStorage.removeItem("token");

  await AsyncStorage.removeItem("customerId");

  await AsyncStorage.removeItem("hostelName");
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};
