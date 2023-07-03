import React from "react";
import JSZip from "jszip";


export default function BuildContractBlock(contract, id, setId, setRole, navigate) {

    function handleDownloadPinkBlank() {
        const url = `/files/pinkBlank/user/${id}/contract/${contract.id}`;
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
                    link.download = "pink_blank_" + id + ".jpeg";
                    link.click();
                }
            );
    }

    function handleDownloadPassportPhotos() {
        const url = `/files/passport/user/${id}/contract/${contract.id}`;
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
                    console.log(data)
                    const zip = new JSZip();
                    data.files.forEach((element, index) => {
                        const fileData = Uint8Array.from(atob(element), (c) => c.charCodeAt(0));
                        zip.file(`image${index + 1}.jpeg`, fileData);
                    });

                    zip.generateAsync({type: "blob"}).then((blob) => {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = "passport_" + id + ".zip";
                        link.click();
                    });
                }
            );
    }

    return (
        <div className="expended_padding_block">
            <div className="expanded_info_div"><b>ФИО полностью:</b> {contract.fullname}</div>
            <div className="expanded_info_div"><b>Телефон:</b> {contract.phoneNumber}</div>
            <div className="expanded_info_div"><b>Дата начала:</b> {contract.startDate}</div>
            <div className="expanded_info_div"><b>Дата окончания:</b> {contract.endDate}</div>
            <div className="expanded_info_div"><b>Должности:</b> {contract.position}</div>
            <div className="expanded_info_div"><b>Адрес проживания:</b> {contract.addressActual}</div>
            <div className="expanded_info_div"><b>Адрес прописки:</b> {contract.addressResidence}</div>
            <div className="expanded_info_div"><b>Серия и номер пасспорта:</b> {contract.passport.number}</div>
            <div className="expanded_info_div"><b>Идентификационный номер
                паспорта:</b> {contract.passport.identification}</div>
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
            <div className="expanded_info_div"><b>Розовый бланк:</b>
                <button className="download-button" onClick={handleDownloadPinkBlank}>Скачать</button>
            </div>
            <div className="expanded_info_div"><b>Фото паспорта:</b>
                <button className="download-button" onClick={handleDownloadPassportPhotos}>Скачать архив</button>
            </div>
        </div>
    )
}