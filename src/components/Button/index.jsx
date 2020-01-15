import React, { Component } from 'react';
import Button from '../../components/Button';
import css from '../Button/button.css';

class Button extends Component {
    render() {
        return (
           <button className={`${css.btn} ${this.props.className}`}>
               {this.props.children}
           </button>
        );
    }
}


export default Button;