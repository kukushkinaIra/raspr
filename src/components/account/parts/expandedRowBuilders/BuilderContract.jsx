import React, {useEffect, useState} from "react";
import JSZip from "jszip";

export default function buildContractBlock(contract) {

    const pinkBlank = Uint8Array.from(atob(contract.pinkBlank), (c) => c.charCodeAt(0));
    const blobBlank = new Blob([pinkBlank], {type: "image/jpeg"});
    const urlBlank = URL.createObjectURL(blobBlank);

    const handleDownloadZip = () => {
        // const zip = new JSZip();
        // contract.passport.passportPhotos.forEach((photo, index) => {
        //     const fileData = Uint8Array.from(atob(photo.file), (c) => c.charCodeAt(0));
        //     zip.file(`image${index + 1}.jpg`, fileData);
        // });
        //
        // zip.generateAsync({type: "blob"}).then((blob) => {
        //     const url = URL.createObjectURL(blob);
        //
        //     const link = document.createElement("a");
        //     link.href = url;
        //     link.download = "photos.zip";
        //     link.click();
        // });

        const pinkBlank = Uint8Array.from(atob(contract.pinkBlank), (c) => c.charCodeAt(0));
        const blobBlank = new Blob([pinkBlank], {type: "image/jpeg"});
        const url = URL.createObjectURL(blobBlank);
        const link = document.createElement("a");
        link.href = url;
        link.download = "photos.jpg ";
        link.click();

    }

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
            <div className="expanded_info_div"><b>Розовый бланк:</b><a href={urlBlank} download="blank.jpeg">Скачать</a>
            </div>
            <div className="expanded_info_div"><b>Фото паспорта:</b>
                <button onClick={handleDownloadZip}>Скачать все фотографии</button>
            </div>
        </div>
    )
}