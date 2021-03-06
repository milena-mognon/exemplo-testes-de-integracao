export default class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly duplicity: boolean;

  constructor(message: string, statusCode = 400, duplicity = false) {
    this.message = message;
    this.statusCode = statusCode;
    this.duplicity = duplicity;
  }
}
