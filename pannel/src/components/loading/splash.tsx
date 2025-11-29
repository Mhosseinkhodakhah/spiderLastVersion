// import { Atom } from "react-loading-indicators";

import { useQuery } from "@tanstack/react-query";
import { checkToken } from "../../server/admin";
import { useState } from "react";
import { useNavigate } from "react-router";

function SplashLoading() {

  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["getAdmin"],
    queryFn: checkToken,
  });
  
  
  if (data){
    console.log('11')
    navigate("/dashboard", { replace: true })
  }else{
    console.log('22')
    navigate("/signin", { replace: true })
  }

  return (  
    <div className="fixed w-full h-screen flex flex-col justify-center items-center bg-gray-300 z-50">
      <h1>در حال انتقال به پنل ادمین . . .</h1>
        <span className="loader mt-5"></span>
        {/* <Atom color="#32cd32" size="medium" text="" textColor="" /> */}
    </div>
  );
}

export default SplashLoading;
