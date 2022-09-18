import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from 'mongodb';
import Head from 'next/head';

function MeetupDetails(props){
    return(
        <>
        <Head>
            <title>Meetup {props.meetupData.title}</title>
        </Head>
       <MeetupDetail 
       image={props.meetupData.image}
       title={props.meetupData.title}
       address={props.meetupData.address}
       description={props.meetupData.description}
       />
       </>
    )

}

export async function getStaticPaths(){

    const client = await MongoClient.connect('mongodb+srv://golammostofa31188:SKmACHEmPU3lCvda@cluster0.xmfncx1.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find({},{_id:1}).toArray();
    client.close();
    return{
        fallback:'blocking',
        paths:meetups.map((meetup)=>({
            params:{
                meetupId:meetup._id.toString()
            }
        }))
        
        
    }
}

export async function getStaticProps(context){

    const meetupId = context.params.meetupId;
    //console.log(meetupId)
    
    const client = await MongoClient.connect('mongodb+srv://golammostofa31188:SKmACHEmPU3lCvda@cluster0.xmfncx1.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    //console.log(meetupCollection)
    const selectedMeetup = await meetupCollection.findOne({ _id:ObjectId(meetupId) });
    //console.log('found'+selectedMeetup)
    client.close();
    return{
        props:{
            meetupData:{
                id:selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                image:selectedMeetup.image,
                address:selectedMeetup.address,
                description:selectedMeetup.description
            }
        },
        //revalidate:1
    }
    
}
export default MeetupDetails;