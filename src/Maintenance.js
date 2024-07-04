import React from "react";
import img1 from "./asset/maintenance.png";
// import img2 from "./asset/img2.png";
// import img3 from "./asset/img3.png";
import "./index.css";

function Maintenance() {
  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center overflow-x-hidden">
      <div className="container mx-auto px-4">
        <section className="flex flex-wrap lg:flex-nowrap justify-center items-center h-full relative">
          <div className="font-poppins text-gray-200 text-center lg:text-left">
            <h1 className="font-medium text-5xl py-3">
              The website is in <br /> maintenance mode
            </h1>
            <p className="lg:w-5/6 mx-auto lg:mx-0">
              We have done all the technical improvements and will be back very
              soon. Thank you for your patience!
            </p>
           
          </div>
          <div className="relative my-auto text-center w-full lg:w-2/5">
            <img
              className="rounded-lg mx-auto animate-moveY w-full max-w-xs lg:max-w-[590px] lg:max-h-[390px] "
              src={img1}
              alt="image1"
            />
            {/* <img
              className="absolute top-[-90px] left-[-880px] w-[70%] opacity-50 animate-rotateZ"
              src={img2}
              alt="image2"
            />
            <img
              className="absolute top-0 right-[200px] w-[50%] opacity-30 -z-[99] animate-rotateZ"
              src={img3}
              alt="image3"
            /> */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Maintenance;
