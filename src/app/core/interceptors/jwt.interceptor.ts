import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { take } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  var token ;
  var accountService =  inject(AccountService);
  accountService.currentUser$.pipe(take(1)).subscribe({next: user => token = user?.token})

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  return next(req);
};
