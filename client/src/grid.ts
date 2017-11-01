import * as ko from 'knockout';
import * as $ from 'jquery';

export interface IData {
  name: string;
  surname: string;
  phone: string;
}

const data = [
  {name: 'Ryan', surname: 'Malkovich', phone: '73658623'},
  {name: 'Melany', surname: 'Griffits', phone: '2356576'},
  {name: 'Jhon', surname: 'Doe', phone: '76834522'},
  {name: 'Linus', surname: 'Torvalds', phone: '6588824'}
];

export default data;