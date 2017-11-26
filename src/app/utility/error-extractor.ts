export class ErrorExtractor {

  static extractErrorMessage(error): string {
    if (error.error != null) {
      if (error.error.message != null) {
        return error.error.message;
      } else if (typeof error.error === 'string') {
        const parse = JSON.parse(error.error);
        if (parse.message != null) {
          return parse.message;
        }
      }
    }
    return 'Unknown error!';
  }

}
