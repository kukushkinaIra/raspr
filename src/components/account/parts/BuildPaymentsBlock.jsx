import React from "react";


export default function buildPaymentsBlock(payments) {

    const getPaymentImageBlock = (payment) => {
        if (payment.receiptImage) {
            const url = URL.createObjectURL(new Blob([payment.receiptImage], {type: 'image/png'}));
            return (<img className="payment-receipt-image" src={url} alt="payment_image"/>);
        } else
            return null;
    }

    return (
        <div className="expended_padding_block">
            {payments.map(payment => (<div>
                <div className="expanded_info_div"><b>Id платежа:</b> {payment.id}</div>
                <div className="expanded_info_div"><b>Сумма к оплате:</b> {payment.price + " руб."}</div>
                <div className="expanded_info_div"><b>Реквизиты счёта:</b> {payment.targetDetails}</div>
                <div className="expanded_info_div"><b>Время платежа:</b>
                    {new Date(Date.parse(payment.paymentTime)).toLocaleString()}
                </div>
                <div className="expanded_info_div"><b>Квитанция:</b> {payment.receiptText}</div>
                <div className="expanded_info_div"><b>Квитанция:</b></div>
                <div>{getPaymentImageBlock(payment)}</div>
                <hr/>
            </div>))}
        </div>
    )
}