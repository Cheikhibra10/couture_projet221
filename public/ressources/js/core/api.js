export class Api{

 static async postData(url="",data={}){
 await fetch(url, {
   method: 'POST',
   headers: {
     'Content-type': 'application/json'
   },
   
   body: JSON.stringify(data)
 }); 
 }
}