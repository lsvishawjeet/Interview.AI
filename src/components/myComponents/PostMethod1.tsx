import React from "react";
import { Button } from "../ui/button";

function PostMethod1() {
  return (
    <div className="carousel rounded-box m-3 bg-red-500 w-[90vw] md:w-[30vw]">
      <div className="carousel-item w-1/2 flex-col">
        <div className="h-58">
          <div className={"h-60 md:h-96 bg-slate-500"}></div>
        </div>
        <div  className="bg-gray-300 flex justify-center align-middle p-2">
          <Button className="w-[99%] bg-green-500">This</Button>
        </div>
      </div>
      <div className="carousel-item w-1/2 flex-col">
        <div className="h-58">
          <div className={"h-60 md:h-96 bg-green-500"}></div>
        </div>
        <div className="bg-gray-300 flex justify-center align-middle p-2">
          <Button className="w-[99%] bg-blue-500">That</Button>
        </div>
      </div>
    </div>
  );
}

export default PostMethod1;
