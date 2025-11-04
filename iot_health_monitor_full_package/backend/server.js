
const express=require('express');
const cors=require('cors');
const PDFDocument=require('pdfkit');
const bodyParser=require('body-parser');

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/pdf',(req,res)=>{
  try{
    const data=req.body||{};
    const doc=new PDFDocument();
    res.setHeader('Content-disposition','attachment; filename=report.pdf');
    res.setHeader('Content-type','application/pdf');
    doc.fontSize(20).text('IoT HealthMonitor - Patient Report',{align:'center',underline:true});
    doc.moveDown();
    doc.fontSize(14).text(`Patient: ${data.patient||'Unknown'}`);
    doc.text(`Doctor: ${data.doctor||'Unknown'}`);
    doc.text(`BPM: ${data.bpm||'-'}`);
    doc.text(`Temperature: ${data.temp||'-'} °C`);
    doc.text(`Humidity: ${data.hum||'-'} %`);
    doc.moveDown();
    doc.text(`Generated: ${new Date().toLocaleString()}`);
    doc.text('Doctor Signature: __________________');
    doc.end();
    doc.pipe(res);
  }catch(err){res.status(500).json({error:'PDF generation failed'})}
});

app.listen(5000,()=>console.log('PDF backend running on port 5000'));
