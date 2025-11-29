import { IEducation } from "../types/education-types";
import instance from "../utils/instance";

export const getEducations = async () => {
  try {
    const { data } = await instance.get("/events-educations/education/all");

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createEducation = async (values: IEducation) => {
  try {
    const { data } = await instance.post(
      "/events-educations/education/create",
      values
    );

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteEducation = async (id: string) => {
  try {
    const { data } = await instance.post(
      `/events-educations/education/delete/${id}`
    );

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updateEducation = async (id: string, values: any) => {
  try {
    const { data } = await instance.post(
      `/events-educations/education/update/${id}`,
      values
    );

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
