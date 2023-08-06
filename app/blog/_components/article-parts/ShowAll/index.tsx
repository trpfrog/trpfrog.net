import React from "react";
import ArticleRenderer from "@blog/_renderer/ArticleRenderer";
import {ArticleParts} from "../../ArticleParts";
import {ShowAllComponent} from "@blog/_components/article-parts/ShowAll/ShowAllComponent";

const ShowAll: ArticleParts = ({content, mdOptions}) => {
  const [first, second] = content.split(/\n---+\n/)
  return (
    <ShowAllComponent preview={
      <ArticleRenderer toRender={first} markdownOptions={mdOptions}/>
    }>
      <ArticleRenderer toRender={second} markdownOptions={mdOptions}/>
    </ShowAllComponent>
  )
}


export default ShowAll
