import MeetupList from '../components/meetups/MeetupList';
import {MongoClient} from 'mongodb';
import Head from 'next/head';


function HomePage(props){
    

    return (
        <>
        <Head>
            <title>Meetup List</title>
        </Head>
        <MeetupList meetups={props.meetups} />
        </>
    
    )
}
//alternatives of getStatisProps serverside
//caching disadvantage
/*
export async function getServerSideProps(context){
    const req = context.req;
    const res = context.res;
    return{
        props:{
            meetups:DUMMY_MEETUPS
        }
    }

}
*/


export async function getStaticProps(){

    const client = await MongoClient.connect('mongodb+srv://golammostofa31188:SKmACHEmPU3lCvda@cluster0.xmfncx1.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find().toArray();
    //console.log(meetups)
    client.close();
    return{
        props:{
            meetups:meetups.map((meetup)=>({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                id:meetup._id.toString()
            }))
        },
        revalidate:1
    }
}

export default HomePage;