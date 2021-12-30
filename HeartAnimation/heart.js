window.onload = function() {
alert("Step by Step Love 💟 to draw a full Heart 😅");
var i=1;
var q1="&#160;&#160;";
var q2="&#160;&#160;&#160;&#160;";
var q3="&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;";
var q4="&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;";
var l="&#128159;";
 var y = setInterval(move,800);
 function move(){
 print(i);
 i++;
 if(i==10){
 clearInterval(y);
}
 }
 function print(i){
     var s;
     if(i==1)
     s=q2+l+q2+l+q3+q4+q2+l+q2+l+q2;
     if(i==2)
     s=q1+l+q4+q4+l+q1+q2+l+q4+q4+l+q1;
     if(i==3)
     s=l+q4+q4+q4+l+q4+q4+q4+l;
     if(i==4)
     s=l+q4+q4+q4+q4+q2+q4+q4+q1+l;
     if(i==5)
     s=q1+l+q4+q4+q4+q4+q4+q3+l+q1;
     if(i==6)
     s=q2+l+q4+q4+q4+q4+q1+l+q2;
     if(i==7)
     s=q3+l+q3+q4+q2+l+q3;
     if(i==8)
     s=q4+l+q1+q2+l+q4;
     if(i==9)
     s=q4+q1+l+q4+q1;
   var t= document.getElementById(i);
   t.innerHTML=s;
 }
};