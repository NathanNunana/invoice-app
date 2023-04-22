import React from 'react';
import { IconPlus } from '../../assets';
import './InvoiceButton.css';

const InvoiceButton = () => <>
    <div className='invoice-button'>
        <div>
            <img src={IconPlus}/>
        </div>
        New Invoice
    </div>
</>

export default InvoiceButton;