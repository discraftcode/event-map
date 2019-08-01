import { EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Error } from '../models/error.model';

/**
 * Universal error handler service for CheckMate UI. Users call handleError to emit an event
 * which causes the error component to display a modal to explain the error.
 *
 * @export
 */
export class ErrorService {
    errorOccurred = new EventEmitter<Error>();

    handleError(error: HttpErrorResponse) {
        const errorData = new Error(error.name, error.message);
        this.errorOccurred.emit(errorData);
    }

    handleTextError(errorName: string, errorMessage: string) {
        const errorData = new Error(errorName, errorMessage);
        this.errorOccurred.emit(errorData);
    }
}