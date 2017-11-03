export interface IData {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export default class HttpService {
  
  getRecords() {
    const url = 'http://localhost:8081/data';
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
  }
  
  postRecords(body) {
    const url = 'http://localhost:8081/data';
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          console.log(xhr.response);
          resolve(JSON.parse(xhr.response));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      // console.log(body);
      xhr.send(JSON.stringify(body));
    });
  }
}
