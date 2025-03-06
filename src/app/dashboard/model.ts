// models.ts

export interface City {
    id: string; // Unique identifier (UUID)
    name: string; // City name
    stations?: Station[];
}

export interface Station {
    id: string; // Unique identifier (UUID)
    name: string; // Station name
    city: City; // Use a full City object instead of just cityId
    routes?: Route[];
}

export interface Route {
    id: string;               // Unique identifier (UUID)
    name: string;             // Route name
    // List of station IDs that are part of the route (if needed)
    stationIds?: string[];
    // The origin and destination stations (by ID)
    originStationId: Station;
    destinationStationId: Station;
}

export interface Train {
    id: string;               // Unique identifier (UUID)
    name: string;             // Train name
    service: Service;          // e.g., Regional, Intercity, Link Express
    nextStation: Station;      // e.g., "Zurich HB", "Lugano Süd", "Blenio HB"
    version: number;          // For optimistic locking/versioning
    // Array of coaches that belong to this train
    coaches?: Coach[];
}

export interface Coach {
    id: string;               // Unique identifier (UUID)
    // Reference back to the train via its ID (if needed)
    trainId: string;
    // Array of seats available in this coach
    seats?: Seat[];
}

export interface Seat {
    id: string;               // Unique identifier (UUID)
    seatNumber: string;       // Unique seat identifier within the coach
    classType: string;        // e.g., Economy, Comfort, Business
    booked: boolean;          // Booking status
    // Reference to the coach via its ID
    coachId: string;
}

export interface Service {
    id: string;               // Unique identifier (UUID)
    serviceName: string;       // Unique seat identifier within the coach
}
