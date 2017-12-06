export class DateUtility {

  static extractDate(date: Date): string {
    const d = date.getDate();
    const m = date.getMonth() + 1; // Month from 0 to 11
    const y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  static extractTime(date: Date): string {
    const h = date.getHours();
    const m = date.getMinutes();
    return '' + (h <= 9 ? '0' + h : h) + ':' + (m <= 9 ? '0' + m : m);
  }

  static timeStampFromDateAndTime(date: string, time: string): number {
    return new Date(date + 'T' + time).getTime() / 1000;
  }

}
