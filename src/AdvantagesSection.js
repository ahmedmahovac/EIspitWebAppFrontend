import Advantagecard from './Advantagecard';
import './AdvantageSection.module.css';
import HorizontalScroll from './HorizontalScroll';

const AdvantagesSection = ({advantages}) => {
    return (
        <div className='tc'>
        <h1>Pogodnosti</h1>
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