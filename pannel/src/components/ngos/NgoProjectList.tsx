import { useMutation, useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import moment from "jalali-moment";
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
import {
  changeStatusProject,
  enableAndDisableNgo,
  getNgosProjects,
} from "../../server/ngos";
import { Link } from "react-router";
import Button from "../ui/button/Button";
import { AcceptIcon, TimesIcon } from "../../icons";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  name: string;
  ["ngo.name"]: string;
  ["location.city"]: string;
  projectManagerName: string;
  startDate: string;
  endDate: string;
  details: any;
  actions: any;
  state: number;
}

const themeDark = themeAlpine.withPart(colorSchemeDarkBlue);
const themeLight = themeAlpine.withPart(colorSchemeLight);

function NgoProjectsList() {
  const [changeStatus, setChangeStatus] = useState<string>("");
  const [status, setStatus] = useState<number>(0);

  const [isOpenDisableAndEnable, setIsOpenDisableAndEnable] =
    useState<string>("");

  const handleCloseConfirm = () => setIsOpenDisableAndEnable("");
  const handleCloseChangeStatus = () => setChangeStatus("");

  const mutation = useMutation({
    mutationKey: ["enableAndDisableNgo"],
    mutationFn: enableAndDisableNgo,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("سمن با موفقیت فعال/غیرفعال شد");
        refetch();
        handleCloseConfirm();
      } else {
        toast.error("عملیات ناموفق ، لطفا دوباره امتحان کنید");
        handleCloseConfirm();
      }
    },
  });

  const mutationStatus = useMutation({
    mutationKey: ["changeStatusProject"],
    mutationFn: () => changeStatusProject(changeStatus, status),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(`پروژه با موفقیت ${status === 1 ? "تایید" : "رد"} شد`);
        refetch();
      } else {
        toast.error("عملیات ناموفق ، لطفا دوباره امتحان کنید");
      }
      handleCloseChangeStatus();
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["getNgosProjects"],
    queryFn: getNgosProjects,
  });

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "name", headerName: "نام پروژه" },
    { field: "ngo.name", headerName: "نام سمن" },
    { field: "projectManagerName", headerName: "نام مدیر پروژه" },
    { field: "location.city", headerName: "شهر" },
    {
      field: "startDate",
      headerName: "تاریخ شروع",
      cellRenderer: (params: any) => (
        <span>{moment(params?.value).locale("fa").format("YYYY/MM/DD")}</span>
      ),
    },
    {
      field: "endDate",
      headerName: "تاریخ پایان",
      cellRenderer: (params: any) => (
        <span>{moment(params?.value).locale("fa").format("YYYY/MM/DD")}</span>
      ),
    },
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

    {
      field: "details",
      headerName: "جزئیات",
      cellRenderer: (params: any) => {
        return (
          <Link
            to={{
              pathname: `/ngos/manage-project/${params?.data?._id}`,
            }}
          >
            <Button size="sm">جزئیات</Button>
          </Link>
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
        isOpen={!!isOpenDisableAndEnable}
        onClose={handleCloseConfirm}
        isLoading={mutation.isPending}
        onSubmit={() => mutation.mutate(isOpenDisableAndEnable)}
        message="آیا میخواهید این سمن را فعال/غیرفعال کنید؟"
      />

      <Confirm
        isOpen={!!changeStatus}
        onClose={handleCloseChangeStatus}
        isLoading={mutationStatus.isPending}
        onSubmit={() => mutationStatus.mutate()}
        message={`آیا پروژه را ${status === 1 ? "تایید" : "رد"} می کنید؟`}
      />
    </>
  );
}

export default NgoProjectsList;
