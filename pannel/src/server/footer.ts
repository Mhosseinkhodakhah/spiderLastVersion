import instance from "../utils/instance";

export const getFooter = async () => {
  try {
    const { data } = await instance.get("/page/footer");

    return data;
  } catch (err) {
    console.error("Error fetching events:", err);
    return false;
  }
};

export const createFooter = async (values: any) => {
  try {
    const { data } = await instance.post("/page/footer/create", values);

    return data;
  } catch (err) {
    console.error("Error fetching events:", err);
    return false;
  }
};
