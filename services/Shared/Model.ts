export interface Talent {
  talentId: string;
  name: string;
  location: string;
  photoUrl?: string;
  skills?: string[];
}

export type ReservationState = "PENDING" | "APPROVED" | "CANCELED";

export interface Reservation {
  reservationId: string;
  user: string;
  talentId: string;
  state: ReservationState;
}
