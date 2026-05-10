export interface AccountDetails {
  accountId:            string;
  accountOperationDTOS: AccountAccountOperation[];
  balance:              number;
  currentPage:          number;
  pageSize:             number;
  totalPages:           number;
}

export interface AccountAccountOperation{
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}
