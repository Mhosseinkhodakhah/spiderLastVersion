import instance from "../utils/instance";

export const homePage = async (values: any) => {
  try {
    const { data } = await instance.post("/page/home/create", values);

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getHomeData = async () => {
  try {
    const { data } = await instance.get("/page/home");

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const setCompletedProjects = async (values: any) => {
  try {
    const { data } = await instance.post(
      "/page/project/complete/create",
      values
    );

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCompletedProjects = async () => {
  try {
    const { data } = await instance.get("/page/project/complete");

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const setOngoingProjects = async (values: any) => {
  try {
    const { data } = await instance.post(
      "/page/project/ongoing/create",
      values
    );

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getOngoingProjects = async () => {
  try {
    const { data } = await instance.get("/page/project/ongoing");

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const setGoodPracticeProjects = async (values: any) => {
  try {
    const { data } = await instance.post(
      "/page/project/GoodPractice/create",
      values
    );

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getGoodPracticeProjects = async () => {
  try {
    const { data } = await instance.get("/page/project/GoodPractice");

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const setCollaborationProjects = async (values: any) => {
  try {
    const { data } = await instance.post(
      "/page/project/Collaboration/create",
      values
    );

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCollaborationProjects = async () => {
  try {
    const { data } = await instance.get("/page/project/Collaboration");

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createDescriptionPage = async ({
  description,
  type,
}: {
  description: any;
  type: string;
}) => {
  try {
    const { data } = await instance.post("/page/description/create", {
      description,
      type,
    });

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getDescriptionPage = async (pageName: string) => {
  try {
    const { data } = await instance.get(`/page/description/${pageName}`);

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
