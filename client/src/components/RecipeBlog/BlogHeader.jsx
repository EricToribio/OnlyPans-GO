/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { Item } from '@mui-treasury/components/flex';
import MainCarouselContainer from './MainCarouselContainer';

export default ({sortTag}) => {

  const linkStyle = {
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    color: '#000',
  }
  return (
    <div className='container-header mb-0'>
      <div className='carousel-header'>
            <MainCarouselContainer /> 
        <div>
          <div className="carousel mb-0 d-flex justify-content-center">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'transparent',
                marginTop: '-360px',
                width: '400px',
                height: '85px',
              }}
            >
              <Item sx={{
                boxSizing: 'content-box !important',
                border: '5px solid #000',
                bgcolor: '#fff',
              }}>
                <h2
                  style={{
                    height: 80,
                    width: 'auto',
                    padding: '10px 20px 18px',
                  }}
                  className='text-center overflow-hidden'
                > {sortTag}</h2>
              </Item>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

