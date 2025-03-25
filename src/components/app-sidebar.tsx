"use client";

import * as React from "react";
import {
  Building2,
  TrainFrontTunnelIcon,
  TrainFront,
  RailSymbol,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

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
  navMain: [
    {
      title: "Cities",
      url: "/dashboard/city",
      icon: Building2,
      isActive: true,
    },
    {
      title: "Stations",
      url: "/dashboard/stations",
      icon: TrainFrontTunnelIcon,
    },
    {
      title: "Trains",
      url: "/dashboard/trains",
      icon: TrainFront,
    },
  ],
};

// Updated NavMain to match the style of NavProjects
function NavMain({ items }: { items: Array<{ title: string; url: string; icon?: React.ElementType; isActive?: boolean; }> }) {
  return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Contents</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    {React.createElement(item.icon)}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
  );
}
