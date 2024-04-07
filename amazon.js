
let imags = document.querySelectorAll(".image-slide");
let prev = document.querySelector(".prev-icon");
let next = document.querySelector(".next-icon");

let x=0;
function changepage(){
    for (i=0;i<imags.length;i++){
        imags[i].style.display="none";
    }
    imags[x].style.display="block";

}

prev.addEventListener("click",(e)=>{
    if(x>0){
        x--;
    }
    else{
        x = imags.length -1;
    }
    changepage()
})
next.addEventListener("click",(e)=>{
    if(x < imags.length -1){
        x++;
    }
     else{
        x= 0;
    }
    changepage()
})
changepage()

































