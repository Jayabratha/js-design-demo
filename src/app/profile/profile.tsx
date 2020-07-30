import React, { useEffect } from 'react';
import { HeaderService } from '../header/header.service';

function Profile(props: any) {
    console.log('Profile');
    useEffect(() => {
        HeaderService.setHeaderContent({
            primaryText: 'Your Profile',
            secondaryText: 'Edit your profile information',
            isHome: false,
        });
    });

    return (
        <div className='profile'>
            Profile
        </div>
    );
}

export default Profile;
