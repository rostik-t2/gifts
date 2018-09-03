/**
 * Created by Ростислав on 29.08.2018.
 */
export interface IGiftItem {
  name: string;
  description: string;
  price: string;
  downloadUrl: string;
  bookedBy?: string;
  id?: string;
}
