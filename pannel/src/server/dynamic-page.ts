import instance from "../utils/instance";

export const getAllDynamicPages = async () => {
  try {
    const { data } = await instance.get("page/all");

    return data;
  } catch (err: any) {
    console.log(err);

    return err;
  }
};
export const createPage = async (values: any, subPage?: string) => {
  try {
    const { data } = await instance.post(
      `page/v2/create?pageId=${subPage}`,
      values
    );

    return data;
  } catch (err: any) {
    console.log(err);

    return err?.response?.data;
  }
};

export const createPageContent = async (values: any) => {
  try {
    const { data } = await instance.post("page/content", values);

    return data;
  } catch (err: any) {
    console.log(err);

    return err;
  }
};

export const deletePage = async (id: string) => {
  try {
    const { data } = await instance.delete(`page/${id}`);

    return data;
  } catch (err: any) {
    console.log(err);

    return err;
  }
};

export const UpdateContentPageRequest = async (pageId: string , values : any) => {
  try {
    const { data } = await instance.post(`page/v2/update/${pageId}` , values);

    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
