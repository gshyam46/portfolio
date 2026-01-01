import React from "react";
import {
  RxGithubLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import Image from "next/image";

const Footer = () => {

  return (
    <div className="w-full h-full bg-transparent text-black shadow-lg p-[15px] ">
        <div className="w-full flex flex-col items-center justify-center m-auto">
            <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
                

                <div className="min-w-[200px] h-auto text-2xl flex flex-col items-center justify-start">
                    Thanks for watching through my Portfolio!
                  <h1 className="text-5xl mt-10">- GHANASHYAM -</h1> 
                </div>
                <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                    <div className="font-bold text-[16px]">Social Media</div>
                    
                    <p className="flex flex-row items-center my-[15px] cursor-pointer">
                        <RxTwitterLogo />
                        <span className="text-[15px] ml-[6px]">Twitter</span>    
                    </p>
                    <p className="flex flex-row items-center my-[15px] cursor-pointer">
                        <RxLinkedinLogo />
                        <span className="text-[15px] ml-[6px]">Linkedin</span>    
                    </p>
                     <p className="flex flex-row items-center my-[15px] cursor-pointer">
                        <RxGithubLogo />
                        <span className="text-[15px] ml-[6px]">Github</span>    
                    </p>
                </div>
                <div className=" mt-5 min-w-[200px] h-auto flex flex-col items-center justify-start">
                   
                   <div className="relative w-80 h-80 flex items-center justify-center">
                                
                               <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                 <Image
                             src="/shyam.jpg"
                             alt="Ghanashyam"
                             width={300}
                             height={300}
                             className="rounded-full object-cover object-bottom"
                                 />
                               </div>
                             
                           </div>
                </div>
            </div>

            <div className="mb-3 text-[15px] text-center">
                &copy; Ghanashyam 2026. All rights reserved.
            </div>
        </div>
    </div>
  )
}

export default Footer