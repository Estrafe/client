import Papa from "papaparse";
import { City } from "@/app/dashboard/model";
import { toast } from "sonner";

export async function importJSONtoTable(
    e: React.ChangeEvent<HTMLInputElement>,
    organizationName: string | null,
    categoryName: string | undefined,
    setDataAction: React.Dispatch<React.SetStateAction<City[]>>
) {
    try {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const fileContent = event.target?.result;
                if (!fileContent) {
                    throw new Error("File content is empty.");
                }

                const parsedData = JSON.parse(fileContent.toString());

                if (!Array.isArray(parsedData)) {
                    throw new Error("El archivo JSON no es un array.");
                }

                const responses = await Promise.all(
                    parsedData.map((row: any) =>
                        fetch(`/api/data/${organizationName}/${categoryName}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: row.name,
                                status: row.status,
                                amount: row.amount,
                                cost: row.cost,
                                creationDate: row.creationDate,
                            }),
                        })
                    )
                );

                responses.forEach((response, index) => {
                    if (!response.ok) {
                        console.error(`Failed to save row ${index}:`, response.statusText);
                    }
                });

                const savedProducts = await Promise.all(responses.map((res) => res.json()));

                setDataAction((prev) => (prev ? [...prev, ...savedProducts] : savedProducts));

                toast("¡Éxito! Los datos se han importado correctamente.");
            } catch (error) {
                console.error("Error importing JSON:", error);
                toast.error(`Ocurrió un error al importar los datos: ${error?.message || ""}`);
            }
        };

        reader.readAsText(file);
    } catch (error) {
        console.error("Error reading file:", error);
        toast.error("No se pudo leer el archivo JSON.");
    }
}

export async function importCSVtoTable(
    e: React.ChangeEvent<HTMLInputElement>,
    organizationName: string | null,
    categoryName: string | undefined,
    setDataAction: React.Dispatch<React.SetStateAction<City[]>>
) {
    try {
        const file = e.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const dataRows = results.data;
                if (!Array.isArray(dataRows)) {
                    toast.error("El archivo CSV no contiene datos válidos.");
                    return;
                }

                console.log("Parsed CSV Rows:", dataRows);

                try {
                    const responses = await Promise.all(
                        dataRows.map(async (row: any, idx: number) => {
                            const parsedAmount = Number(row.amount);
                            const parsedCost = Number(row.cost);

                            const missingName = !row.name;
                            const missingStatus = !row.status;
                            const invalidAmount = Number.isNaN(parsedAmount);
                            const invalidCost = Number.isNaN(parsedCost);

                            if (missingName || missingStatus || invalidAmount || invalidCost) {
                                console.warn(`Row ${idx} has invalid data:`, row);
                                return null;
                            }

                            const requestBody = {
                                name: row.name,
                                status: row.status,
                                amount: parsedAmount,
                                cost: parsedCost,
                                creationDate: row.creationDate || new Date().toISOString(),
                            };

                            const res = await fetch(`/api/data/${organizationName}/${categoryName}`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(requestBody),
                            });

                            return res;
                        })
                    );

                    const validResponses = responses.filter(Boolean) as Response[];

                    validResponses.forEach((response, idx) => {
                        if (!response.ok) {
                            console.error(`Failed to save row ${idx}:`, response.statusText);
                        }
                    });

                    const savedProducts = await Promise.all(
                        validResponses.map((res) => res.json())
                    );

                    if (savedProducts.length > 0) {
                        setDataAction((prev) => (prev ? [...prev, ...savedProducts] : savedProducts));
                    }

                    toast("¡Éxito! Los datos se han importado correctamente.");
                } catch (error) {
                    console.error("Error importing CSV:", error);
                    toast.error(`Ocurrió un error al importar los datos: ${error?.message || ""}`);
                }
            },
            error: (err) => {
                console.error("PapaParse error:", err);
                toast.error("Error al parsear el CSV.");
            },
        });
    } catch (error) {
        console.error("Error reading file:", error);
        toast.error("No se pudo leer el archivo CSV.");
    }
}
