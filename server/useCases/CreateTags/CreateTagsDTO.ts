export class CreateTagsRequestDTO {
  constructor (
    public id: string,
    public isFractional: boolean,
    public amount: number
  ) {}
}
