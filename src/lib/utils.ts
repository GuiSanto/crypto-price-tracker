import { type ClassValue, clsx } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dataFormatUtils(value: number, day: number) {
  switch (day) {
    // return moment(value).format('DD');
    case 30:
    case 365:
      return moment(value).format('MMM DD');
    case 1:
    case 7:
    default:
      return moment(value).format('MMM DD HH:mm');
  }
}
