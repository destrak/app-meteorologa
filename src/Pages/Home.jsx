import BarNav from '../components/BarNav';
import UbicationQuery from '../components/UbicationQuery';

function Home() {
    const usuario = "Lorem ipsum";
    return(
        <>
            <BarNav />
            <UbicationQuery name={usuario}/>
            
        </>
    )
}
export default Home;