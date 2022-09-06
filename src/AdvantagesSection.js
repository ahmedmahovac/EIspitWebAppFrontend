import Advantagecard from './Advantagecard';
import HorizontalScroll from './HorizontalScroll';

const AdvantagesSection = ({advantages}) => {
    return (
        <div className='tc'>
        <h1>Advantages</h1>
        <HorizontalScroll>
            {advantages.map((item)=>{
                return <Advantagecard key={item.id} icon={item.icon} title={item.title} description={item.description}/>
            })
            }
        </HorizontalScroll>
        </div>
    );
}


export default AdvantagesSection;