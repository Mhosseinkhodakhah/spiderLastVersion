import instance from "../utils/instance";

export const getAboutUs = async () => {
  try {
    const { data } = await instance.get("/page/aboutus");
    console.log('geted data for aboutUs>>>' , data)
    return data;
  } catch (err) {
    console.error("Error fetching events:", err);
    return false;
  }
};

export const createAboutUs = async (values: any) => {
  try {
    console.log('value here isssss>>>>' , typeof(values))
    const { data } = await instance.post("/page/aboutus/create", values);

    return data;
  } catch (err) {
    console.error("Error fetching events:", err);
    return false;
  }
};
