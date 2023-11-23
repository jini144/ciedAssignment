import { Component, OnInit } from '@angular/core';
import { ServiceApiService } from '../service-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  leads: any[] = [];
  activeleads: any[] = [];
  constructor(
    private serviceapi:ServiceApiService
  ) { }

  ngOnInit(): void {
    this.loadLeads();
    this.fetchLeads();
  }
  loadLeads(): void {
    const token = localStorage?.getItem('BEARER');
    const userId = localStorage?.getItem('USER-ID');;
    if(token !=null && userId !=null)
    this.serviceapi.getLeads(token, userId).subscribe((response:any) => {
      this.leads = response.data.results;
    });
  }
  isHovered = false;

  onCardMouseOver(i:any): void {
    this.isHovered = true;
  }
  fetchLeads(): void {
    const token = localStorage?.getItem('BEARER');
    const userId = localStorage?.getItem('USER-ID');
    const params = {
      stage_type: 'active',
      limit: '10',
      offset: '0',
      search: '',
      ordering: '-probability'
    };
    if(token !=null && userId !=null)
  
    this.serviceapi.getLeadsActive(params,token, userId).subscribe((response:any) => {
      this.activeleads = response.data.results;
    });

    // this.http.get('https://assignment.leadtracker.cied.dev/v1/leads/', { headers, params })
    //   .subscribe((response: any) => {
    //     if (response.success) {
    //       this.leads = response.data.results;
    //     }
    //   });
  }


}
