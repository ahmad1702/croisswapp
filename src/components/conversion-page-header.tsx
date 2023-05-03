
import Balancer from "react-wrap-balancer";

import { cn } from "@/utils/cn";

export type ConversionPageHeaderProps = { title: string, description: string }
const ConversionPageHeader = ({ title, description }: ConversionPageHeaderProps) => {
    return (
        <div className={cn("w-full lg:max-w-5xl mx-auto")}>
            <div className="md:flex md:items-end md:gap-4">
                <h1
                    className="font-cal animate-fade-up bg-gradient-to-br from-yellow-500 to-orange-500 bg-clip-text text-5xl md:text-7xl font-bold text-transparent opacity-0 drop-shadow-sm"
                    style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
                >
                    Croisswapp:
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold leading-tightest mb-3">{title}</h2>
            </div>
            <p
                className="animate-fade-up md:text-center text-muted-foreground/80 opacity-0 md:text-xl"
                style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
            >
                <Balancer>{description}</Balancer>
            </p>
        </div >
    )
}

export default ConversionPageHeader;