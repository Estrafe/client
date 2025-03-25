"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { VerticalBarChart } from "@/components/dashboard/VerticalBarChart";
import { DataTable } from "@/app/dashboard/[tableName]/data-table";
import {
  cityColumns,
  routeColumns,
  stationColumns,
  trainColumns,
  coachColumns,
  seatColumns,
} from "./columns";
import {toast} from "sonner";
import {RadialChart} from "@/components/dashboard/RadialChart";
import {RadialChartStacked} from "@/components/dashboard/RadialChartStacked";
import {ServiceUptimeChart} from "@/components/dashboard/ServiceUptimeChart";
import {City} from "@/app/dashboard/model";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { tableName } = useParams();
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const tableVariants = {
    hidden: { opacity: 0, y: 50 }, // Start invisible and slightly below
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const getColumns = () => {
    switch (tableName) {
      case "city":
        return cityColumns;
      case "lines":
        return routeColumns;
      case "stations":
        return stationColumns;
      case "trains":
        return trainColumns;
      case "coach":
        return coachColumns;
      case "seat":
        return seatColumns;
      default:
        return [];
    }
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addNewRow = (newRow: any) => {
    setData((prevData) => [...prevData, newRow]);
  };

  const deleteRow = async (rowId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/${tableName}/${rowId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error deleting row: ${response.statusText}`);
      }

      // ✅ Remove the row from state after successful delete
      setData((prevData) => prevData.filter((row) => row.id !== rowId));

      toast.success("Fila eliminada correctamente.");
    } catch (error) {
      console.error("Error deleting row:", error);
      toast.error("Error eliminando la fila. Inténtelo de nuevo.");
    }
  };

  const updateRow = async (updatedRow: City) => {
    try {
      const response = await fetch(`http://localhost:8080/api/city/${updatedRow.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updatedRow.name }), // Only update the name
      });

      if (!response.ok) {
        throw new Error("Error updating row");
      }

      const updatedData = await response.json();

      setData((prevData) =>
          prevData.map((row) => (row.id === updatedRow.id ? updatedData : row))
      );

      toast.success("City updated successfully.");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating the city.");
    }
  };

  const capitalizeFirstLetter = (str: string | undefined) => {
    if (!str) return "Dashboard";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8080/api/${tableName}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await res.json();
        console.log(responseData);
        setData(responseData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    if (tableName) fetchData();
  }, [tableName]);

  useEffect(() => {
    const tableSection = document.getElementById("databaseTable");

    if (tableSection) {
      setTimeout(() => {
        tableSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 800);
    }
  }, []);


  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition ease-linear">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Contents</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{capitalizeFirstLetter(tableName)}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <motion.div
              variants={tableVariants}
              initial="hidden"
              animate="visible"
              className="mt-6"
          >
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* Stats Section */}
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <RadialChart />
              <VerticalBarChart />
              <RadialChartStacked />
            </div>

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-4">
                <span className="relative z-10 bg-background px-2 text-3xl">
                  {capitalizeFirstLetter(tableName)} Database
                </span>
            </div>


            {/* Data Table */}
            <motion.div
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                className="mt-6"
            >
            <DataTable
                data={filteredData}
                columns={getColumns()}
                setDataAction={setData}
                addNewRow={addNewRow}
                deleteRow={deleteRow}
                updateRow={updateRow}
            />
            </motion.div>
          </div>
          </motion.div>
        </SidebarInset>
      </SidebarProvider>
  );
}
