import React from "react";


export default function BuildQuestionnaire(questionnaire) {

    return (
        <div className="expended_padding_block">
            <div className="expanded_info_div"><u>Анкета</u></div>
            {questionnaire.fields.map((field, index) => (
                <div className="expanded_info_div" key={index}>
                    <b>{field.label}: </b>{field.value}
                </div>
            ))}
        </div>
    );
}
