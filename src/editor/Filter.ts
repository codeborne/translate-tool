export default class Filter {
  constructor(
    public search = '',
    public showEmptyValuesOnly = false
  ) {}

  shouldShow(fullKey: string, value: string): boolean {
    return (!this.search || fullKey.toLowerCase().includes(this.search.toLowerCase())) &&
           (!this.showEmptyValuesOnly || !value)
  }
}
