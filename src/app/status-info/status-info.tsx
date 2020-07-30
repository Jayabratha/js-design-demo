import React, { Fragment, useState, useEffect } from 'react';
import { HeaderService } from '../header/header.service';
import { HeaderContent } from '../header/header-content';
import './status-info.scss';
import { Subscription } from 'rxjs';

function StatusInfo(props: any) {
  const [headerContent, setHeaderContent] = useState<any>();

  useEffect(() => {
    const headerSubscription: Subscription = HeaderService.getHeaderContent().subscribe((content: HeaderContent) => {
      console.log(content);
      setHeaderContent(content);
    });

    return function cleanup() {
      headerSubscription.unsubscribe();
    };
  }, []);

  return (
    headerContent ?
    <div className={`status-wrapper ${headerContent.isHome ? 'home' : ''}`}>
      <div className='indicator' ></div>
      <div className='info-content content'>
        <div className='header-text'>
          {!headerContent.isHome ?
            <Fragment>
              <h1 className='bold'>{headerContent.primaryText}</h1>
              <h2>{headerContent.secondaryText}</h2>
            </Fragment> :
            <h1 className='home bold'>
              <span className='secondary'>profile</span>
              <span className='primary'>portfolio</span>
            </h1>
          }
        </div>
      </div>
    </div> : <div></div>
  );
}

export default StatusInfo;
