import {Customer} from "./customer.model";


export interface CustomerAccounts {
  bankAccountDTOS:BankAccount[];
  customerDTO:Customer
}

export interface BankAccount {
  id:        string;
  type:      string;
  createdAt: Date;
  balance:   number;
  currency:  string;
}





