import * as ko from 'knockout';
import * as $ from 'jquery';
import {IData} from './http-service';
import * as validation from 'knockout.validation';
import HttpService from './http-service';

validation.init({
  registerExtenders:    true,
  messagesOnModified:   true,
  insertMessages:       true,
  parseInputAttributes: true,
  messageTemplate:      null
}, true);

class ViewModel {
  records: any;
  editedRecord: any;
  editingStatus: any;
  httpService: any;
  
  constructor() {
    this.records = ko.observableArray([]);
    this.editedRecord = this.createEmpty();
    this.editingStatus = ko.observable(false);
    this.httpService = new HttpService;
    this.getRecordsList();
  }
  
  getRecordsList() {
    this.httpService.getRecords()
        .then(function (response) {
          return response;
        })
        .catch(function (err) {
          console.error('error!', err.statusText);
        })
        .then((response) => {
          this.records(response);
        });
  };
  
  postRecords(records) {
    this.httpService.postRecords(records)
        .then(function (response) {
          return response;
        })
        .catch(function (err) {
          console.error('error!', err.statusText);
        })
        .then((response) => {
          console.log(response);
          this.records(response);
        });
  };
  
  editRecord = (index: any, record: any) => {
    const edited = this.editedRecord;
    
    if (index >= 0) {
      this.editingStatus(true);
      
      edited.name(record.name);
      edited.surname(record.surname);
      edited.email(record.email);
      edited.phone(record.phone);
      edited.index = index;
      
    } else {
      this.editingStatus(false);
      
      edited.name('');
      edited.surname('');
      edited.email('');
      edited.phone('');
      delete edited.index;
    }
  };
  
  saveEdit = () => {
    const record = this.editedRecord;
    const index = this.editedRecord.index;
    
    this.editingStatus(false);
    
    const edited = {
      'name':    record.name(),
      'surname': record.surname(),
      'email':   record.email(),
      'phone':   record.phone()
    };
    
    if (index >= 0) {
      console.log('if');
      this.records.splice(index, 1, edited);
      
    } else {
      this.records.push({
        name:    record.name(),
        surname: record.surname(),
        email:   record.email(),
        phone:   record.phone()
      });
      
      record.name('');
      record.surname('');
      record.email('');
      record.phone('');
    }
    
    this.postRecords(this.records());
    
  };
  
  removeRecord = (record: any) => {
    if (!confirm('Are you sure?')) return;
    this.records.remove(record);
    this.postRecords(this.records());
  };
  
  save(form): void {
    alert('Could now transmit to server: ' + ko.utils.stringifyJson(this.records));
  };
  
  createEmpty = () => {
    const emptyRecord = {
      name:    ko.observable('').extend({required: true, minLength: 2, maxLength: 10}),
      surname: ko.observable('').extend({required: true, minLength: 2, maxLength: 10}),
      email:   ko.observable('').extend({required: true, minLength: 2, maxLength: 20}),
      phone:   ko.observable('').extend({required: true, minLength: 5, maxLength: 12})
    };
    
    return $.extend({}, emptyRecord);
  }
}

const vm = new ViewModel();

ko.applyBindings(vm);