const GenerateData = require("./modules/generator");
const PublishData = require("./modules/publisher");

try{
    setInterval(()=>{
        let msg = GenerateData();
        if(msg){
            PublishData(msg);
        }
    }, 1000 * 30);

}catch(err){
    console.log(`Error : `, err);
}