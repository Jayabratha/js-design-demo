import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeaderService } from '../header/header.service';
import '@jsdesign/jsd-button';

import './home.scss';

function Home(props: any) {
    useEffect(() => {
        console.log('firing');
        HeaderService.setHeaderContent({
            primaryText: 'profile',
            secondaryText: '',
            isHome: true,
        });
    });
    return (
        <div className='home-content'>
            <Link to='/auth'><jsd-button label='Lets Start'></jsd-button></Link>
        </div>
    );
}

export default Home;
