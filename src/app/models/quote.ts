export class Quote {
  client: Client;
  linesArray: Lines[];
  totalHt:number;
  totalTtc:number;
  tva:number;
  constructor() {
    this.client = new Client();
    this.linesArray = [];
  }
}

export class Lines {
  reference: string;
  description: string;
  unitPrice: number;
  quantity: number;
  total: number;
  constructor() {
    this.reference = "";
    this.description = "";
    this.unitPrice = 0;
    this.quantity = 0;
    this.total = 0;
  }
}

export class Client {
  name: string;
  adressRoad: string;
  adressNumber: string;
  postalCode: number;
  city: string;
  constructor() {
    this.name = "";
    this.adressRoad = "";
    this.adressNumber = "";
    this.postalCode = 0;
    this.city = "";
  }
}
