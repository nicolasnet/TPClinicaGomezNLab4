import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PDFCreatorService {

  constructor() { }

  PDFdownloadByHTMLid(htmlId: string, nombreArchivo?: string) {
    // Extraemos el
    const DATA = document.getElementById(htmlId);
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      if(nombreArchivo){
        docResult.save(nombreArchivo+'_ClinicaOnline.pdf');
      }else{
        docResult.save(`${new Date().toISOString()}_ClinicaOnline.pdf`);
      }
      
    });
  }
}
