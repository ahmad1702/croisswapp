
"use client"
import Balancer from "react-wrap-balancer";

import { cn } from "@/utils/cn";

const JSXsonHeader = () => {
    const description = 'JSXson is a converter between JSX Props and a JSON object whose keys are the same as the JSX Props.'
    return (
        <div className={cn("w-full lg:max-w-5xl mx-auto")}>
            <h1
                className="font-cal animate-fade-up bg-gradient-to-br from-yellow-500 to-orange-500 bg-clip-text text-center text-5xl/[3rem] font-bold text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem] -mt-4"
                style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
            >
                <Balancer>JSXSON</Balancer>
            </h1>
            <p
                className="animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
                style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
                <Balancer>{description}</Balancer>
            </p>
        </div >
    )
}

export default JSXsonHeader;