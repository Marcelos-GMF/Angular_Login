import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/views/pages/login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  sair(){
    this.auth.logout();
  }

}
