import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-restindex',
  templateUrl: './restindex.component.html',
  styles: []
})
export class RestindexComponent implements OnInit {

  projects:any = [];
  methods:Methods[] = [];

  constructor(private http:HttpClient) { 

    this.getJSON().subscribe( (data:any)=>{
  
      console.log("DATA", data)

      for(let project of data['projects']){
        this.projects.push({ name : project.name, id: project._referenceId});
      }
      console.log("Proyectos",this.projects);

      for(let request of data['requests']){
        let metodo: Methods = new Methods(request.name, request.description, request.headers, request.method, request.payload, request.url, request._referenceLegacyProject, request.multipart);
        this.methods.push(metodo);
      }
      console.log("Requests",this.methods);
    });
  }

  ngOnInit() {
  }


  getJSON(){
    let url = "/assets/json/rest.json"

    return this.http.get(url).pipe(map( (resp:any)=>{
      return resp;
    }))
  }

}

class Methods {
  constructor( public name:string, public description:string, public headers:string , public method:string ,public payload:string , public url:string , public projectId:string , public multipart:any){}
}
