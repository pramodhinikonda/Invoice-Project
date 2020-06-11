import { ExceptionModule } from './exception.module';

describe('ExceptionModule', () => {
    let errorsModule: ExceptionModule;

    beforeEach(() => {
        errorsModule = new ExceptionModule();
    });

    it('should create an instance', () => {
        expect(errorsModule).toBeTruthy();
    });
});
