
window.onload = function() {
var arrWin = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48);
var arr = [];
var arrD = [];
var arrC = [];
function Help() {
    alert("Zer0Square Game - Level 4\n\nYou have to arrange the table from 0-48. \n\n0 is the key number.(It will be always highlighted with green color.) When you click a number 0 will go there and the clicked number goes to where 0 was. Check the position of 0 carefully and find which number has to be there and click on that number.\nDon't click the first(0th) position before arranging other numbers.\n When 0 comes to its position the game will end by either you win(if all numbers are arranged) or lose.\n\nReset button will reset the current set and the time will recount from 0.\nNextSet will create another set of numbers. You have unlimited sets to play with.\nEnjoy....");
}
function About() {
    alert("Zer0Square Game.\n\nLevel : 4\n\nCreated by : Arun Ruban SJ\n\n");
}
function HowTo() {
    alert("Zer0Square Game - Level 4\n\nArrange the table from 0 to 48 by clicking on any number to replace it with '0' BEFORE '0' comes to its original position(1st position).");
}
function Reset(){
     var i,x;
     if(arr.indexOf(0)!=-1){
          x=document.getElementById(arr.indexOf(0));
   x.style.color="black";
     }
     
     min=0;
     sec=0;
     csec=0;
     for(var i=0;i<49;i++){
         arr[i]=arrC[i];
     }
  
    for(i=0;i<49;i++){
        x=document.getElementById(i);
        x.innerHTML=arr[i];
    }
   x=document.getElementById(arr.indexOf(0));
   x.style.color="green";
}
function Start(){
    min=0;
     sec=0;
     csec=0;

while(arrD.length < 49){
    var r ;
    r = Math.floor(Math.random() * 100) ;
if(arrD.indexOf(r) == -1 && r<49) arrD.push(r);
   r = Math.floor(Math.random() * 10) ; if(arrD.indexOf(r) == -1 && r<10) arrD.push(r);
    if(arrD[0]==0)arrD.pop(r);
    }
       for(var i=0;i<49;i++){
         arrC[i]=arrD[i];
     }
       Reset();
       for(var i=0;i<49;i++){
         arrD.pop();}
    }
       function Timer(){
        csec++;
        if(csec==100){
            sec++;
            csec=0;
        }
        if(sec==60){
            min++;
            sec=0;
        }
     tm.innerHTML=(min+":"+sec+":"+csec+" min");
    }
    
