import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user={localId:"userId",displayName:"userName"}
  constructor(public auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAccess();
    if (this.auth.isAuthenticated()){
      this.auth.userdetail().subscribe({next:data =>{
        this.user.displayName=data.users[0].displayName
        this.user.localId=data.users[0].localId
      }})
    }
  }

}
