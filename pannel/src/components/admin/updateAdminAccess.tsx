import { useFormik } from "formik";
import ComponentCard from "../common/ComponentCard";
import { Modal } from "../ui/modal";
// import Input from "../form/input/InputField";
// import Label from "../form/Label";
import Button from "../ui/button/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAccessPoint , updateAdminAccess } from "../../server/admin";
// import { adminSchema } from "../../utils/validation";

function UpdateAdminAccess({
  isOpen,
  onClose,
  refetch,
  id,
}: {    
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  id: string;
}) {
  const { data } = useQuery({
    queryKey: ["getAccessPoint" , id],
    queryFn: () => getAccessPoint(id),
  });

  console.log('its Fucking data>>>>' , data)

const formik = useFormik({
  initialValues:  {pages : data?.data},
  enableReinitialize: true,
  // validationSchema: {},
  onSubmit: (values: any) => {
      // console.log('after submit' , values)
    mutation.mutate({ id, values });
  },
});

 const handleAccessChange = (index : any, value : any) => {
   const updatedPages = [...formik.values?.pages];
   updatedPages[index].access = value;

    formik.setFieldValue('pages', updatedPages);
  };
//its herr for update 
  const mutation = useMutation({
    mutationKey: ["updateAdminAccrss"],
    mutationFn: ({ id, values }: { id: string; values: any }) =>
      updateAdminAccess(id, values),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success("  سطح دسترسی ادمین با موفقیت به روزرسانی شد");
        formik.resetForm();
        onClose();
        refetch();
      } else {
        toast.error("ادمین به روزرسانی نشد ، لطفا دوباره امتحان کنید");
        onClose();
      }
    },
  });

//its here forrrr




  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="font-bold text-lg text-center w-full mb-8">
        سطح دسترسی ادمین
      </h1>

      <form onSubmit={formik.handleSubmit}>
        <ComponentCard title="تنظیمات دسترسی صفحات" className="my-2">
        <div className="space-y-4">
          {formik.values?.pages?.map((page : any, index : any) => (
            <div key={index} className="flex items-center bg-white justify-between p-2 border rounded">
              <div>
                <span className="font-medium dark:text-black">{page.persianName}</span>
                <span className="text-gray-500 ml-2 dark:text-black">({page.englishName})</span>
              </div>
              <hr className="border-black" />
              <div className="flex items-center">
                <label className="inline-flex items-center dark:text-black bg-gray-300 p-2 gap-3 rounded-md cursor-pointer">
                  <input
                    type="checkbox"
                    checked={page.access}
                    onChange={(e) => handleAccessChange(index, e.target.checked)}
                    className="sr-only peer bg-black"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  <span className="ml-2 text-sm font-medium">
                    {page.access ? 'دسترسی دارد' : 'دسترسی ندارد'}
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </ComponentCard>
      <div className="flex gap-4 p-4 m-4">
        <Button type="submit" isLoading={mutation.isPending}>
          ثبت
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            onClose();
          }}
        >
          انصراف
        </Button>
      </div>
      </form>
    </Modal>
  );
}

export default UpdateAdminAccess;
