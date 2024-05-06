import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';

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
    delay(500),
    finalize(() => busyService.idle())
  )
}

