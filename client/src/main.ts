import * as ko from 'knockout';
import * as $ from 'jquery';
import data from './grid';
import {IData} from './grid';

class Controller {
  records: any;
  
  constructor(data: Array<IData>) {
    this.records = ko.observableArray(data);
    console.log(data);
  }
  
  addRecord():void {
    this.records.push({
      name:    '',
      surname: '',
      phone:   ''
    });
  };
  
  removeGift = (record: any) => {
    console.log(record);
    this.records.remove(record);
  };
  
  save(form): void {
    alert('Could now transmit to server: ' + ko.utils.stringifyJson(this.records));
  };
}


ko.applyBindings(new Controller(data));