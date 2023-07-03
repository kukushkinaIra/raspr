import React from "react";


export default function buildQuestionnaire(questionnaire) {
    return (
        <div className="expended_padding_block">
            <div className="expanded_info_div"><b>Пол: </b> {questionnaire.gender}</div>
            <div className="expanded_info_div"><b>Возраст: </b> {questionnaire.age}</div>
            <div className="expanded_info_div"><b>Город: </b> {questionnaire.city}</div>
            <div className="expanded_info_div"><b>Является студентом: </b> {questionnaire.studentFlag}</div>
            <div className="expanded_info_div"><b>Университет: </b> {questionnaire.instituition}</div>
        </div>
    )
}