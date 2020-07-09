document.getElementById('sendFormData').onsubmit = (e)=>{
    e.preventDefault();
    const url = 'http://127.0.0.1:3000/sendData';
    const data = new URLSearchParams();
    for(const pair of new FormData(e.target)){
      console.log(pair);
     //  data.append(pair[0],pair[1],pair[2]);
      data.append(pair[0],pair[1]);
    }
    fetch(url,{
      
      methods: ["POST"],
      // body: data
      
      // origin: true,
      // credentials: true,
      // maxAge: 3600,
    }).then(res=>{return res.json()}).then(res2=>{
      console.log(res2);
     //  console.log(data);
     location.reload();
   });
  }

 //  REMOVE DATA
 function removeData(item) {
   
   const url = `http://127.0.0.1:3000/remove/${item.innerText}`;
   fetch(url,{
     methods: ["DELETE"],
    //  origin: true,
      // credentials: true,
      // maxAge: 3600

   }).then(res=>res.json()).then(res2=>{
     
 console.log(`***********res2**************`);
 console.log(res2)
 console.log(`***********res2**************`);
     location.reload();
   })
 }
