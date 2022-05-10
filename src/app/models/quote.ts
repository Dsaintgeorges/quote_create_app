export class Quote {
  client: Client;
  linesArray: Lines[];
  pro:Pro;
  totalHt: number;
  totalTtc: number;
  tva: number;
  date: string;
  userId:number;
  totalPromo:number;
  additionalInformations:string;

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
  promo: number;

  constructor() {
    this.reference = "";
    this.description = "";
    this.unitPrice = 0;
    this.quantity = 0;
    this.total = 0;
    this.promo = 0;
  }
}

export class Client {
  name: string;
  adressRoad: string;
  adressNumber: string;
  postalCode: number;
  city: string;
  phone:string;

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
  firstname:string;
  lastname:string;
  address: string;
  zipcode: string;
  city: string;
  phone: string;
  email: string;
  vat: string;
  constructor() {
    this.name = "";
    this.address = "";
    this.zipcode = "";
    this.phone = "";
    this.email = "";
    this.city = "";
    this.firstname = "";
    this.lastname = "";
    this.vat = "";
  }

}
