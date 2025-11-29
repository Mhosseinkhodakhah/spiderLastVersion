import { useMutation, useQuery } from "@tanstack/react-query";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import {
  createDescriptionPage,
  getDescriptionPage,
} from "../../server/content";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import Loading from "../../components/loading";
import Radio from "../../components/form/input/Radio";

function ContentStatistics() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getDescriptionPage"],
    queryFn: () => getDescriptionPage("statistic"),
  });

  console.log("data", data);

  const mutation = useMutation({
    mutationKey: ["createDescriptionPage"],
    mutationFn: createDescriptionPage,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("محتوای صفحه آمار با موفقیت تغییر کرد");
        formik.resetForm();
        refetch();
      } else {
        toast.error(
          "متاسفانه محتوای صفحه آمار تغییر نکرد ، لطفا مجددا تلاش کنید"
        );
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      participationPeDescription: data?.data?.participation?.peDescription,
      participationEnDescription: data?.data?.participation?.enDescription,
      participationRuDescription: data?.data?.participation?.ruDescription,
      countriesPeDescription: data?.data?.countriesDescription?.peDescription,
      countriesEnDescription: data?.data?.countriesDescription?.enDescription,
      countriesRuDescription: data?.data?.countriesDescription?.ruDescription,
      barChart: "",
      pieChart: "",
      mixChart: "",
    },
    validationSchema: Yup.object().shape({
      participationPeDescription: Yup.string().required(
        "لطفا توضیحات فارسی آمار همکاری را وارد کنید"
      ),
      participationEnDescription: Yup.string().required(
        "لطفا توضیحات انگلیسی آمار همکاری را وارد کنید"
      ),
      participationRuDescription: Yup.string().required(
        "لطفا توضیحات روسی آمار همکاری را وارد کنید"
      ),
      countriesPeDescription: Yup.string().required(
        "لطفا توضیحات فارسی آمار کشور ها را وارد کنید"
      ),
      countriesEnDescription: Yup.string().required(
        "لطفا توضیحات انگلیسی آمار کشورها را وارد کنید"
      ),
      countriesRuDescription: Yup.string().required(
        "لطفا توضیحات روسی آمار کشور ها را وارد کنید"
      ),
    }),
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const ParticipationValue = {
        description: {
          peDescription: values.participationPeDescription,
          enDescription: values.participationEnDescription,
          ruDescription: values.participationRuDescription,
        },
        type: "participation",
      };
      const CountriesValue = {
        description: {
          peDescription: values.countriesPeDescription,
          enDescription: values.countriesEnDescription,
          ruDescription: values.countriesRuDescription,
        },
        type: "countries",
      };

      Promise.all([
        mutation.mutate(ParticipationValue),
        mutation.mutate(CountriesValue),
      ]);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PageMeta title="محتوا | آمار" description="محتوای صفحه آمار" />
      <PageBreadcrumb pageTitle="محتوا" subMenu="آمار" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات آمار همکاری (فارسی)"
              formik={formik}
              name="participationPeDescription"
              error={formik.errors.participationPeDescription ? true : false}
              hint={
                typeof formik.errors.participationPeDescription === "string"
                  ? formik.errors.participationPeDescription
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات آمار همکاری (انگلیسی)"
              formik={formik}
              name="participationEnDescription"
              error={formik.errors.participationEnDescription ? true : false}
              hint={
                typeof formik.errors.participationEnDescription === "string"
                  ? formik.errors.participationEnDescription
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات آمار همکاری (روسی)"
              formik={formik}
              name="participationRuDescription"
              error={formik.errors.participationRuDescription ? true : false}
              hint={
                typeof formik.errors.participationRuDescription === "string"
                  ? formik.errors.participationRuDescription
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات  آمار کشور ها (فارسی)"
              formik={formik}
              name="countriesPeDescription"
              error={formik.errors.countriesPeDescription ? true : false}
              hint={
                typeof formik.errors.countriesPeDescription === "string"
                  ? formik.errors.countriesPeDescription
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات  آمار کشور ها (انگلیسی)"
              formik={formik}
              name="countriesEnDescription"
              error={formik.errors.countriesEnDescription ? true : false}
              hint={
                typeof formik.errors.countriesEnDescription === "string"
                  ? formik.errors.countriesEnDescription
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات  آمار کشور ها (روسی)"
              formik={formik}
              name="countriesRuDescription"
              error={formik.errors.countriesRuDescription ? true : false}
              hint={
                typeof formik.errors.countriesRuDescription === "string"
                  ? formik.errors.countriesRuDescription
                  : ""
              }
            />
          </div>
        </ComponentCard>

        <ComponentCard title="دیتای چارت ستونی">
          <div>
            <Radio
              label="بر اساس سمن ها و پروژه های ثبت شده"
              className="my-2"
              value={formik?.values.barChart}
              onChange={() => formik.setFieldValue("barChart", "1")}
              checked={formik?.values?.barChart === "1"}
              id="1"
              name="1"
            />
            <Radio
              label="بر اساس سمن ها و پروژه های تکمیل شده هر سمن"
              className="my-2"
              value={formik?.values.barChart}
              onChange={() => formik.setFieldValue("barChart", "2")}
              checked={formik?.values?.barChart === "2"}
              id="2"
              name="2"
            />
            <Radio
              label="بر اساس سمن ها و اسناد ایجاد شده توسط هر سمن"
              className="my-2"
              value={formik?.values.barChart}
              onChange={() => formik.setFieldValue("barChart", "3")}
              checked={formik?.values?.barChart === "3"}
              id="3"
              name="3"
            />
            <Radio
              label="بر اساس سمن ها و تاریخ ثبت نام هر سمن"
              className="my-2"
              value={formik?.values.barChart}
              onChange={() => formik.setFieldValue("barChart", "4")}
              checked={formik?.values?.barChart === "4"}
              id="4"
              name="4"
            />
            <Radio
              label="بر اساس سمن ها و مشارکت آنها در پروژه های دیگران"
              className="my-2"
              value={formik?.values.barChart}
              onChange={() => formik.setFieldValue("barChart", "5")}
              checked={formik?.values?.barChart === "5"}
              id="5"
              name="5"
            />
          </div>
        </ComponentCard>
        <ComponentCard title="دیتای چارت دایره ای">
          <div>
            <Radio
              label="بر اساس منطقه سمن"
              className="my-2"
              value={formik?.values.pieChart}
              onChange={() => formik.setFieldValue("pieChart", "6")}
              checked={formik?.values?.pieChart === "6"}
              id="6"
              name="6"
            />
            <Radio
              label="بر اساس بیشترین پروژه های ایجاد شده توسط سمن ها"
              className="my-2"
              value={formik?.values.pieChart}
              onChange={() => formik.setFieldValue("pieChart", "7")}
              checked={formik?.values?.pieChart === "7"}
              id="7"
              name="7"
            />
            <Radio
              label="بر اساس بیشترین اسناد ایجاد شده توسط سمن ها"
              className="my-2"
              value={formik?.values.pieChart}
              onChange={() => formik.setFieldValue("pieChart", "8")}
              checked={formik?.values?.pieChart === "8"}
              id="8"
              name="8"
            />
          </div>
        </ComponentCard>
        <ComponentCard title="دیتای چارت ترکیبی">
          <div>
            <Radio
              label="بر اساس منطقه سمن و زمان ثبت نام"
              className="my-2"
              value={formik?.values.mixChart}
              onChange={() => formik.setFieldValue("mixChart", "9")}
              checked={formik?.values?.mixChart === "9"}
              id="9"
              name="9"
            />
            <Radio
              label="بر اساس سمن ها و پروژه های تکمیل شده"
              className="my-2"
              value={formik?.values.mixChart}
              onChange={() => formik.setFieldValue("mixChart", "10")}
              checked={formik?.values?.mixChart === "10"}
              id="10"
              name="10"
            />
            <Radio
              label="بر اساس سمن ها و تعداد پروژه های هر سمن در هر دسته بندی پروژه ها"
              className="my-2"
              value={formik?.values.mixChart}
              onChange={() => formik.setFieldValue("mixChart", "11")}
              checked={formik?.values?.mixChart === "11"}
              id="11"
              name="11"
            />
            <Radio
              label="بر اساس سمن ها و تعداد پروژه ها و اسناد هر سمن"
              className="my-2"
              value={formik?.values.mixChart}
              onChange={() => formik.setFieldValue("mixChart", "12")}
              checked={formik?.values?.mixChart === "12"}
              id="12"
              name="12"
            />
          </div>
        </ComponentCard>

        <div className="flex gap-2 mt-2">
          <Button isLoading={mutation.isPending} type="submit">
            ثبت
          </Button>
          <Button variant="outline" onClick={() => formik.resetForm()}>
            انصراف
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ContentStatistics;
