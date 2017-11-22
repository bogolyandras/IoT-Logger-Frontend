export class ErrorExtractor {

  static extractErrorMessage(error): string {
    if (error.error != null) {
      if (error.error.message != null) {
        return error.error.message;
      }
    }
    return 'Unknown error!';
  }

}
