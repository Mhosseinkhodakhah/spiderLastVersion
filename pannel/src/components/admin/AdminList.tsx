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
import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../ui/button/Button";
import { PlusIcon, TrashBinIcon, UpdateIcon ,AcceptIcon } from "../../icons";
import Confirm from "../confirm";
import toast from "react-hot-toast";
import { deleteAdmin, getAdmin } from "../../server/admin";
import moment from "jalali-moment";
import CreateAdmin from "./createAdmin";
import UpdateAdmin from "./updateAdmin";
import UpdateAdminAccess from "./updateAdminAccess";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  firstName: string;
  lastName: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  actions: any;
}

const themeDark = themeAlpine.withPart(colorSchemeDarkBlue);
const themeLight = themeAlpine.withPart(colorSchemeLight);

function AdminList() {
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [isOpenDel, setIsOpenDel] = useState<string>("");
  const [isOpenUp, setIsOpenUp] = useState<string>("");
  const [isOpenUpAccess, setIsOpenUpAccess] = useState<string>("");

  const handleCloseConfirm = () => setIsOpenDel("");
  const handleCloseUp = () => setIsOpenUp("");
  const handleCloseUpAccess = () => setIsOpenUpAccess("");
  const handleCloseCreate = () => setIsOpenCreate(false);

  const deleteMutation = useMutation({
    mutationKey: ["deleteAdmin"],
    mutationFn: deleteAdmin,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("ادمین با موفقیت حذف شد");
      } else {
        toast.success("ادمین حذف نشد ، لطفا دوباره امتحان کنید");
      }
      refetch();
      handleCloseConfirm();
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["getAdmin"],
    queryFn: getAdmin,
  });

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "firstName", headerName: "نام" },
    { field: "lastName", headerName: "نام خانوادگی" },
    { field: "userName", headerName: "نام کاربری" },
    {
      field: "createdAt",
      headerName: "تاریخ ایجاد",
      valueFormatter: (params: any) =>
        moment(params?.value).locale("fa").format("YYYY/MM/DD"),
    },
    {
      field: "updatedAt",
      headerName: "تاریخ آخرین تغییر",
      valueFormatter: (params: any) =>
        moment(params?.value).locale("fa").format("YYYY/MM/DD"),
    },

    {
      field: "actions",
      headerName: "عملیات",
      cellRenderer: (params: any) => (
        <div className="flex gap-2 mt-1 ">
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
              setIsOpenUp(params.data._id);
            }}   
          >
            <UpdateIcon />
          </Button>
          {/* its for accesspoint of the admin */}
          <Button
            variant="primary"
            className="bg-yellow-400 hover:bg-yellow-500"
            size="sm"
            onClick={() => {
              setIsOpenUpAccess(params.data._id);
            }}
            >
            <AcceptIcon />
          </Button>
          {/* its for accesspoint of the admin */}
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
      <div className="my-4 flex gap-4 w-full justify-between">
        <Input
          type="text"
          id="filter-text-box"
          placeholder="جستجو..."
          onInput={onFilterTextBoxChanged}
        />
        {/* <CreateEducation refetch={refetch} /> */}
        <Button
          variant="primary"
          className=""
          size="sm"
          startIcon={<PlusIcon />}
          onClick={() => setIsOpenCreate(true)}
        >
          افزودن
        </Button>
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
        isLoading={deleteMutation.isPending}
        onSubmit={() => deleteMutation.mutate(isOpenDel)}
        message="آیا میخواهید ادمین را حذف کنید؟"
      />

      <CreateAdmin
        isOpen={isOpenCreate}
        onClose={handleCloseCreate}
        refetch={refetch}
      />

      <UpdateAdmin
        isOpen={!!isOpenUp}
        onClose={handleCloseUp}
        refetch={refetch}
        id={isOpenUp}
      />

      <UpdateAdminAccess
        isOpen={!!isOpenUpAccess}
        onClose={handleCloseUpAccess}
        refetch={refetch}
        id={isOpenUpAccess}
      />

    </>
  );
}

export default AdminList;
