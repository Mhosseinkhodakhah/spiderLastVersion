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
// import CreateEducation from "./CreateEducation";
import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../ui/button/Button";
import { TrashBinIcon, TreeIcon, UpdateIcon } from "../../icons";
import Confirm from "../confirm";
import toast from "react-hot-toast";
import { deletePage, getAllDynamicPages } from "../../server/dynamic-page";
import { useNavigate } from "react-router";
// import UpdateEducation from "./UpdateEducation";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  peTitle: string;
  enTitle: string;
  ruTitle: string;
  path: string;
  hasSubPage: boolean;
  Children:string[];
  template: number;
  actions: string;
  show : boolean;
}

const themeDark = themeAlpine.withPart(colorSchemeDarkBlue);
const themeLight = themeAlpine.withPart(colorSchemeLight);

function DynamicPagesList() {
  const [isOpenDel, setIsOpenDel] = useState<string>("");

  const handleCloseConfirm = () => setIsOpenDel("");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["deletePage"],
    mutationFn: deletePage,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("صفحه با موفقیت حذف شد");
        refetch();
        handleCloseConfirm();
      } else {
        toast.error(data?.error);
        handleCloseConfirm();
      }
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["getAllDynamicPages"],
    queryFn: getAllDynamicPages,
  });

  console.log("dddddasdf", data);

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "peTitle", headerName: "عنوان فارسی" },
    {
      field: "enTitle",
      headerName: "عنوان انگلیسی",
      cellStyle: { textAlign: "left" },
    },
    {
      field: "ruTitle",
      headerName: "عنوان روسی",
      cellStyle: { textAlign: "left" },
    },
    {
      field: "path",
      headerName: "لینک صفحه",
      cellStyle: { textAlign: "center" },
    },
    {
      field: "Children",
      headerName: "مسیر فرعی",
      cellRenderer: (params: { value: string[] }) => (
        <div className=" flex gap-2 items-center justify-center">
          <input
            id="s1-14"
            type="text"
            className="text-center rounded-xl dark:text-black w-2/3 bg-gray-200" 
            disabled
            defaultChecked={params.value.length > 0 ? true : false}
            // checked={params.value.length > 0 ? '' : false}
            value={params.value.length > 0 ? 'دارد' : 'ندارد'}
          />
        </div>
      ),
    },
    {
      field: "show",
      headerName: "منوی اصلی",
      cellRenderer: (params: { value: boolean }) => (
        <div className=" flex gap-2 items-center justify-center">
          <input
            id="s1-14"
            type="text"
            className="text-center rounded-xl dark:text-black w-2/3 bg-gray-200"
            defaultChecked={params.value}
            value={params.value == false ? 'نمی باشد' : 'می باشد'}
          />
        </div>
      ),
    },

    {
      field: "actions",
      headerName: "عملیات",
      cellStyle: {
        display: "flex",
        justifyContent: "center",
      },
      cellRenderer: (params: any) => (
        <div className="flex gap-2 mt-1">
          <Button
            variant="primary"
            className="bg-rose-500 hover:bg-rose-800"
            size="sm"
            onClick={() => {
              setIsOpenDel(params.data._id);
            }}   
          >
            <TrashBinIcon />
          </Button>
          <Button
            variant="primary"
            className="bg-yellow-400 hover:bg-yellow-500"
            size="sm"
            onClick={() => {
              navigate("/dynamic-pages/update-dynamic-page", {
                state: { data: params.data },
              });
            }}
          >
            <UpdateIcon />
          </Button>
          <Button
            variant="primary"
            className="bg-indigo-400 hover:bg-indigo-500"
            size="sm"
            onClick={() => {
              navigate("/dynamic-pages/new-sub-page", {
                state: { id: params.data._id },
              });
            }}
          >
            <TreeIcon />
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
        {/* <CreateEducation refetch={refetch} /> */}
      </div>
      <div style={{ width: "100%", height: "400px" }}>
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
        isOpen={!!isOpenDel}
        onClose={handleCloseConfirm}
        isLoading={mutation.isPending}
        onSubmit={() => mutation.mutate(isOpenDel)}
        message="آیا میخواهید این صفحه را حذف کنید؟"
      />

      {/* <UpdateEducation
        isOpen={isOpenUp}
        onClose={handleCloseUp}
        refetch={refetch}
        data={updateValues}
      /> */}
    </>
  );
}

export default DynamicPagesList;
