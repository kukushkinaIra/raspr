import React from "react";

export default function BuildShortInfoBlock(shortInfo, orderId, id, setId, setRole, navigate) {

    function handleDownloadBlank() {
        const url = `/files/pinkBlank/user/${id}/short/${orderId}`;
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
                    const blank = Uint8Array.from(atob(data.file), (c) => c.charCodeAt(0));
                    const blobBlank = new Blob([blank]);
                    const urlBlank = URL.createObjectURL(blobBlank);
                    const link = document.createElement("a");
                    link.href = urlBlank;
                    link.download = "template_" + id + ".docx";
                    link.click();
                });
    }


    return (
        <div className="expended_padding_block">
            <div className="expanded_info_div"><b>ФИО полностью:</b> {shortInfo.fullname}</div>
            <div className="expanded_info_div"><b>Университет:</b> {shortInfo.institution}</div>
            <div className="expanded_info_div"><b>Специальность:</b> {shortInfo.speciality}</div>
            <div className="expanded_info_div"><b>Получатель:</b> {shortInfo.recipient}</div>
            <div className="expanded_info_div"><b>Должность получателя:</b> {shortInfo.recipientPosition}</div>
            <div className="expanded_info_div"><b>Бланк:</b>
                <button className="download-button" onClick={handleDownloadBlank}>Скачать</button>
            </div>
        </div>
    )
}