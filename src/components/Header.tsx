'use client';

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import UserDropdown from "@/components/UserDropdown";


/** A small array of data for the dropdown menu. Customize as needed. */
const navComponents = [
    {
        title: "History",
        href: "/docs/history",
        description:
            "Check out the line of events that led our company where we're now.",
    },
    {
        title: "International",
        href: "/international",
        description:
            "Cross-border journeys linking Europe’s major cities efficiently.",
    },
    {
        title: "Spain Network",
        href: "/international/spain",
        description:
            "Our roadmap for sustainability, modern tech, and better experiences.",
    },
    {
        title: "Services",
        href: "/docs/primitives/alert-dialog",
        description:
            "All travel solutions: high-speed, regional, booking, and onboard perks.",
    },
    {
        title: "CO₂ Compliance",
        href: "/CO2-Compliance",
        description:
            "Cutting emissions with green energy and eco-friendly innovations.",
    },
    {
        title: "Presence in Germany",
        href: "/docs/primitives/tooltip",
        description:
            "Seamless network expansion into Germany’s major cities and hubs.",
    },
];

function ListItem({
                      className,
                      title,
                      children,
                      ...props
                  }: React.ComponentPropsWithoutRef<"a"> & { title: string }) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none",
                        "transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
}

/** Reusable Header Component */
export default function Header() {
    const [language, setLanguage] = React.useState<string>("english");

    return (
        <header
            className={cn(
                "flex justify-between items-center h-20 px-8 md:px-10 lg:px-16",
                "bg-gradient-to-r from-red-700 via-red-500 to-red-700 text-white",
                "z-50 w-full" // ensures it's above other elements
            )}
            style={{
                position: "relative", // or "sticky" if you prefer
            }}
        >
            {/* Navigation Menu */}
            <NavigationMenu>
                <NavigationMenuList>
                    {/* Travel with Us */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className={cn(
                                "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
                                " hover:text-white transition-colors duration-150 text-base md:text-lg font-bold"
                            )}
                        >
                            Travel with us
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className=" z-50">
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[0.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <Link
                                            className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                            <img
                                                src="/train_estrafe.svg"
                                                className="h-12 w-auto -ml-12 text-white"
                                                alt="Estrafe Train"
                                            />
                                            <div className="mb-2 mt-4 text-lg font-medium text-gray-800">
                                                estrafe
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                The number 1 unopinionated train operational company in Switzerland.
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/routes" title="Routes">
                                    Check out all the routes that operate in Switzerland.
                                </ListItem>
                                <ListItem href="/stations" title="Stations">
                                    Check out the stations across the country.
                                </ListItem>
                                <ListItem href="/trains" title="Fleet">
                                    Checkout the fleet of train models used across our services.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Components */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className={cn(
                                "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
                                "hover:text-white transition-colors duration-150 text-base md:text-lg font-bold"
                            )}
                        >
                            About Us
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {navComponents.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            {/* Logo on the Right */}
            <Link href="/">
                <Image
                    src="/white_estrafe.svg"
                    alt="Estrafe logo"
                    width={200}
                    height={200}
                    className="hidden md:block"
                    priority
                />
            </Link>

            <div className="flex flex-row gap-5 items-center">
                <Link href="/support">
                    <Button variant="ghost" className="bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent hover:text-white transition-colors duration-150 text-base md:text-lg font-bold"
                    >
                        Support Center
                    </Button>
                </Link>
                {/*User Dropdown*/}
                <UserDropdown />
            </div>
        </header>
    );
}
