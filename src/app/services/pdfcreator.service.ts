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

  // paginado(){
  //   var HTML_Width = $(".canvas_div_pdf").width();
	// 	var HTML_Height = $(".canvas_div_pdf").height();
	// 	var top_left_margin = 15;
	// 	var PDF_Width = HTML_Width+(top_left_margin*2);
	// 	var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
	// 	var canvas_image_width = HTML_Width;
	// 	var canvas_image_height = HTML_Height;
		
	// 	var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
		

	// 	html2canvas($(".canvas_div_pdf")[0],{allowTaint:true}).then(function(canvas) {
	// 		canvas.getContext('2d');
			
	// 		console.log(canvas.height+"  "+canvas.width);
			
			
	// 		var imgData = canvas.toDataURL("image/jpeg", 1.0);
	// 		var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
	// 	    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
			
			
	// 		for (var i = 1; i <= totalPDFPages; i++) { 
	// 			pdf.addPage(PDF_Width, PDF_Height);
	// 			pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
	// 		}
			
	// 	    pdf.save("HTML-Document.pdf");
  //       });
  // }

}
