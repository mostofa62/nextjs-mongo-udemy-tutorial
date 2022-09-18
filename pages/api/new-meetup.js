import {MongoClient} from 'mongodb';
async function handler(req, res){

    if(req.method == "POST"){
        const data = req.body;
        console.log(data);
        const {title, image, address, description} = data;
        const client = await MongoClient.connect('mongodb+srv://golammostofa31188:SKmACHEmPU3lCvda@cluster0.xmfncx1.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);
        console.log(result)
        client.close()
        res.status(201).json({message:"Meetup Inserted!"})
    }

}
export default handler;