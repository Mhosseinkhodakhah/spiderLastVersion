import axios from "axios";
import instance from "../utils/instance";

export const uploadFiles = async (valuse: FormData) => {
  try {
    const { data } = await axios.post(
      import.meta.env.VITE_API_URL + "page/uploadFile",
      valuse,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("ddd", data);

    return data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.data;
  }
};

export const deleteFiles = async (valuse: { fileName: string }) => {
  try {
    const { data } = await instance.post("/page/file/delete", valuse);

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
