
window.onload = function() {
var arrWin = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
var arr = [];
var arrD = [];
var arrC = [];
function Help() {
    alert("Zer0Square Game - Level 2\n\nYou have to arrange the table from 0-15. \n\n0 is the key number.(It will be always highlighted with green color.) You can only click the numbers which are near to 0. When you click a number 0 will go there and the clicked number goes to where 0 was.\nDon't click the first(0th) position before arranging other numbers.\n When 0 comes to its position the game will end by either you win(if all numbers are arranged) or lose.\n\nReset button will reset the current set and the time will recount from 0.\nNextSet will create another set of numbers. You have unlimited sets to play with.\nEnjoy....");
}
function About() {
    alert("Zer0Square Game.\n\nLevel : 2\n\nCreated by : Arun Ruban SJ\n\n");
}
function HowTo() {
    alert("Zer0Square Game - Level 2\n\nArrange the table from 0 to 15 by clicking on any number near to '0' BEFORE '0' comes to its original position(1st position).");
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
     for(var i=0;i<16;i++){
         arr[i]=arrC[i];
     }
  
    for(i=0;i<16;i++){
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

  while (arrD.length < 16) {
      var r;
      r = Math.floor(Math.random() * 16);
      
      if(!arrD.includes(r))arrD.push(r)
      
      
      if (arrD[0] == 0){
          arrD.pop();
          continue
      }
  
      if (arrD[0] != 1 && arrD[0] != 4 && arrD[0] != 5) {
          arrD.pop();
          continue
      }
      }
       for(var i=0;i<16;i++){
         arrC[i]=arrD[i];
     }
       Reset();
       for(var i=0;i<16;i++){
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
    if(arr.indexOf(0)==2 || arr.indexOf(0)==4 || arr.indexOf(0)==5 || arr.indexOf(0)==6){
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
else{
alert("Please click the number near to 0");
}
}
function ce2(){
if(arr.indexOf(0)==1 || arr.indexOf(0)==3 || arr.indexOf(0)==5 || arr.indexOf(0)==6 || arr.indexOf(0)==7){
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
else{
alert("Please click the number near to 0");
}
}
function ce3(){
if(arr.indexOf(0)==2 || arr.indexOf(0)==6 || arr.indexOf(0)==7){
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
else{
alert("Please click the number near to 0");
}
}
function ce4(){
 if(arr.indexOf(0)==1 || arr.indexOf(0)==5 || arr.indexOf(0)==8 || arr.indexOf(0)==9){
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
else{
alert("Please click the number near to 0");
}
}
function ce5(){
if(arr.indexOf(0)==1 || arr.indexOf(0)==2 || arr.indexOf(0)==4 || arr.indexOf(0)==6 || arr.indexOf(0)==8 || arr.indexOf(0)==9 || arr.indexOf(0)==10){
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
else{
alert("Please click the number near to 0");
}
}
function ce6(){
if(arr.indexOf(0)==1 || arr.indexOf(0)==2 || arr.indexOf(0)==3 || arr.indexOf(0)==5 || arr.indexOf(0)==7 || arr.indexOf(0)==9 || arr.indexOf(0)==10 || arr.indexOf(0)==11){
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
else{
alert("Please click the number near to 0");
}
}
function ce7(){
if(arr.indexOf(0)==2 || arr.indexOf(0)==3 || arr.indexOf(0)==6 || arr.indexOf(0)==10 || arr.indexOf(0)==11){
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
else{
alert("Please click the number near to 0");
}
}
function ce8(){
if(arr.indexOf(0)==4 || arr.indexOf(0)==5 || arr.indexOf(0)==9 || arr.indexOf(0)==12 || arr.indexOf(0)==13){
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
else{
alert("Please click the number near to 0");
}
}
function ce9(){
if(arr.indexOf(0)==4 || arr.indexOf(0)==5 || arr.indexOf(0)==6 || arr.indexOf(0)==8 || arr.indexOf(0)==10 || arr.indexOf(0)==12 || arr.indexOf(0)==13 || arr.indexOf(0)==14){
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
else{
alert("Please click the number near to 0");
}
}
function ce10(){
    if(arr.indexOf(0)==7 || arr.indexOf(0)==5 || arr.indexOf(0)==6 || arr.indexOf(0)==9 || arr.indexOf(0)==11 || arr.indexOf(0)==15 || arr.indexOf(0)==13 || arr.indexOf(0)==14){
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
else{
alert("Please click the number near to 0");
}
    }
function ce11(){
if(arr.indexOf(0)==6 || arr.indexOf(0)==7 || arr.indexOf(0)==10 || arr.indexOf(0)==14 || arr.indexOf(0)==15){
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
else{
alert("Please click the number near to 0");
}
}
function ce12(){
if(arr.indexOf(0)==8 || arr.indexOf(0)==9 || arr.indexOf(0)==13){
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
else{
alert("Please click the number near to 0");
}
}
function ce13(){
if(arr.indexOf(0)==8 || arr.indexOf(0)==9 || arr.indexOf(0)==10 || arr.indexOf(0)==14 || arr.indexOf(0)==12){
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
else{
alert("Please click the number near to 0");
}
}
function ce14(){
if(arr.indexOf(0)==15 || arr.indexOf(0)==9 || arr.indexOf(0)==10 || arr.indexOf(0)==11 || arr.indexOf(0)==13){
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
else{
alert("Please click the number near to 0");
}
}
function ce15(){
if(arr.indexOf(0)==10 || arr.indexOf(0)==11 || arr.indexOf(0)==14){
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
else{
alert("Please click the number near to 0");
}
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