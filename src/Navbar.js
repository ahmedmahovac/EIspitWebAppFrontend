import React, {Component} from 'react';
import MenuItems from './MenuItems';
import './Navbar.module.css';

class Navbar extends Component {
    render() {
        return(
            <nav className='navBar'>
                <h1>E-Ispit</h1>
                <ul className='navItems'>
                    {MenuItems.map((item,index)=>{
                        return(
                            <li>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}


export default Navbar
