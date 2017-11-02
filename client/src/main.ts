import * as ko from 'knockout';
import * as $ from 'jquery';
import data from './grid';
import {IData} from './grid';
import * as validation from 'knockout.validation';

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
  // errors: any;
  
  constructor(data: Array<IData>) {
    // this.errors = validation.group(this);
    this.records = ko.observableArray(data);
    this.editedRecord = this.createEmpty();
    this.editingStatus = ko.observable(false);
  }
  
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
    // console.log('this.errors().length', this.editedRecord.isValid());
    
    const record = this.editedRecord;
    const index = this.editedRecord.index;
    
    this.editingStatus(false);
    
    const edited = {
      'name':    record.name(),
      'surname': record.surname(),
      'email': record.email(),
      'phone':   record.phone()
    };
    
    if (index >= 0) {
      console.log('if');
      this.records.splice(index, 1, edited);
      
    } else {
      this.records.push({
        name:    record.name(),
        surname: record.surname(),
        email: record.email(),
        phone:   record.phone()
      });
      
      record.name('');
      record.surname('');
      record.email('');
      record.phone('');
    }
  };
  
  removeRecord = (record: any) => {
    if (!confirm('Are you sure?')) return;
    this.records.remove(record);
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

const vm = new ViewModel(data);

ko.applyBindings(vm);