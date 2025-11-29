import { useMutation, useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  AllCommunityModule,
  ColDef,
  colorSchemeDarkBlue,
  colorSchemeLight,
  ModuleRegistry,
  themeAlpine,
} from "ag-grid-community";
import { useTheme } from "../../context/ThemeContext";
import Input from "../form/input/InputField";
import { AG_GRID_LOCALE_IR } from "@ag-grid-community/locale";
import Confirm from "../confirm";
import { changeStatusDoc, getNgoDocuments } from "../../server/ngos";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { AcceptIcon, ArrowDownIcon, TimesIcon, WordIcon } from "../../icons";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  ["ngo.name"]: string;
  name: string;
  title: string;
  interfaceName: string;
  address: string;
  phone: string;
  description: string;
  state: [];
  email: string;
  file: string[];
  actions: any;
}

const themeDark = themeAlpine.withPart(colorSchemeDarkBlue);
const themeLight = themeAlpine.withPart(colorSchemeLight);

function NgoDocList() {
  const [changeStatus, setChangeStatus] = useState<string>("");
  const [status, setStatus] = useState<number>(0);

  const [isOpenDocs, setIsOpenDocs] = useState<boolean>(false);
  const [docs, setDocs] = useState<string[]>([]);

  const handleCloseDocs = () => setIsOpenDocs(false);
  const handleCloseChangeStatus = () => setChangeStatus("");

  const mutation = useMutation({
    mutationKey: ["changeStatusDoc"],
    mutationFn: () => changeStatusDoc(changeStatus, status),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(`مدارک با موفقیت ${status === 1 ? "تایید" : "رد"} شد`);
        refetch();
        handleCloseChangeStatus();
      } else {
        toast.error("عملیات ناموفق ، لطفا دوباره امتحان کنید");
        handleCloseChangeStatus();
      }
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["getNgoDocuments"],
    queryFn: getNgoDocuments,
  });

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "ngo.name", headerName: "نام سمن" },
    { field: "name", headerName: "نام" },
    { field: "title", headerName: "عنوان" },
    { field: "interfaceName", headerName: "نام رابط" },
    { field: "phone", headerName: "تلفن" },
    { field: "email", headerName: "ایمیل" },
    { field: "description", headerName: "توضیحات" },
    {
      field: "state",
      headerName: "وضعیت",
      cellRenderer: (params: any) => {
        return (
          <>
            {params?.value === 0 ? (
              <span className="bg-amber-300 rounded-full text-sm p-1 text-gray-900">
                در انتظار بررسی
              </span>
            ) : params?.value === 1 ? (
              <span className="bg-green-400 rounded-full text-sm p-1 text-gray-900">
                تایید شده
              </span>
            ) : params?.value === 3 ? (
              <span className="bg-amber-300 rounded-full text-sm p-1 text-gray-900">
                در انتظار تایید آپدیت
              </span>
            ) : (
              <span className="bg-red-500 rounded-full text-sm p-1">
                رد شده
              </span>
            )}
          </>
        );
      },
    },

    {
      field: "file",
      headerName: "مدارک",
      width: 100,
      cellRenderer: (params: any) => {
        return (
          <Button
            size="sm"
            onClick={() => {
              setIsOpenDocs(true);
              setDocs(params?.value);
            }}
          >
            نمایش مدارک
          </Button>
        );
      },
    },
    {
      field: "actions",
      headerName: "اقدامات",
      width: 100,
      cellRenderer: (params: any) => {
        return (
          <div className="flex gap-2">
            <AcceptIcon
              className="text-2xl text-green-500 cursor-pointer"
              onClick={() => {
                setChangeStatus(params?.data?._id);
                setStatus(1);
              }}
            />
            <TimesIcon
              className="text-2xl text-red-500 cursor-pointer"
              onClick={() => {
                setChangeStatus(params?.data?._id);
                setStatus(2);
              }}
            />
          </div>
        );
      },
    },
  ]);

  const defaultColDef: ColDef = {
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    headerStyle: {
      textAlign: "center",
    },
    headerClass: "header-cell",
    filter: true,
    spanRows: true,
    sortable: true,
    resizable: true,
  };

  const gridRef = useRef<AgGridReact>(null);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, []);

  const { theme } = useTheme();

  return (
    <>
      <div className="my-4 flex gap-4">
        <Input
          type="text"
          id="filter-text-box"
          placeholder="جستجو..."
          onInput={onFilterTextBoxChanged}
        />
      </div>
      <div style={{ width: "100%", height: "450px" }}>
        <AgGridReact
          ref={gridRef}
          theme={theme === "dark" ? themeDark : themeLight}
          enableRtl
          pagination
          localeText={AG_GRID_LOCALE_IR}
          rowData={data && data.data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>

      <Confirm
        isOpen={!!changeStatus}
        onClose={handleCloseChangeStatus}
        isLoading={mutation.isPending}
        onSubmit={() => mutation.mutate()}
        message={`آیا مدارک را ${status === 1 ? "تایید" : "رد"} می کنید؟`}
      />

      <DocsModal isOpen={isOpenDocs} onClose={handleCloseDocs} docs={docs} />
    </>
  );
}

export default NgoDocList;

const DocsModal = ({
  isOpen,
  onClose,
  docs,
}: {
  isOpen: boolean;
  onClose: () => void;
  docs: string[];
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-center">
        <h1 className="text-2xl">مدارک</h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-10 mt-4 overflow-y-auto">
        {docs?.map((doc: string) => (
          <div key={doc}>
            {doc.slice(doc.length - 3) === "png" ||
              doc.slice(doc.length - 3) === "jpg" ||
              doc.slice(doc.length - 4) === "jpeg" ? (
              <>
                <h1 className="flex flex-col justify-center item-center text-2xl text-center font-bold">
                  تصاویر
                </h1>
                <hr className="my-5" />
                <img
                  alt="doc"
                  src={doc}
                  className="max-w-2/3 object-contain mx-auto"
                />
              </>
            ) : (
              <>
                {doc.slice(doc.length - 3) === "mp4" ||
                  doc.slice(doc.length - 4) === "jpeg" ||
                  doc.slice(doc.length - 3) === "mov" ? (
                  <>
                    <h1 className="flex flex-col justify-center item-center text-2xl text-center font-bold">
                      ویدیو
                    </h1>
                    <hr className="my-5" />
                    <video src={doc} controls className="flex flex-col justify-center item-center" />
                  </>
                ) : (
                  <>
                    {doc.slice(doc.length - 3) === "pdf" ? (
                      <>
                        <h1 className="flex flex-col justify-center item-center text-2xl text-center font-bold">
                          پی دی اف
                        </h1>
                        <hr className="my-5" />

                        <object
                          data={doc}
                          type="application/pdf"
                          className="w-full h-[300px]"
                        />

                      </>
                    ) : (
                      <>
                        <h1 className="flex flex-col justify-center item-center text-2xl text-center font-bold">
                          فایل ورد
                        </h1>
                        <hr className="my-5" />
                        <a
                          href={doc}
                          download={doc}
                          className="bg-blue-500 p-2 rounded-full  mx-auto flex items-center gap-2"
                          target="_blank"
                        >
                          <ArrowDownIcon />
                          <span>دانلود فایل</span>
                          <WordIcon />
                        </a>

                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};
