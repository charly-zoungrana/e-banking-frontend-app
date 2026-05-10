import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from "../services/account.service";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accountFormGroup!:FormGroup;
  currentPage:number=0;
  pageSize:number=5;
  account$!:Observable<AccountDetails>;

  constructor(
    private fb:FormBuilder,
    private accountService:AccountService
  ) { }

  ngOnInit(): void {
    this.accountFormGroup=this.fb.group(
      {
        accountId:[""]
      }
    )
  }

  handleSearchAccount() {
    let accountId:string=this.accountFormGroup.value.accountId;
    this.account$=this.accountService.getAccount(accountId,this.currentPage,this.pageSize);
  }

  goToPage(page: number) {
    this.currentPage=page;
    this.handleSearchAccount();
  }
}
