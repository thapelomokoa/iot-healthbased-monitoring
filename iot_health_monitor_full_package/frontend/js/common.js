
const CHANNEL = 3128115;
const READKEY = 'K72OYJMYOJZN240T';
const THRESHOLDS={BPM:{min:50,max:120},Temp:{min:36,max:38},Hum:{min:30,max:60}};

async function fetchThingSpeak(n=40){
  const res=await fetch(`https://api.thingspeak.com/channels/${CHANNEL}/feeds.json?results=${n}&api_key=${READKEY}`);
  const data=await res.json();
  return data.feeds || [];
}

function makeCombinedChart(ctx,labels,bpm,temp,hum){
  return new Chart(ctx,{type:'line',data:{labels:labels,datasets:[
    {label:'BPM',data:bpm,borderColor:'red',tension:0.3},
    {label:'Temp',data:temp,borderColor:'orange',tension:0.3},
    {label:'Humidity',data:hum,borderColor:'blue',tension:0.3}
  ]},options:{responsive:true}});
}

async function updateCombinedChart(ctx,bpmEl,tempEl,humEl){
  const feeds=await fetchThingSpeak();
  const labels=feeds.map(f=>new Date(f.created_at).toLocaleTimeString());
  const bpm=feeds.map(f=>Number(f.field1||0));
  const temp=feeds.map(f=>Number(f.field2||0));
  const hum=feeds.map(f=>Number(f.field3||0));
  if(ctx.chart) ctx.chart.destroy();
  ctx.chart=makeCombinedChart(ctx,labels,bpm,temp,hum);
  bpmEl.textContent=bpm[bpm.length-1]||'--';
  tempEl.textContent=temp[temp.length-1]||'--';
  humEl.textContent=hum[hum.length-1]||'--';
}
