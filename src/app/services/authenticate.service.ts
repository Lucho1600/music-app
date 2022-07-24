import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  header = {'Access-Control-Request-Headers': '*',  'Content-Type': 'application/json'};

  url_server = "https://music-back-seminario.herokuapp.com/";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Request-Headers': '*', observe: 'response' })
  };

  constructor(private storage: Storage, private http: HttpClient) { 
    this.storage.create();
  }

  loginUser(credentials) {
    let params = {
      "user": credentials
    }
      return new Promise((accept, reject) => {
        this.http.post(`${this.url_server}login`, params, this.httpOptions)
        .subscribe((data: any) => {
          if ( data.status == "OK") {
            accept(data);
        } else {
          reject("Login Fallido");
        }
      },
      (error) => {
        reject("Error en la peticion")
      }
      )
    }); 
  }
  registerUser(userData){
    // userData.password = btoa(userData.password);
    // atob() funcion para desencriptar
    // return this.storage.set("user",userData)
    //userData.password = btoa(userData.password);
    //return this.storage.set("user", userData)
    let params = {
      "user": userData
    }
    return new Promise ((accept, reject) => {
      this.http.post(`${this.url_server}signup`, params, this.httpOptions).subscribe((data: any) => {
        if (data.status = "OK") {
          accept(data.msg);
        }else{
          reject(data.errors)
        }
      },
      (error) => {
        reject("Error en la peticion")
      }
      )
      });

  }

  getCurrentUser(id) {
    return this.http.get(`${this.url_server}current_user/${id}`, this.httpOptions)
  }

  updateUser(id, user) {
    let params = {
      "user": user
    }
    return new Promise ((accept, reject) => {
    this.http.post(`${this.url_server}update/${id}`, params, this.httpOptions)
    .subscribe((data: any) =>{
      if (data.status = "OK"){
        accept(data)
      }else{
        reject(data.errors)
      }
    }, 
    (error) => {
      reject(error)
    }
    )
  })
  }


}
