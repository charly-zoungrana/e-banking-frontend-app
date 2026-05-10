export interface AccountDetails {
  accountId:            string;
  accountOperationDTOS: AccountOperation[];
  balance:              number;
  currentPage:          number;
  pageSize:             number;
  totalPages:           number;
}

export interface AccountOperation{
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}
