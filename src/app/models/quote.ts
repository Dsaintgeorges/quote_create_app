export class Quote {
  client: Client;
  linesArray: Lines[];
  pro:Pro;
  totalHt: number;
  totalTtc: number;
  tva: number;
  date: string;

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

export class Pro {
  name: string;
  address: string;
  zipcode: string;
  city: string;
  phone: number;
  email: string;
  constructor() {
    this.name = "";
    this.address = "";
    this.zipcode = "";
    this.phone = 0;
    this.email = "";
    this.city = "";
  }

}
