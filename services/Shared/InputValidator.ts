import { Talent, Reservation } from "./Model";

export class MissingFieldError extends Error {}

export function validateAsReservationEntry(arg: any) {
  if ((arg as Reservation).reservationId == undefined) {
    throw new MissingFieldError("Value for reservationId required!");
  }
  if ((arg as Reservation).talentId == undefined) {
    throw new MissingFieldError("Value for talentId required!");
  }
  if ((arg as Reservation).state == undefined) {
    throw new MissingFieldError("Value for state required!");
  }
  if ((arg as Reservation).user == undefined) {
    throw new MissingFieldError("Value for user required!");
  }
}

export function validateAsTalentEntry(arg: any) {
  if (!(arg as Talent).name) {
    throw new MissingFieldError("Value for name required!");
  }
  if (!(arg as Talent).location) {
    throw new MissingFieldError("Value for location required!");
  }
  if (!(arg as Talent).talentId) {
    throw new MissingFieldError("Value for talentId required!");
  }
}
