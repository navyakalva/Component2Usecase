import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
@Injectable({
    providedIn:'root'
})
export class Guardservice {

    constructor(public router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.isLoggedIn()) { // determine if the uder is logged in from this method.
            return true;
        }
        this.router.navigate(['/HOME']);
        return false;
    }
    isLoggedIn():boolean
    {
        let user= localStorage.getItem("token");
        if (user == null)
            return false;
        return true;

    }

}
