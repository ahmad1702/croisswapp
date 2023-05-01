"use client"
import Balancer from "react-wrap-balancer";

import { siteConfig } from "@/app/site-config";
import { cn } from "@/utils/cn";

const JupyterPythonHeader = () => {
    return (
        <div className={cn("w-full lg:max-w-5xl mx-auto")}>
            <h1
                className="font-cal animate-fade-up bg-gradient-to-br from-yellow-500 to-orange-500 bg-clip-text text-center text-5xl/[3rem] font-bold text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
                style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
            >
                <Balancer>
                    <div className='flex items-end whitespace-pre-wrap'>
                        <div className='inline-block '>
                            <div className='flex flex-col'>
                                <img height={50} width={50} src="/img/jupyter-logo.png" alt="" className='inline-block dark:hidden' />
                                <img height={50} width={50} src="/img/jupyter-logo-dark.png" alt="" className='hidden dark:inline-block' />
                                <div className='inline-block'>Ju</div>
                            </div>
                        </div>
                        <div className='inline-block'>
                            <div className='flex flex-col items-center'>
                                <div className='inline-block'>Py</div>
                                <img height={40} width={40} src="/img/python-logo.png" alt="" className='inline-block dark:hidden' />
                                <img height={40} width={40} src="/img/python-logo-dark.png" alt="" className='hidden dark:inline-block' />
                            </div>
                        </div>
                        {" "}
                        ter
                        Notebooks? {" "}
                    </div>
                    never
                    heard of her
                </Balancer>
            </h1>
            <p
                className="animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
                style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
                <Balancer>{siteConfig.description}</Balancer>
            </p>
        </div >
    )
}

export default JupyterPythonHeader;