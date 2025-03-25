import { useState } from "react";
import { Input } from "@/components/ui/input";

interface CardNumberInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function CardNumberInput({ value, onChange }: CardNumberInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

        if (input.length > 16) input = input.slice(0, 16); // Limit to 16 digits

        // Format the card number with spaces (#### #### #### ####)
        const formatted = input.replace(/(\d{4})/g, "$1 ").trim();

        onChange(formatted);
    };

    return (
        <Input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19} // 16 digits + 3 spaces
            className="w-full text-sm"
        />
    );
}
