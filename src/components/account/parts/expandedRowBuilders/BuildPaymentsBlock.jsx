import React from "react";


export default function BuildPaymentsBlock(payments, id, setId, setRole, navigate) {
    function handleDownloadPaymentReceipt(payment) {
        const url = `/files/receipt/user/${id}/payment/${payment.id}`;
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .catch((error) => {
                if (error.message === "401") {
                    const authCookie = document.cookie
                        .split(";")
                        .find((cookie) => cookie.startsWith("auth="));
                    if (!authCookie) {
                        setId(null);
                        setRole(null);
                        navigate('/login');
                    }
                }
            })
            .then(
                (data) => {
                    const pinkBlank = Uint8Array.from(atob(data.file), (c) => c.charCodeAt(0));
                    const blobBlank = new Blob([pinkBlank], {type: "image/jpeg"});
                    const urlBlank = URL.createObjectURL(blobBlank);
                    const link = document.createElement("a");
                    link.href = urlBlank;
                    link.download = "receipt_" + payment.id + ".jpeg";
                    link.click();
                }
            );
    }

    return (
        <div className="expended_padding_block">
            {payments.map(payment => (<div>
                <div className="expanded_info_div"><b>№ платежа:</b> {payment.id}</div>
                <div className="expanded_info_div"><b>Сумма к оплате:</b> {payment.price + " руб."}</div>
                <div className="expanded_info_div"><b>Реквизиты счёта:</b> {payment.targetDetails}</div>
                <div className="expanded_info_div"><b>Время платежа:</b>
                    {payment.paymentTime != null ? new Date(Date.parse(payment.paymentTime)).toLocaleString() : ''}
                </div>
                <div className="expanded_info_div"><b>Квитанция(текст):</b> {payment.receiptText}</div>
                <div className="expanded_info_div">
                    <b>Квитанция(фото):</b>
                    {payment.paymentTime != null ?
                        <button className="download-button"
                                onClick={() => handleDownloadPaymentReceipt(payment)}>Скачать</button>
                        : ''}
                </div>
                <p></p>
            </div>))}
        </div>
    )
}