function ce0(){
  var t=document.getElementById(0);
    t.innerHTML=arr[arr.indexOf(0)];
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[0];
    arr[arr.indexOf(0)]=arr[0];
    arr[0]=0; if(JSON.stringify(arr)==JSON.stringify(arrWin)){
        //alert ("You Win");
   clearInterval(ctm) ; 
    var parent = document.getElementById("div2");
var child = document.getElementById("table1");
parent.removeChild(child);
var parent1= document.getElementById("div3");
  parent1.removeChild(reset);
  parent1.removeChild(nset);
     var p1 = document.createElement("p");
     p1.innerHTML="Congratulations!";
     p1.style.fontSize="35px";
     p1.style.color="green";
  parent.appendChild(p1);
 var p11=document.createElement("p");
 p11.innerHTML="You WON";
 p11.style.fontSize="30px";
 p11.style.color="green";
 p11.style.fontWeight="bold";
  parent.appendChild(p11);
  tm.style.fontSize="25px";
  tm.style.color="purple";
  tm.style.boxShadow="1px 1px 3px 3px gold";
  parent.style.boxShadow="2px 2px 5px 5px green";

    }
    else{
        //alert ("You lose");
       clearInterval(ctm) ;   
    var parent = document.getElementById("div2");
var child = document.getElementById("table1");
parent.removeChild(child);
var parent1= document.getElementById("div3");
  parent1.removeChild(reset);
  parent1.removeChild(nset);
    var p1 = document.createElement("p");
     p1.innerHTML="You lose!";
     p1.style.fontSize="30px";
     p1.style.color="red";
  parent.appendChild(p1);
 var p11=document.createElement("p");
 p11.innerHTML="Better luck next time";
 p11.style.fontSize="35px";
 p11.style.color="red";
  parent.appendChild(p11); 
  tm.style.fontSize="25px";
  tm.style.color="purple";
  tm.style.boxShadow="1px 1px 3px 3px gold";
  parent.style.boxShadow="2px 2px 5px 5px red";

    }
}
function ce1(){
    
    var t=document.getElementById(1);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[1];
    if(arr[1]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[1];
    arr[1]=0;
}
function ce2(){
      var t=document.getElementById(2);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[2];
    if(arr[2]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[2];
    arr[2]=0;
}
function ce3(){
      var t=document.getElementById(3);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[3];
    if(arr[3]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[3];
    arr[3]=0;
}
function ce4(){
      var t=document.getElementById(4);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[4];
    if(arr[4]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[4];
    arr[4]=0;
}
function ce5(){
      var t=document.getElementById(5);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[5];
    if(arr[5]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[5];
    arr[5]=0;
}
function ce6(){
      var t=document.getElementById(6);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[6];
    if(arr[6]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[6];
    arr[6]=0;
}
function ce7(){
      var t=document.getElementById(7);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[7];
    if(arr[7]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[7];
    arr[7]=0;
}
function ce8(){
      var t=document.getElementById(8);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[8];
    if(arr[8]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[8];
    arr[8]=0;
}
function ce9(){
      var t=document.getElementById(9);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[9];
    if(arr[9]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[9];
    arr[9]=0;
}
function ce10(){
    
    var t=document.getElementById(10);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[10];
    if(arr[10]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[10];
    arr[10]=0;
    }
function ce11(){
      var t=document.getElementById(11);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[11];
    if(arr[11]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[11];
    arr[11]=0;
}
function ce12(){
      var t=document.getElementById(12);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[12];
    if(arr[12]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[12];
    arr[12]=0;
}
function ce13(){
      var t=document.getElementById(13);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[13];
    if(arr[13]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[13];
    arr[13]=0;
}
function ce14(){
      var t=document.getElementById(14);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[14];
    if(arr[14]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[14];
    arr[14]=0;
}
function ce15(){
      var t=document.getElementById(15);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[15];
    if(arr[15]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[15];
    arr[15]=0;
}
function ce16(){
    
    var t=document.getElementById(16);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[16];
    if(arr[16]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[16];
    arr[16]=0;
}
function ce17(){
      var t=document.getElementById(17);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[17];
    if(arr[17]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[17];
    arr[17]=0;
}
function ce18(){
      var t=document.getElementById(18);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[18];
    if(arr[18]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[18];
    arr[18]=0;
}
function ce19(){
      var t=document.getElementById(19);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[19];
    if(arr[19]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[19];
    arr[19]=0;
}
function ce20(){
      var t=document.getElementById(20);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[20];
    if(arr[20]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[20];
    arr[20]=0;
}
function ce21(){
      var t=document.getElementById(21);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[21];
    if(arr[21]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[21];
    arr[21]=0;
}
function ce22(){
      var t=document.getElementById(22);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[22];
    if(arr[22]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[22];
    arr[22]=0;
}
function ce23(){
      var t=document.getElementById(23);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[23];
    if(arr[23]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[23];
    arr[23]=0;
}
function ce24(){
      var t=document.getElementById(24);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[24];
    if(arr[24]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[24];
    arr[24]=0;
}
function ce25(){
    
    var t=document.getElementById(25);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[25];
    if(arr[25]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[25];
    arr[25]=0;
    }
function ce26(){
      var t=document.getElementById(26);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[26];
    if(arr[26]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[26];
    arr[26]=0;
}
function ce27(){
      var t=document.getElementById(27);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[27];
    if(arr[27]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[27];
    arr[27]=0;
}
function ce28(){
      var t=document.getElementById(28);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[28];
    if(arr[28]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[28];
    arr[28]=0;
}
function ce29(){
      var t=document.getElementById(29);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[29];
    if(arr[29]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[29];
    arr[29]=0;
}
function ce30(){
      var t=document.getElementById(30);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[30];
    if(arr[30]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[30];
    arr[30]=0;
}
function ce31(){
    
    var t=document.getElementById(31);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[31];
    if(arr[31]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[31];
    arr[31]=0;
}
function ce32(){
      var t=document.getElementById(32);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[32];
    if(arr[32]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[32];
    arr[32]=0;
}
function ce33(){
      var t=document.getElementById(33);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[33];
    if(arr[33]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[33];
    arr[33]=0;
}
function ce34(){
      var t=document.getElementById(34);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[34];
    if(arr[34]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[34];
    arr[34]=0;
}
function ce35(){
      var t=document.getElementById(35);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[35];
    if(arr[35]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[35];
    arr[35]=0;
}
function ce36(){
      var t=document.getElementById(36);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[36];
    if(arr[36]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[36];
    arr[36]=0;
}
function ce37(){
      var t=document.getElementById(37);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[37];
    if(arr[37]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[37];
    arr[37]=0;
}
function ce38(){
      var t=document.getElementById(38);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[38];
    if(arr[38]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[38];
    arr[38]=0;
}
function ce39(){
      var t=document.getElementById(39);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[39];
    if(arr[39]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[39];
    arr[39]=0;
}
function ce40(){
    
    var t=document.getElementById(40);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[40];
    if(arr[40]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[40];
    arr[40]=0;
    }
function ce41(){
      var t=document.getElementById(41);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[41];
    if(arr[41]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[41];
    arr[41]=0;
}
function ce42(){
      var t=document.getElementById(42);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[42];
    if(arr[42]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[42];
    arr[42]=0;
}
function ce43(){
      var t=document.getElementById(43);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[43];
    if(arr[43]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[43];
    arr[43]=0;
}
function ce44(){
      var t=document.getElementById(44);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[44];
    if(arr[44]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[44];
    arr[44]=0;
}
function ce45(){
      var t=document.getElementById(45);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[45];
    if(arr[45]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[45];
    arr[45]=0;
}
function ce46(){
      var t=document.getElementById(46);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[46];
    if(arr[46]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[46];
    arr[46]=0;
}
function ce47(){
      var t=document.getElementById(47);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[47];
    if(arr[47]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[47];
    arr[47]=0;
}
function ce48(){
      var t=document.getElementById(48);
    t.innerHTML=arr[arr.indexOf(0)];
    t.style.color="green";
   t=document.getElementById(arr.indexOf(0));
    t.innerHTML=arr[48];
    if(arr[48]!=0){
    t.style.color="black";}
    arr[arr.indexOf(0)]=arr[48];
    arr[48]=0;
}


    HowTo();
    Start();
    
    var ae0=document.getElementById(0);
    ae0.addEventListener("click",ce0);
    var ae1=document.getElementById(1);
    ae1.addEventListener("click",ce1);
    var ae2=document.getElementById(2);
    ae2.addEventListener("click",ce2);
     var ae3=document.getElementById(3);
    ae3.addEventListener("click",ce3);
    var ae4=document.getElementById(4);
    ae4.addEventListener("click",ce4);
    var ae5=document.getElementById(5);
    ae5.addEventListener("click",ce5);
      var ae6=document.getElementById(6);
    ae6.addEventListener("click",ce6);
    var ae7=document.getElementById(7);
    ae7.addEventListener("click",ce7);
    var ae8=document.getElementById(8);
    ae8.addEventListener("click",ce8);
      var ae9=document.getElementById(9);
    ae9.addEventListener("click",ce9);
    var ae10=document.getElementById(10);
    ae10.addEventListener("click",ce10);
    var ae11=document.getElementById(11);
    ae11.addEventListener("click",ce11);
      var ae12=document.getElementById(12);
    ae12.addEventListener("click",ce12);
    var ae13=document.getElementById(13);
    ae13.addEventListener("click",ce13);
    var ae14=document.getElementById(14);
    ae14.addEventListener("click",ce14);
     var ae15=document.getElementById(15);
    ae15.addEventListener("click",ce15);
    var ae16=document.getElementById(16);
    ae16.addEventListener("click",ce16);
    var ae17=document.getElementById(17);
    ae17.addEventListener("click",ce17);
    var ae18=document.getElementById(18);
    ae18.addEventListener("click",ce18);
     var ae19=document.getElementById(19);
    ae19.addEventListener("click",ce19);
    var ae20=document.getElementById(20);
    ae20.addEventListener("click",ce20);
    var ae21=document.getElementById(21);
    ae21.addEventListener("click",ce21);
      var ae22=document.getElementById(22);
    ae22.addEventListener("click",ce22);
    var ae23=document.getElementById(23);
    ae23.addEventListener("click",ce23);
    var ae24=document.getElementById(24);
    ae24.addEventListener("click",ce24);
      var ae25=document.getElementById(25);
    ae25.addEventListener("click",ce25);
    var ae26=document.getElementById(26);
    ae26.addEventListener("click",ce26);
    var ae27=document.getElementById(27);
    ae27.addEventListener("click",ce27);
      var ae28=document.getElementById(28);
    ae28.addEventListener("click",ce28);
    var ae29=document.getElementById(29);
    ae29.addEventListener("click",ce29);
    var ae30=document.getElementById(30);
    ae30.addEventListener("click",ce30);
     var ae31=document.getElementById(31);
    ae31.addEventListener("click",ce31);
    var ae32=document.getElementById(32);
    ae32.addEventListener("click",ce32);
    var ae33=document.getElementById(33);
    ae33.addEventListener("click",ce33);
    var ae34=document.getElementById(34);
    ae34.addEventListener("click",ce34);
     var ae35=document.getElementById(35);
    ae35.addEventListener("click",ce35);
    var ae36=document.getElementById(36);
    ae36.addEventListener("click",ce36);
    var ae37=document.getElementById(37);
    ae37.addEventListener("click",ce37);
      var ae38=document.getElementById(38);
    ae38.addEventListener("click",ce38);
    var ae39=document.getElementById(39);
    ae39.addEventListener("click",ce39);
    var ae40=document.getElementById(40);
    ae40.addEventListener("click",ce40);
      var ae41=document.getElementById(41);
    ae41.addEventListener("click",ce41);
    var ae42=document.getElementById(42);
    ae42.addEventListener("click",ce42);
    var ae43=document.getElementById(43);
    ae43.addEventListener("click",ce43);
      var ae44=document.getElementById(44);
    ae44.addEventListener("click",ce44);
    var ae45=document.getElementById(45);
    ae45.addEventListener("click",ce45);
    var ae46=document.getElementById(46);
    ae46.addEventListener("click",ce46);
     var ae47=document.getElementById(47);
    ae47.addEventListener("click",ce47);
     var ae48=document.getElementById(48);
    ae48.addEventListener("click",ce48);
    var how2=document.getElementById("but1");
    how2.addEventListener("click",HowTo);
   var about=document.getElementById("but2");
   about.addEventListener("click",About);
    var hint=document.getElementById("but3");
    hint.addEventListener("click",Help);
   var reset=document.getElementById("but4");
   reset.addEventListener("click",Reset);
   var nset=document.getElementById("but5");
    nset.addEventListener("click",Start);
    var tm=document.getElementById("clk");
    var min=0,sec=0,csec=0;
    var ctm=setInterval(Timer,10);
 
    
};