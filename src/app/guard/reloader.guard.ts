import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from '../service/settings.service';

@Injectable({
  providedIn: 'root'
})
export class ReloaderGuard implements CanActivate {
  constructor(private service: SettingsService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.service.$bombNb == 0){
      this.router.navigate(['/settings']);
      return false;
    }else{
      return true;
    }
    
  }
  
}
