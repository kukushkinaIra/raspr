import React from "react";
import JSZip from "jszip";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import {saveAs} from 'file-saver';
import moment from "moment";


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


    function formatDate(date) {
        return moment(date).format('DD.MM.YYYY');
    }

    function handleDownloadContract() {
        const url = `/files/contractTemplate/1`;
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
            .then((data) => {
                const template = Uint8Array.from(atob(data.file), (c) => c.charCodeAt(0));
                // const blobBlank = new Blob([blank]);
                // const urlBlank = URL.createObjectURL(blobBlank);
                const zip = new PizZip(template);
                const doc = new Docxtemplater(zip);


                // Заполнение шаблона данными из объекта contract
                doc.setData({
                    contractNumber: contract.contractNumber,
                    contractDate: formatDate(contract.contractDate),
                    endDate: formatDate(contract.endDate),
                    duration: contract.duration,
                    fullname: contract.fullname,
                    birthDate: formatDate(contract.birthDate),
                    number: contract.passport.number,
                    issueDate: formatDate(contract.passport.issueDate),
                    expiryDate: formatDate(contract.passport.expiryDate),
                    authority: contract.passport.authority,
                    identification: contract.passport.identification,
                    addressResidence: contract.addressResidence,
                    position: contract.position.split(',')[0],
                    phoneNumber: contract.phoneNumber,
                });

                // Рендеринг шаблона
                doc.render();

                // Получение сгенерированного документа в формате Blob
                const generatedDocument = doc.getZip().generate({type: 'blob'});

                // Сохранение и скачивание сгенерированного документа
                saveAs(generatedDocument, 'generated_contract.docx');

            })
            .catch((error) => {
                console.error('Ошибка при считывании файла:', error);
            });
    }


    return (
        <div className="expended_padding_block">
            <div className="expanded_info_div"><u>Распределение</u></div>
            <div className="expanded_info_div"><b>ФИО полностью:</b> {contract.fullname}</div>
            <div className="expanded_info_div"><b>Телефон:</b> {contract.phoneNumber}</div>
            <div className="expanded_info_div"><b>Дата начала отработки:</b> {contract.startDate}</div>
            <div className="expanded_info_div"><b>Дата окончания отработки:</b> {contract.endDate}</div>
            <div className="expanded_info_div"><b>Дата начала контракта:</b> {contract.contractDate}</div>
            <div className="expanded_info_div"><b>Номер контракта:</b> {contract.number}</div>
            <div className="expanded_info_div"><b>Должности:</b> {contract.position}</div>
            <div className="expanded_info_div"><b>Адрес проживания:</b> {contract.addressActual}</div>
            <div className="expanded_info_div"><b>Адрес прописки:</b> {contract.addressResidence}</div>
            <div className="expanded_info_div"><b>Серия и номер паспорта:</b> {contract.passport.number}</div>
            <div className="expanded_info_div"><b>Идентификационный номер
                паспорта:</b> {contract.passport.identification}</div>
            <div className="expanded_info_div"><b>Дата выдачи паспорта:</b> {contract.passport.issueDate}</div>
            <div className="expanded_info_div"><b>Дата окончания паспорта:</b> {contract.passport.expiryDate}
            </div>
            <div className="expanded_info_div"><b>Орган, выдавший паспорт:</b> {contract.passport.authority}
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
            <div className="expanded_info_div"><b>Контракт:</b>
                <button className="download-button" onClick={handleDownloadContract}>Скачать контракт</button>
            </div>
        </div>
    )
}