import React from "react";
import ArticleRenderer from "@blog/_renderer/ArticleRenderer";
import {ServerArticleParts} from "../../ArticleParts";
import {ShowAllComponent} from "@blog/_components/article-parts/ShowAll/ShowAllComponent";

const ShowAll: ServerArticleParts = ({content, entry, imageSize}) => {
  const [first, second] = content.split(/\n---+\n/)
  return (
    <ShowAllComponent preview={
      <ArticleRenderer toRender={first} entry={entry} imageSize={imageSize}/>
    }>
      <ArticleRenderer toRender={second} entry={entry} imageSize={imageSize}/>
    </ShowAllComponent>
  )
}


export default ShowAll
