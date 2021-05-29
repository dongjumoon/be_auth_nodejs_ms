export class Logger {
  public static debug(...item: any) {
    const NODE_ENV = process.env.NODE_ENV;
    if (NODE_ENV === 'dev') {
      console.log(item);
    } else {
      console.error(item);
    }
  }
}