import axiosInstance from '../helpers/axiosInstance';

export const fetchAllData = async (currency = 'usd') => {
  try {
    const response = await axiosInstance.get(
      `/coins/markets?vs_currency=${currency}&order=market_cap_desc`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
