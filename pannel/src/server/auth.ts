import instance from "../utils/instance";

export const loginRequest = async (value: {
  userName: string;
  password: string;
}) => {
  try {
    const { data } = await instance.post("/login", value);

    return data;
  } catch (err: any) {
    console.error(err);

    return err?.response;
  }
};
