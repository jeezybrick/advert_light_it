import { User } from './user.model';
import { Image } from './image.model';

export class Product {
  public pk: number;
  public owner: User;
  public theme: string;
  public text: string;
  public firstname: string;
  public lastname: string;
  public price: number;
  public currency: number;
  public images: Image[];
  public contract_price: boolean;
  public location: string;
  public category: string;
  public activated_at: Date;
  public is_active: boolean;


  constructor() {}
}
