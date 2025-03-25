import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface ExpiryDateInputProps {
    value: string;
    onChange: (value: string) => void;
    setIsValid: (isValid: boolean) => void;
}

export default function ExpiryDateInput({ value, onChange, setIsValid }: ExpiryDateInputProps) {
    const [isError, setIsError] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        if (isTouched) validateInput(value);
    }, [value, isTouched]);

    const validateInput = (input: string) => {
        const parts = input.split("/");
        if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) {
            setIsError(true);
            setIsValid(false);
            return;
        }

        const month = parseInt(parts[0], 10);
        const year = parseInt(parts[1], 10);

        if (month < 1 || month > 12 || year < 25 || year > 35) {
            setIsError(true);
            setIsValid(false);
        } else {
            setIsError(false);
            setIsValid(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

        if (input.length > 4) input = input.slice(0, 4); // Limit to 4 digits

        let formatted = input;
        if (input.length >= 3) {
            formatted = `${input.slice(0, 2)}/${input.slice(2)}`;
        }

        onChange(formatted);
    };

    return (
        <div className="w-full">
            <Input
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={() => setIsTouched(true)}
                placeholder="MM/YY"
                maxLength={5} // Ensures the format stays "MM/YY"
                className={`w-full text-sm ${isError ? "border-red-500" : "border-gray-300"}`}
            />
            {isError && isTouched && (
                <p className="text-xs text-red-500 mt-1 ml-1">Invalid Expiry Date</p>
            )}
        </div>
    );
}
