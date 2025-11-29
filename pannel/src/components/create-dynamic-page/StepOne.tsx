import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

function StepOne({
  formik,
  onStep,
}: {
  formik: any;
  onStep: (step: number) => void;
}) {
  const { peTitle, enTitle, ruTitle, path } = formik.values;

  return (
    <>
      <ComponentCard title="عنوان صفحه">
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="flex-1">
            <Label htmlFor="pe-input">عنوان فارسی</Label>
            <Input
              type="text"
              id="pe-input"
              placeholder="عنوان فارسی را وارد کنید"
              error={formik.errors.peTitle ? true : false}
              {...formik.getFieldProps("peTitle")}
            />
            {formik.errors.peTitle && formik.touched.peTitle && (
              <span className="text-sm text-error-500">
                {typeof formik.errors.peTitle === "string" &&
                  formik.errors.peTitle}
              </span>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="en-input">عنوان انگلیسی</Label>
            <Input
              type="text"
              id="en-input"
              placeholder="عنوان انگلیسی را وارد کنید"
              error={formik.errors.enTitle ? true : false}
              {...formik.getFieldProps("enTitle")}
            />
            {formik.errors.enTitle && formik.touched.enTitle && (
              <span className="text-sm text-error-500">
                {typeof formik.errors.enTitle === "string" &&
                  formik.errors.enTitle}
              </span>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="ru-input">عنوان روسی</Label>
            <Input
              type="text"
              id="ru-input"
              placeholder="عنوان روسی را وارد کنید"
              error={formik.errors.ruTitle ? true : false}
              {...formik.getFieldProps("ruTitle")}
            />
            {formik.errors.ruTitle && formik.touched.ruTitle && (
              <span className="text-sm text-error-500">
                {typeof formik.errors.ruTitle === "string" &&
                  formik.errors.ruTitle}
              </span>
            )}
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="مسیر صفحه" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 space-x-10 md:gap-10">
          <div className="flex-1">
            <Label htmlFor="route-input">مسیر صفحه اصلی</Label>
            <Input
              type="text"
              id="route-input"
              placeholder="مسیر صفحه اصلی را وارد کنید"
              error={formik.errors.peTitle ? true : false}
              {...formik.getFieldProps("path")}
            />
            {formik.errors.path && formik.touched.path && (
              <span className="text-sm text-error-500">
                {typeof formik.errors.path === "string" && formik.errors.path}
              </span>
            )}
          </div>
          <div className="checkbox-wrapper-14 mt-4 flex gap-2 items-center">
            <input
              id="s1-14"
              type="checkbox"
              className="switch"
              defaultChecked={formik.values.show}
              checked={formik.values.show}
              onChange={() => {
                formik.setFieldValue("show", !formik.values.show);
              }}
            />
            <Label>این صفحه نمایش داده شود؟</Label>
          </div>
        </div>
      </ComponentCard>
      {/* {formik.values.hasSubPage && (
        <>
          <ComponentCard title="عنوان صفحه فرعی" className="mt-4">
            <div className="flex gap-5 flex-col md:flex-row">
              <div className="flex-1">
                <Label htmlFor="pe-input">عنوان فارسی</Label>
                <Input
                  type="text"
                  id="pe-input"
                  placeholder="عنوان فارسی را وارد کنید"
                  error={
                    formik.errors.subPage &&
                    typeof formik.errors.subPage === "object" &&
                    "peTitle" in formik.errors.subPage
                      ? true
                      : false
                  }
                  {...formik.getFieldProps("subPage.peTitle")}
                />
                {formik.errors.subPage &&
                  typeof formik.errors.subPage === "object" &&
                  "peTitle" in formik.errors.subPage &&
                  formik.errors.subPage.peTitle &&
                  formik.touched.subPage &&
                  typeof formik.touched.subPage === "object" &&
                  formik.touched.subPage?.peTitle && (
                    <span className="text-sm text-error-500">
                      {typeof formik.errors.subPage?.peTitle === "string" &&
                        formik.errors.subPage?.peTitle}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="en-input">عنوان انگلیسی</Label>
                <Input
                  type="text"
                  id="en-input"
                  placeholder="عنوان انگلیسی را وارد کنید"
                  error={formik.errors.subPage?.enTitle ? true : false}
                  {...formik.getFieldProps("subPage.enTitle")}
                />
                {formik.errors.subPage?.enTitle &&
                  formik.touched.subPage?.enTitle && (
                    <span className="text-sm text-error-500">
                      {typeof formik.errors.subPage?.enTitle === "string" &&
                        formik.errors.subPage?.enTitle}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="ru-input">عنوان روسی</Label>
                <Input
                  type="text"
                  id="ru-input"
                  placeholder="عنوان روسی را وارد کنید"
                  error={formik.errors.subPage?.ruTitle ? true : false}
                  {...formik.getFieldProps("subPage.ruTitle")}
                />
                {formik.errors.subPage?.ruTitle &&
                  formik.touched.subPage?.ruTitle && (
                    <span className="text-sm text-error-500">
                      {typeof formik.errors.subPage?.ruTitle === "string" &&
                        formik.errors.subPage?.ruTitle}
                    </span>
                  )}
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="مسیر صفحه فرعی" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 space-x-10 md:gap-10">
              <div className="flex-1">
                <Label htmlFor="route-input">مسیر صفحه فرعی</Label>
                <Input
                  type="text"
                  id="route-input"
                  placeholder="مسیر صفحه فرعی را وارد کنید"
                  error={formik.errors.subPage?.path ? true : false}
                  {...formik.getFieldProps("subPage.path")}
                />
                {formik.errors.subPage?.path &&
                  formik.touched.subPage?.path && (
                    <span className="text-sm text-error-500">
                      {typeof formik.errors.subPage?.path === "string" &&
                        formik.errors.subPage?.path}
                    </span>
                  )}
              </div>
              <div className="checkbox-wrapper-14 mt-4 flex gap-2 items-center">
                <input
                  id="s1-14"
                  type="checkbox"
                  className="switch"
                  defaultChecked={formik.values.hasSecondSubPage}
                  checked={formik.values.hasSecondSubPage}
                  onChange={() => {
                    formik.setFieldValue(
                      "hasSecondSubPage",
                      !formik.values.hasSecondSubPage
                    );
                  }}
                />
                <Label>آیا این صفحه شامل صفحه ی فرعی است؟</Label>
              </div>
            </div>
          </ComponentCard>
        </>
      )}
      {formik.values.hasSecondSubPage && (
        <>
          <ComponentCard title="عنوان صفحه فرعی" className="mt-4">
            <div className="flex gap-5 flex-col md:flex-row">
              <div className="flex-1">
                <Label htmlFor="pe-input">عنوان فارسی</Label>
                <Input
                  type="text"
                  id="pe-input"
                  placeholder="عنوان فارسی را وارد کنید"
                  error={
                    formik.errors.secondSubPage &&
                    typeof formik.errors.secondSubPage === "object" &&
                    "peTitle" in formik.errors.secondSubPage
                      ? true
                      : false
                  }
                  {...formik.getFieldProps("secondSubPage.peTitle")}
                />
                {formik.errors.secondSubPage &&
                  typeof formik.errors.secondSubPage === "object" &&
                  "peTitle" in formik.errors.secondSubPage &&
                  formik.errors.secondSubPage.peTitle &&
                  formik.touched.secondSubPage &&
                  typeof formik.touched.secondSubPage === "object" &&
                  formik.touched.secondSubPage?.peTitle && (
                    <span className="text-sm text-error-500">
                      {typeof formik.errors.secondSubPage?.peTitle ===
                        "string" && formik.errors.secondSubPage?.peTitle}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="en-input">عنوان انگلیسی</Label>
                <Input
                  type="text"
                  id="en-input"
                  placeholder="عنوان انگلیسی را وارد کنید"
                  error={formik.errors.secondSubPage?.enTitle ? true : false}
                  {...formik.getFieldProps("secondSubPage.enTitle")}
                />
                {formik.errors.secondSubPage?.enTitle &&
                  formik.touched.secondSubPage?.enTitle && (
                    <span className="text-sm text-error-500">
                      {typeof formik.errors.secondSubPage?.enTitle ===
                        "string" && formik.errors.secondSubPage?.enTitle}
                    </span>
                  )}
              </div>
              <div className="flex-1">
                <Label htmlFor="ru-input">عنوان روسی</Label>
                <Input
                  type="text"
                  id="ru-input"
                  placeholder="عنوان روسی را وارد کنید"
                  error={formik.errors.secondSubPage?.ruTitle ? true : false}
                  {...formik.getFieldProps("secondSubPage.ruTitle")}
                />
                {formik.errors.secondSubPage?.ruTitle &&
                  formik.touched.secondSubPage?.ruTitle && (
                    <span className="text-sm text-error-500">
                      {typeof formik.errors.secondSubPage?.ruTitle ===
                        "string" && formik.errors.secondSubPage?.ruTitle}
                    </span>
                  )}
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="مسیر صفحه فرعی" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 space-x-10 md:gap-10">
              <div className="flex-1">
                <Label htmlFor="route-input">مسیر صفحه فرعی</Label>
                <Input
                  type="text"
                  id="route-input"
                  placeholder="مسیر صفحه فرعی را وارد کنید"
                  error={formik.errors.secondSubPage?.path ? true : false}
                  {...formik.getFieldProps("secondSubPage.path")}
                />
                {formik.errors.secondSubPage?.path &&
                  formik.touched.secondSubPage?.path && (
                    <span className="text-sm text-error-500">
                      {typeof formik.errors.secondSubPage?.path === "string" &&
                        formik.errors.secondSubPage?.path}
                    </span>
                  )}
              </div>
            </div>
          </ComponentCard>
        </>
      )} */}
      <div className="mt-4">
        <Button
          disabled={
            peTitle.length !== 0 &&
            enTitle.length !== 0 &&
            ruTitle.length !== 0 &&
            path.length !== 0
              ? false
              : true
          }
          onClick={() => {
            onStep(2);
          }}
        >
          بعدی
        </Button>
      </div>
    </>
  );
}

export default StepOne;
