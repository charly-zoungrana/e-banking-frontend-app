import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from "../services/account.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";

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
  operationFormGroup!:FormGroup;
  errorMessage!:string;
  isSearchBtnClicked:boolean=false;
  accountId:string|null=null;

  constructor(
    private fb:FormBuilder,
    private accountService:AccountService,
    private route:ActivatedRoute,
    public authService:AuthService
  ) { }

  ngOnInit(): void {
    this.accountId=this.route.snapshot.params['accountId'];
    this.accountFormGroup=this.fb.group(
      {
        accountId:[""]
      }
    );

    this.operationFormGroup=this.fb.group({
      operationType:this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(null),
      accountDestination:this.fb.control(null)

    })
    //this.handleSearchAccount();
  }

  handleSearchAccount() {
    this.isSearchBtnClicked=true;
    if(!this.accountId){
      this.accountId=this.accountFormGroup.value.accountId;
    }
    this.account$=this.accountService.getAccount(this.accountId!,this.currentPage,this.pageSize).pipe(

      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  goToPage(page: number) {
    this.currentPage=page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {

    if(!this.accountId){
      this.accountId=this.accountFormGroup.value.accountId;
    }
    let operationType:string=this.operationFormGroup.value.operationType;
    let amount:number=this.operationFormGroup.value.amount;
    let description:string=this.operationFormGroup.value.description;
    let accountDestination:string=this.operationFormGroup.value.accountDestination;

    if(operationType==="DEBIT"){

      this.accountService.debit(this.accountId!,amount,description).subscribe(
        {
          next:()=>{
            alert("Success Debit");
            this.operationFormGroup.reset();
            this.handleSearchAccount();
          },
          error:err => {
            console.log(err);
          }
        }
      )
    }else if(operationType==="CREDIT"){

      this.accountService.credit(this.accountId!,amount,description).subscribe(
        {
          next:()=>{
            alert("Success Credit");
            this.operationFormGroup.reset();
            this.handleSearchAccount();
          },
          error:err => {
            console.log(err);
          }
        }
      )

    }else if(operationType==="TRANSFER"){
      this.accountService.transfer(this.accountId!,accountDestination,amount,description).subscribe(
        {
          next:()=>{
            alert("Success Transfer");
            this.operationFormGroup.reset();
            this.handleSearchAccount();
          },
          error:err => {
            console.log(err);
          }
        }
      )
    }
  }
}
