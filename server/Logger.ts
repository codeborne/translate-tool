class Logger {
  public info(text: string) {
    console.info(`${this.timestamp()} [INFO] ${text}`)
  }

  public error(text: string) {
    console.error(`${this.timestamp()} [ERROR] ${text}`)
  }

  public log(text: string) {
    console.log(`${this.timestamp()} ${text}`)
  }

  public timestamp(): string {
    const date = new Date(Date.now())
    return `[${date.getFullYear()}-` +
      `${(date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}-` +
      `${(date.getDate() >= 10) ? date.getDate() : `0${date.getDate()}` } ` +
      `${date.getHours()}:` +
      `${(date.getMinutes() >= 10) ? date.getMinutes() : `0${date.getMinutes()}`}]`
  }
}

export default new Logger()