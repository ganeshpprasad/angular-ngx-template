import {catchError} from 'rxjs/operators';
import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {throwError} from "rxjs";
import {NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService} from "@nebular/theme";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private toastrService: NbToastrService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `ERR: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `ERR CODE: ${error.status}\nMessage: ${error.message}`;
                    }
                    this.showToast('SERVER ERR', errorMessage);
                    return throwError(errorMessage);
                })
            );
    }

    private showToast(title: string, body: string) {
        const config: Partial<NbToastrConfig> = {
            status: 'warning',
            destroyByClick: true,
            duration: 10000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: false,
        };
        const titleContent = title ? `. ${title}` : '';

        this.toastrService.show(
            body,
            `${titleContent}`,
            config);
    }
}