"use client";

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
import {
    ChevronDownIcon,
    Cloud,
    CreditCard, Github, Globe,
    Keyboard, LifeBuoy, LogOut,
    Mail,
    MessageSquare, Plus,
    PlusCircle,
    Settings,
    User,
    UserCircle2,
    UserPlus,
    Users
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";


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
        title: "Estrafe 2030",
        href: "/estrafe-2030",
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

            <div className="flex flex-row gap-5">
                <Link href="/support">
                    <Button variant="ghost" className="bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent hover:text-white transition-colors duration-150 text-base md:text-lg font-bold"
                    >
                        Support Center
                    </Button>
                </Link>
                {/*Language Dropdown*/}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-0">
                            <Globe className=""/>
                            <ChevronDownIcon className=""/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Language</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                            <DropdownMenuRadioItem value="english">English</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="german">Deutsch</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="french">Français</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/*User Dropdown*/}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="rounded-2xl">
                            <UserCircle2 className="" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User />
                                <span>Profile</span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                <span>Billing</span>
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings />
                                <span>Settings</span>
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Keyboard />
                                <span>Keyboard shortcuts</span>
                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Users />
                                <span>Team</span>
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <UserPlus />
                                    <span>Invite users</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Mail />
                                            <span>Email</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <MessageSquare />
                                            <span>Message</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <PlusCircle />
                                            <span>More...</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuItem>
                                <Plus />
                                <span>New Team</span>
                                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Github />
                            <span>GitHub</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LifeBuoy />
                            <span>Support</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>
                            <Cloud />
                            <span>API</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut />
                            <span>Log out</span>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
