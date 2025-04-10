export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' ;
  diagnosis: string;
}

export type SortField = 'firstName' | 'lastName' | 'dateOfBirth' | 'email';
export type SortDirection = 'asc' | 'desc';