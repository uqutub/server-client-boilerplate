import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'titleCase',
    pure: false
})
export class TitleCasePipe implements PipeTransform {
    transform(input: string, length: number): string {
        return input.length > 0 ? input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase())) : '';
    }
}