import React from "react";


export default function buildShortInfoBlock(shortInfo) {
    return (
        <div className="expended_padding_block">
            <div className="expanded_info_div"><b>ФИО полностью:</b> {shortInfo.fullname}</div>
            <div className="expanded_info_div"><b>Университет:</b> {shortInfo.institution}</div>
            <div className="expanded_info_div"><b>Специальность:</b> {shortInfo.speciality}</div>
            <div className="expanded_info_div"><b>Получатель:</b> {shortInfo.recipient}</div>
            <div className="expanded_info_div"><b>Должность получателя:</b> {shortInfo.recipientPosition}</div>
            <div className="expanded_info_div"><b>Бланк:</b> soon...</div>
        </div>
    )
}