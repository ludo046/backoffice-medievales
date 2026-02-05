import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: false
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string | number | null | undefined): string {
    if (!value) return '';

    const digits = value.toString().replace(/\D/g, '');

    if (digits.length !== 10) {
      return value.toString();
    }

    return digits.replace(/(\d{2})(?=\d)/g, '$1.');
  }
}
