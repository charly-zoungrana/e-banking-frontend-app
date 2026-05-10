import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Customer } from '../model/customer.model';
import {CustomerService} from "../services/customer.service";
import {CustomerAccounts} from "../model/customer-account.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {

  customerId!:number;
  customer!:Customer;
  customerAccounts$!:Observable<CustomerAccounts>;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private customerService:CustomerService) {

    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId=this.route.snapshot.params['id'];
    this.customerAccounts$=this.customerService.getCustomerAccounts(this.customerId);

  }

  handleAccountOperations(accountId:string){
    this.router.navigateByUrl("/accounts/"+accountId);

  }
}
