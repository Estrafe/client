"use client";

import * as React from "react";
import {
  Building2,
  Frame,
  LineChart,
  Map,
  PieChart,
  RailSymbol,
  TrainFront,
  TrainFrontTunnelIcon,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

// Sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Estrafe",
      logo: RailSymbol,
      plan: "Enterprise",
    },
  ],
  // We only need the top-level items – no nested dropdown items.
  navMain: [
    {
      title: "Cities",
      url: "#",
      icon: Building2,
      isActive: true,
    },
    {
      title: "Stations",
      url: "#",
      icon: TrainFrontTunnelIcon,
    },
    {
      title: "Trains",
      url: "#",
      icon: TrainFront,
    },
    {
      title: "Services",
      url: "#",
      icon: LineChart,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

// Simple navigation component rendering only top-level buttons.
function NavMainSimple({ items }: { items: Array<{ title: string; url: string; icon?: React.ElementType; isActive?: boolean; }> }) {
  return (
      <div className="flex flex-col space-y-2">
        {items.map((item) => (
            <Button
                key={item.title}
                variant="ghost"
                className={`w-full justify-start px-4 py-2 text-left ${
                    item.isActive ? "border-l-4 border-violet-estrafe text-violet-estrafe" : "text-gray-700"
                }`}
                // You can add an onClick handler here if you want to navigate to the url.
            >
              {item.icon && (
                  <item.icon className="w-5 h-5 mr-2" />
              )}
              {item.title}
            </Button>
        ))}
      </div>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          {/* Replace NavMain with our simple version */}
          <NavMainSimple items={data.navMain} />
          {/* Optionally, you can also remove projects if not needed */}
          {/* <NavProjects projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
  );
}
