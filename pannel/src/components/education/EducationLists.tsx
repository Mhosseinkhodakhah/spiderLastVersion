import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_IR } from "@ag-grid-community/locale";
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  themeAlpine,
  colorSchemeDarkBlue,
  colorSchemeLight,
} from "ag-grid-community";
import Input from "../form/input/InputField";
import { useTheme } from "../../context/ThemeContext";
import CreateEducation from "./CreateEducation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEducation, getEducations } from "../../server/education";
import Button from "../ui/button/Button";
import { TrashBinIcon, UpdateIcon } from "../../icons";
import Confirm from "../confirm";
import toast from "react-hot-toast";
import UpdateEducation from "./UpdateEducation";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  peTitle: string;
  enTitle: string;
  ruTitle: string;
  type: string;
  ["admin.userName"]: string;
  actions: string;
}

const themeDark = themeAlpine.withPart(colorSchemeDarkBlue);
const themeLight = themeAlpine.withPart(colorSchemeLight);

function EducationList() {
  const [isOpenDel, setIsOpenDel] = useState<string>("");
  const [isOpenUp, setIsOpenUp] = useState<string>("");
  const [updateValues, setUpdateValues] = useState<any>({});

  const handleCloseConfirm = () => setIsOpenDel("");
  const handleCloseUp = () => setIsOpenUp("");

  const mutation = useMutation({
    mutationKey: ["deleteEducation"],
    mutationFn: deleteEducation,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("آموزش با موفقیت حذف شد");
        refetch();
        handleCloseConfirm();
      } else {
        toast.error("آموزش حذف نشد ، لطفا دوباره امتحان کنید");
        handleCloseConfirm();
      }
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["getEducations"],
    queryFn: getEducations,
  });

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "peTitle", headerName: "عنوان فارسی" },
    { field: "enTitle", headerName: "عنوان انگلیسی" },
    { field: "ruTitle", headerName: "عنوان روسی" },
    {
      field: "type",
      headerName: "محتوا",
      cellStyle: { display: "flex", justifyContent: "center" },
      cellRenderer: (params: any) => {
        let isVideo = false;
        let isPicture = false;
        if (
          params?.data?.peVideo?.length > 0 ||
          params?.data?.enVideo?.length > 0 ||
          params?.data?.ruVideo?.length > 0
        ) {
          isVideo = true;
        }
        if (
          params?.data?.pePictures?.length > 0 ||
          params?.data?.enPictures?.length > 0 ||
          params?.data?.ruPictures?.length > 0
        ) {
          isPicture = true;
        }

        return `${isVideo ? "ویدیو" : " "} ${isPicture ? "تصویر" : " "}`;
      },
    },
    { field: "admin.userName", headerName: "نام کاربری ادمین" },
    {
      field: "actions",
      headerName: "عملیات",
      cellRenderer: (params: any) => (
        <div className="flex gap-2">
          <Button
            variant="primary"
            className="bg-rose-500 hover:bg-rose-800"
            size="sm"
            startIcon={<TrashBinIcon />}
            onClick={() => {
              setIsOpenDel(params.data._id);
            }}
          >
            حذف
          </Button>
          <Button
            variant="primary"
            className="bg-yellow-400 hover:bg-yellow-500"
            size="sm"
            startIcon={<UpdateIcon />}
            onClick={() => {
              setIsOpenUp(params.data._id);
              setUpdateValues(params.data);
            }}
          >
            به روز رسانی
          </Button>
        </div>
      ),
    },
  ]);

  const defaultColDef: ColDef = {
    cellStyle: {
      diplay: "flex",
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
        <CreateEducation refetch={refetch} />
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <AgGridReact
          ref={gridRef}
          theme={theme === "dark" ? themeDark : themeLight}
          enableRtl
          pagination
          localeText={AG_GRID_LOCALE_IR}
          rowData={data?.data?.educations || []}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>

      <Confirm
        isOpen={!!isOpenDel}
        onClose={handleCloseConfirm}
        isLoading={mutation.isPending}
        onSubmit={() => mutation.mutate(isOpenDel)}
        message="آیا میخواهید آموزش را حذف کنید؟"
      />

      <UpdateEducation
        isOpen={isOpenUp}
        onClose={handleCloseUp}
        refetch={refetch}
        data={updateValues}
      />
    </>
  );
}

export default EducationList;
