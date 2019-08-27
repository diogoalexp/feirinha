import React from 'react';

class Convert {
    static b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, {type: contentType});
        return byteArrays;
    }

    
    static dataFormatada(date){
      const data = new Date(date),
          dia  = data.getUTCDate().toString(),
          diaF = (dia.length === 1) ? '0'+dia : dia,
          mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
          mesF = (mes.length === 1) ? '0'+mes : mes,
          anoF = data.getFullYear();
      return anoF+"-"+mesF+"-"+diaF;
  }

  static nextDay(x){
    let now = new Date();    
    while(now.getDay() != x.getDay()){
      now.setDate(now.getDate() + 1);
    }
    return now;
}
}


export default Convert;