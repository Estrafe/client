export type ScheduleTicket = {
    id: string;
    departureTime: string;
    arrivalTime: string;
    basePrice: number;
    route: string;
    serviceDays: string;
    train: {
        id: string;
        name: string;
        accesible: boolean;
        animalsEnabled: boolean;
        co2Compliant: boolean;
        coaches : {
            id: string;
            coachNumber: number;
            seats: {
                id: string;
                seatNumber: number;
                classType: string;
                booked: boolean;
            }[];
            coachType: string;
        }[]
    };
}
