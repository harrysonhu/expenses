import React from 'react';
import { css } from 'aphrodite';
import headerImage from '../../assets/headerImage.jpg';
import { styles } from './PageHeader.css';

export const PageHeader = () => (
    <div className={css(styles.container)}>
        <p className={css(styles.title)}>Track your spending</p>
        <img src={headerImage} className={css(styles.backgroundImage)} />
    </div>
);
