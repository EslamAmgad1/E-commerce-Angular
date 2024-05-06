import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize, identity } from 'rxjs';
import { BusyService } from '../services/busy.service';
import { environment } from '../../../environments/environment';


export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  const busyService = inject(BusyService);
  if (
    request.url.includes('emailExists') ||
    request.method === 'POST' && request.url.includes('orders') ||
    request.method === 'DELETE'
  ) {
    return next(request);
  }
  busyService.busy();
  return next(request).pipe(
    (environment.production ? identity : delay(1000)),
    finalize(() => busyService.idle())
  )
}

