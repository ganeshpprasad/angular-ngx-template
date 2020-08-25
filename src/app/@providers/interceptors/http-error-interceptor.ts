import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {throwError} from 'rxjs';
import {NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService} from '@nebular/theme';

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
                        errorMessage = `CLIENT ERR: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `SERVER ERR CODE: ${error.status}\n`;
                        if (error.error.message) {
                            errorMessage += `ERR MSG: ${error.error.message}`;
                        }

                    }
                    console.log(errorMessage);
                    this.showToast('REQUEST ERR', errorMessage);
                    // throw the original error since body has useful info app could be using
                    return throwError(error);
                }),
            );
    }

    private showToast(title: string, body: string) {
        const config: Partial<NbToastrConfig> = {
            status: 'danger',
            destroyByClick: true,
            duration: 7500,
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
