import { Injectable }    from '@angular/core';


@Injectable()
export class Statics {
    globals
    constructor() { 
        this.globals = 5;
    }

}