import { Injectable } from "@angular/core";

import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

import { Observable } from "rxjs/Observable";

import { Pinboard } from "../models/pinboard.model";
import { PinboardService } from "../services/pinboard.service";


@Injectable()
export class PinboardResolver implements Resolve<Pinboard> {
    constructor(private _pinboardService: PinboardService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pinboard> {
        return this._pinboardService.getPinboardFromCityName(route.params['stad']);
    }
}