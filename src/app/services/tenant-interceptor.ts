import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable()
export class TenantHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tenantReq = req.clone({ headers: req.headers.set('current', sessionStorage.getItem('current'))})
    if (sessionStorage.getItem('tenant') != null) {
      tenantReq = tenantReq.clone({ headers: tenantReq.headers.append('Tenant', sessionStorage.getItem('tenant'))})
    }
    if (req.method === 'POST' || req.method === 'PUT') {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json')})
      // req = req.clone({ headers: req.headers.append('Access-Control-Allow-Origin', 'yes')})
    }
    return next.handle(req)
  }
}
