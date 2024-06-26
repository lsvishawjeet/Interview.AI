import PostMethod1 from "@/components/myComponents/PostMethod1";
import React from "react";

function page() {
  return (
    <div className="">
      <div>
        <span className="font-semibold text-2xl">Dashboard</span>
      </div>
      <div className="flex justify-center">
        <div className=" flex flex-col">
          <PostMethod1 />
        </div>
      </div>
    </div>
  );
}

export default page;
