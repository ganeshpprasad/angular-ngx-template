import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';

@Injectable()
export class TokenHeaderInterceptor implements HttpInterceptor {
    private jwt_tk;
    constructor(private authService: NbAuthService) {
        this.authService.onTokenChange()
            .subscribe((token: NbAuthJWTToken) => {
                if (token.isValid()) {
                    // here we receive a payload from the token and assigns it to our `user` variable
                    this.jwt_tk = token.toString();
                }
            });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const request = req.clone({
            setHeaders: {
                Authorization: `${this.jwt_tk}`,
            },
        });
        return next.handle(request);
    }
}
