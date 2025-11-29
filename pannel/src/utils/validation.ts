import * as Yup from "yup";

export const singInSchema = Yup.object().shape({
  userName: Yup.string().required("نام کاربری الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
  // .min(8, "رمز عبور حداقل باید شامل 8 کاراکتر باشد"),
});

export const educationSchema = Yup.object().shape({
  peTitle: Yup.string().required("عنوان فارسی الزامی است"),
  enTitle: Yup.string().required("عنوان انگلیسی الزامی است"),
  ruTitle: Yup.string().required("عنوان روسی الزامی است"),
  peDescription: Yup.string().required("توضیحات فارسی الزامی است"),
  enDescription: Yup.string().required("توضیحات انگلیسی الزامی است"),
  ruDescription: Yup.string().required("توضیحات روسی الزامی است"),
  peEducationBody: Yup.string()
    .min(150, "توضیحات تکمیلی نباید کوتاه در از 200 کاراکتر باشد")
    .required(" توضیحات تکلمیلی فارسی الزامی است"),
  enEducationBody: Yup.string()
    .min(150, "توضیحات تکمیلی نباید کوتاه در از 200 کاراکتر باشد")
    .required(" توضیحات تکلمیلی انگلیسی الزامی است"),
  ruEducationBody: Yup.string()
    .min(150, "توضیحات تکمیلی نباید کوتاه در از 200 کاراکتر باشد")
    .required(" توضیحات تکلمیلی روسی الزامی است"),
});

export const eventsSchema = Yup.object().shape({
  peTitle: Yup.string().required("عنوان فارسی الزامی است"),
  enTitle: Yup.string().required("عنوان انگلیسی الزامی است"),
  ruTitle: Yup.string().required("عنوان روسی الزامی است"),
  peDescription: Yup.string().required("توضیحات فارسی الزامی است"),
  enDescription: Yup.string().required("توضیحات انگلیسی الزامی است"),
  ruDescription: Yup.string().required("توضیحات روسی الزامی است"),
  peEventsBody: Yup.string()
    .min(150, "توضیحات تکمیلی نباید کوتاه در از 200 کاراکتر باشد")
    .required(" توضیحات تکلمیلی فارسی الزامی است"),
  enEventsBody: Yup.string()
    .min(150, "توضیحات تکمیلی نباید کوتاه در از 200 کاراکتر باشد")
    .required(" توضیحات تکلمیلی انگلیسی الزامی است"),
  ruEventsBody: Yup.string()
    .min(150, "توضیحات تکمیلی نباید کوتاه در از 200 کاراکتر باشد")
    .required(" توضیحات تکلمیلی روسی الزامی است"),
});

export const homeDataSchema = Yup.object().shape({
  peDescription: Yup.string().required("توضیحات فارسی الزامی است"),
  enDescription: Yup.string().required("توضیحات انگلیسی الزامی است"),
  ruDescription: Yup.string().required("توضیحات روسی الزامی است"),
  peMiddleImageDescription: Yup.string().required(
    "توضیحات میانی فارسی الزامی است"
  ),
  enMiddleImageDescription: Yup.string().required(
    "توضیحات میانی انگلیسی الزامی است"
  ),
  ruMiddleImageDescription: Yup.string().required(
    "توضیحات میانی روسی الزامی است"
  ),
  peProjectDescription: Yup.string().required("توضیحات پروژه فارسی الزامی است"),
  enProjectDescription: Yup.string().required(
    "توضیحات پروژه انگلیسی الزامی است"
  ),
  ruProjectDescription: Yup.string().required("توضیحات پروژه روسی الزامی است"),
  peAboutUsDescription: Yup.string().required(
    "توضیحات درباره ما فارسی الزامی است"
  ),
  enAboutUsDescription: Yup.string().required(
    "توضیحات درباره ما انگلیسی الزامی است"
  ),
  ruAboutUsDescription: Yup.string().required(
    "توضیحات درباره ما روسی الزامی است"
  ),
  peNgoDescription: Yup.string().required("توضیحات سمن فارسی الزامی است"),
  enNgoDescription: Yup.string().required("توضیحات سمن انگلیسی الزامی است"),
  ruNgoDescription: Yup.string().required("توضیحات سمن روسی الزامی است"),
});

export const adminSchema = Yup.object().shape({
  userName: Yup.string().required("نام کاربری الزامی است"),
  firstName: Yup.string().required("نام الزامی است"),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
});
