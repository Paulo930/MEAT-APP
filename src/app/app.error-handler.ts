import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import {HttpErrorResponse} from '@angular/common/http'
import 'rxjs/add/observable/throw'
import {Observable} from 'rxjs/Observable'

import { NotificationService } from "./shared/messages/notification.service";
import { LoginService } from "./security/login/login.service";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(
    private ns: NotificationService,
    private Injector: Injector,
    private zone: NgZone
    ){
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if(errorResponse instanceof HttpErrorResponse){
      const message = errorResponse.error.message
      this.zone.run(() => {
        switch(errorResponse.status){
          case 401:
            this.Injector.get(LoginService).handleLogin()
            break;
          case 403:
            this.ns.notify(message || 'Não autorizado.')
            break;
          case 404:
            this.ns.notify(message || 'Recurto não encontrado. Verifique o console para mais detalhes')
            break;
        }
      })
    }
    super.handleError(errorResponse)
  }
}
