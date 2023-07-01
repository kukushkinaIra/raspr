import React from "react";


export default function buildContractBlock(contract) {
    return (
        <div className="expended_padding_block">
            <div className="expanded_info_div"><b>ФИО полностью:</b> soon...</div>
            <div className="expanded_info_div"><b>Телефон:</b> soon...</div>
            <div className="expanded_info_div"><b>Дата начала:</b> {contract.startDate}</div>
            <div className="expanded_info_div"><b>Дата окончания:</b> {contract.endDate}</div>
            <div className="expanded_info_div"><b>Должности:</b> {contract.position}</div>
            <div className="expanded_info_div"><b>Адрес проживания:</b> {contract.addressActual}</div>
            <div className="expanded_info_div"><b>Адрес прописки:</b> {contract.addressResidence}</div>
            <div className="expanded_info_div"><b>Серия и номер пасспорта:</b> {contract.passport.number}</div>
            <div className="expanded_info_div"><b>Идентификационный номер
                паспорта:</b> {contract.passport.identification}</div>
            <div className="expanded_info_div"><b>Фото пасспорта:</b> soon...</div>
            <div className="expanded_info_div"><b>Дата выдачи пасспорта:</b> {contract.passport.issueDate}</div>
            <div className="expanded_info_div"><b>Дата окончания паспорта:</b> {contract.passport.expiryDate}
            </div>
            <div className="expanded_info_div"><b>Орган, выдавший пасспорт:</b> {contract.passport.authority}
            </div>
            <div className="expanded_info_div"><b>Университет:</b> {contract.institution.name}</div>
            <div className="expanded_info_div"><b>Факультет:</b> {contract.institution.faculty}</div>
            <div className="expanded_info_div"><b>Специальность:</b> {contract.institution.specoality}</div>
            <div className="expanded_info_div"><b>Куратор группы:</b> {contract.supervisor}</div>
            <div className="expanded_info_div"><b>Староста:</b> {contract.groupHead}</div>
            <div className="expanded_info_div"><b>ФИО в родительном
                падаже:</b> {contract.fullnameCases.genitiveCase}</div>
            <div className="expanded_info_div"><b>ФИО в дательном
                падеже:</b> {contract.fullnameCases.dativeCase}</div>
            <div className="expanded_info_div"><b>ФИО в творительном
                падеже:</b> {contract.fullnameCases.instrumentalCase}</div>
            <div className="expanded_info_div"><b>Фамилия И.О:</b> {contract.fullnameCases.abbreviation}</div>
        </div>
    )
}