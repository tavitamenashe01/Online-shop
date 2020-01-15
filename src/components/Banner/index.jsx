import React, { Component } from 'react';
import Banner from '../../components/Banner';
import Button from '../Button';
import css from './banner.css';

class Banner extends Component {
    render() {
        return (
            <div className={css.banner}>
                <h1 className={css.bannerTitle}>Fashion sale</h1>
                <Button text="Check" className={css.bannerBtn} />
            </div>
        );
    }
}


export default Banner;