export class ElmaError {
  host!: string;
  statusCode!: string;
  type!: string;
  // error!: string;
  user!: string;
  date!: string;
  timeUtc!: string;
  allXml!: string;
  message!: string;

  constructor(params: Partial<ElmaError>) {
    Object.assign(this, params);
  }

}

