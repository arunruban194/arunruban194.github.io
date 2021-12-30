window.onload = function() {

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    
    var s;
    
    var x1=25;
    var x11=0;
    var x12=1.95 * Math.PI;
    
    var x2=125;
    var x21=3;
    var x22=2.89 * Math.PI;
    
    var l1s=25;
    var l1e=65;
    
    var l2s=65;
    var l2e=45;
    
 //   var l3s=25;
   // var l3e=75;
        
    var l4s=125;
    var l4e=95;
    
    var l5s=95;
    var l5e=110;
    
    var l6s=58;
    var l6e=100;
    
    var l7s=75;
    var l7e=103;
    
    var l8s=58;
    var l8e=75;
    
    var m1s=60;
    var m1e=80;
    
    var m7s=80;
    var m7e=83;
    
    var m2=85;
    
    var m3s=75;
    var m3e=85;
    
    var m4s=85;
    var m4e=100;
    
    var m5s=60;
    var m5e=85;
    var m5s1=340;
    var m5e1=370;
    
    var m6s=85;
    var m6e=77;
    var m6s1=370;
    var m6e1=406;
    
    var p1s=75;
    var p1e=80;
    var p1s1=400;
    var p1e1=408;
    
    var p2=77;
    var p21=406;
    
    var p3=75;
    
    var p4s=25;
    var p4e=75;
    
    var p5s=25;
    var p5e=75;
     
var gradient = context.createLinearGradient(0, 0, 600, 0);
gradient.addColorStop("0", "skyblue");
gradient.addColorStop("0.5", "blue");
gradient.addColorStop("1.0", "skyblue");
    
  function hny(){
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowColor = "skyblue";
    context.fillStyle = gradient;
  context.fillText("Happy New Year!", 40,70);
 }
    
  function change(){
    
    canvas.style.backgroundColor="lavender";
  
    x1=25+150;
    
    x2=125+150;
    
    l1s=25+150;
    l1e=65+150;
    
    l2s=65+150;
    l2e=45+150;
    
 //   l3s=25+150;
   // l3e=75+150;
        
    l4s=125+150;
    l4e=95+150;
    
    l5s=95+150;
    l5e=110+150;
    
    l6s=58+150;
    l6e=100+150;
    
    l7s=75+150;
    l7e=103+150;
    
    l8s=58+150;
    l8e=75+150;
    
    m1s=60+150;
    m1e=80+150;
    
    m7s=80+150;
    m7e=83+150;
    
    m2=83+150;
    
    m3s=75+150;
    m3e=85+150;
    
    m4s=85+150;
    m4e=100+150;
    
    m5s=60+150;
    m5e=85+150;
    
    m6s=85+150;
    m6e=77+145;
    
    p1s=75+150;
    p1e=80+145;
    
    p2=77+145;
    
    p3=75+150;
    
    p4s=25+150;
    p4e=75+150;
    
    p5s=25+150;
    p5e=75+150;
    
    s=setInterval(draw22, 70);
  }
    
  function draw21(){
    
    context.clearRect(0, 0, 1000, 500);
    
    context.font = '42px Arial';
    context.fillText("2021", 150, 200);
    
    context.font = '42px Arial';
    context.fillText("2022", 450, 200);
    
    context.beginPath();
    context.moveTo(400, 200);
    context.lineTo(400, 500);
    context.stroke();
    
    context.beginPath();
    context.arc(x1, 400, 30, x11, x12);
    context.stroke();  
    
    context.beginPath();
    context.arc(x2, 400, 30, x21 , x22);
    context.stroke();  
    
    
    context.beginPath();
    context.moveTo(l1s, 400);
    context.lineTo(l1e, 340);
    context.stroke();
    
    context.beginPath();
    context.moveTo(l2s, 340);
    context.lineTo(l2e, 340);
    context.stroke();
    
 /*   context.beginPath();
    context.moveTo(l3s, 400);
    context.lineTo(l3e, 400);
    context.stroke();*/
    
    context.beginPath();
    context.moveTo(l4s, 400);
    context.lineTo(l4e, 340);
    context.stroke();
    
    context.beginPath();
    context.moveTo(l5s, 340);
    context.lineTo(l5e, 340);
    context.stroke();
    
    context.beginPath();
    context.moveTo(l6s, 350);
    context.lineTo(l6e, 350);
    context.stroke();
    
    context.beginPath();
    context.moveTo(l7s, 400);
    context.lineTo(l7e, 355);
    context.stroke();
    
    context.beginPath();
    context.moveTo(l8s, 350);
    context.lineTo(l8e, 400);
    context.stroke();
    
    context.beginPath();
    context.moveTo(m1s, 340);
    context.lineTo(m1e, 290);
    context.stroke();
    
    context.beginPath();
    context.moveTo(m7s, 290);
    context.lineTo(m7e, 285);
    context.stroke();
    
    context.beginPath();
    context.arc(m2, 270, 15, 0, 2*Math.PI);
    context.stroke();
    
    context.beginPath();
    context.moveTo(m3s, 300);
    context.lineTo(m3e, 325);
    context.stroke();
    
    context.beginPath();
    context.moveTo(m4s, 325);
    context.lineTo(m4e, 340);
    context.stroke();
    
    context.beginPath();
    context.moveTo(m5s, m5s1);
    context.lineTo(m5e, m5e1);
    context.stroke();
    
    context.beginPath();
    context.moveTo(m6s, m6s1);
    context.lineTo(m6e, m6e1);
    context.stroke();
    
    context.beginPath();
    context.moveTo(p1s, p1s1);
    context.lineTo(p1e, p1e1);
    context.stroke();
    
    context.beginPath();
    context.rect(p2, p21, 4, 2);
    context.stroke();
    
    context.beginPath();
    context.arc(p3, 400, 8, 0, 2*Math.PI);
    context.stroke();
    
    context.beginPath();
    context.moveTo(p4s, 400);
    context.lineTo(p4e, 408);
    context.stroke();
    
    context.beginPath();
    context.moveTo(p5s, 400);
    context.lineTo(p5e, 392);
    context.stroke();
 
    x1+=5;
    x2+=5;
    x11+=0.1;
    x12+=0.1;
    x21+=0.1;
    x22+=0.1;
    
    l1s+=5;
    l1e+=5;
      
    l2s+=5;
    l2e+=5;
      
  //  l3s+=5;
  //  l3e+=5;
       
    l4s+=5;
    l4e+=5;
      
    l5s+=5;
    l5e+=5;
      
    l6s+=5;
    l6e+=5;
       
    l7s+=5;
    l7e+=5;
      
    l8s+=5;
    l8e+=5;
    
    m1s+=5;
    m1e+=5;
    
    m7s+=5;
    m7e+=5;
      
    m2+=5;
      
    m3s+=5;
    m3e+=5;
       
    m4s+=5;
    m4e+=5;
      
    m5s+=5;
    m5e+=5;
    if(m5e1==370)
       m5e1=362;
    else
       m5e1=370;
       
    p3+=5;
    
    m6s+=5;
    m6e+=5;
    if(m6e>p3)
       m6e=p3-2;
    else
       m6e=p3+2;
    if(m6s1==370)
       m6s1=362;
    else
       m6s1=370;
    if(m6e1==406)
       m6e1=392;
    else
       m6e1=406;
    
     if(p2>p1s){
        p2=p1s+2;
    }else{
        p2=p1s+7;
    }
    
    p1s+=5;
    
    if(p1e>p1s){
        p1e=p1s-5;
    }else{
        p1e=p1s+5;
    }if(p1e1>p1s1){
        p1e1=392;
    }else{
        p1e1=408;
    }
      
    if(p21>p1s1){
        p21=392;
    }else{
        p21=406;
    }
       
    p4s+=5;
    p4e+=5;
      
    p5s+=5;
    p5e+=5;
    
    if(x1==280){
    clearInterval(s);
    change();
    }
  }  
  function draw22(){
  
    context.clearRect(0, 0, 1000, 500);
    
    context.beginPath();
    context.font = "80px Cursive";
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowColor = "skyblue";
    context.fillStyle = gradient;
    context.fillText("2022", 200,200);
    
    context.beginPath();
    context.arc(x1, 400, 30, x11, x12);
    context.shadowBlur = 10;
    context.shadowOffsetX = 30;
    context.shadowColor = "grey";
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();  
    
    context.beginPath();
    context.arc(x2, 400, 30, x21 , x22);
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();  
    
    
    context.beginPath();
    context.moveTo(l1s, 400);
    context.lineTo(l1e, 340);
    context.lineWidth = 2;
    context.strokeStyle = "red";
    context.stroke();
    
    context.beginPath();
    context.moveTo(l2s, 340);
    context.lineTo(l2e, 340);
    context.strokeStyle = "gray";
    context.stroke();
    
 /*   context.beginPath();
    context.moveTo(l3s, 400);
    context.lineTo(l3e, 400);
    context.stroke();*/
    
    context.beginPath();
    context.moveTo(l4s, 400);
    context.lineTo(l4e, 340);
    context.strokeStyle = "red";
    context.stroke();
    
    context.beginPath();
    context.moveTo(l5s, 340);
    context.lineTo(l5e, 340);
    context.stroke();
    
    context.beginPath();
    context.moveTo(l6s, 350);
    context.lineTo(l6e, 350);
    context.stroke();
    
    context.beginPath();
    context.moveTo(l7s, 400);
    context.lineTo(l7e, 355);
    context.stroke();
    
    context.beginPath();
    context.moveTo(l8s, 350);
    context.lineTo(l8e, 400);
    context.stroke();
    
    context.beginPath();
    context.moveTo(m1s, 340);
    context.lineTo(m1e, 290);
    context.lineWidth = 16;
    context.strokeStyle = "orange";
    context.stroke();
    
    context.beginPath();
    context.moveTo(m7s, 290);
    context.lineTo(m7e, 285);
    context.lineWidth = 5;
    context.strokeStyle = "orange";
    context.stroke();
    
    context.beginPath();
    context.arc(m2, 275, 12, 0, 2*Math.PI);
    context.lineWidth = 0;
    context.fillStyle = "orange";
    context.fill();
    context.stroke();
    
    context.beginPath();
    context.moveTo(m3s, 300);
    context.lineTo(m3e, 325);
    context.lineWidth = 10;
    context.strokeStyle = "orange";
    context.stroke();
    
    context.beginPath();
    context.moveTo(m4s, 325);
    context.lineTo(m4e, 340);
    context.lineWidth = 5;
    context.stroke();
    
    context.beginPath();
    context.moveTo(m5s, m5s1);
    context.lineTo(m5e, m5e1);
    context.lineWidth = 13;
    context.stroke();
    
    context.beginPath();
    context.moveTo(m6s, m6s1);
    context.lineTo(m6e, m6e1);
    context.lineWidth = 7;
    context.stroke();
    
    context.beginPath();
    context.moveTo(p1s, p1s1);
    context.lineTo(p1e, p1e1);
    context.lineWidth = 2;
    context.strokeStyle = "#505050";
    context.stroke();
    
    context.beginPath();
    context.rect(p2, p21, 4, 2);
    context.stroke();
    
    context.beginPath();
    context.arc(p3, 400, 8, 0, 2*Math.PI);
    context.stroke();
    
    context.beginPath();
    context.moveTo(p4s, 400);
    context.lineTo(p4e, 408);
    context.stroke();
    
    context.beginPath();
    context.moveTo(p5s, 400);
    context.lineTo(p5e, 392);
    context.stroke();
 
    x1+=5;
    x2+=5;
    x11+=0.1;
    x12+=0.1;
    x21+=0.1;
    x22+=0.1;
    
    l1s+=5;
    l1e+=5;
      
    l2s+=5;
    l2e+=5;
      
  //  l3s+=5;
  //  l3e+=5;
       
    l4s+=5;
    l4e+=5;
      
    l5s+=5;
    l5e+=5;
      
    l6s+=5;
    l6e+=5;
       
    l7s+=5;
    l7e+=5;
      
    l8s+=5;
    l8e+=5;
    
    m1s+=5;
    m1e+=5;
    
    m7s+=5;
    m7e+=5;
      
    m2+=5;
      
    m3s+=5;
    m3e+=5;
       
    m4s+=5;
    m4e+=5;
      
    m5s+=5;
    m5e+=5;
    if(m5e1==370)
       m5e1=362;
    else
       m5e1=370;
       
    p3+=5;
    
    m6s+=5;
    m6e+=5;
    if(m6e>p3)
       m6e=p3-2;
    else
       m6e=p3+2;
    if(m6s1==370)
       m6s1=362;
    else
       m6s1=370;
    if(m6e1==406)
       m6e1=392;
    else
       m6e1=406;
    
     if(p2>p1s){
        p2=p1s+2;
    }else{
        p2=p1s+7;
    }
    
    p1s+=5;
    
    if(p1e>p1s){
        p1e=p1s-5;
    }else{
        p1e=p1s+5;
    }if(p1e1>p1s1){
        p1e1=392;
    }else{
        p1e1=408;
    }
      
    if(p21>p1s1){
        p21=392;
    }else{
        p21=406;
    }
       
    p4s+=5;
    p4e+=5;
      
    p5s+=5;
    p5e+=5;
   if(x1==335){
    clearInterval(s);
    hny();
    }
  }  
    //alert("Happy New Year! 🎉🎉");
    s=setInterval(draw21, 70);
};
