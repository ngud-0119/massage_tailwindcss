import React, { useState } from "react";
import { Context } from "./dataContext";

const initialData = "";
const initialDataSpa = "";
const initialDataMasseuse = "";
function DataProvider({ children }) {
  const [query, setQuery] = useState(initialData);
  const [spaQuery, setSpaQuery] = useState(initialDataSpa);
  const [masseuseQuery, setMasseuseQuery] = useState(initialDataMasseuse);
  const [commentOfType, setCommentOfType] = useState("comment");
  const [commentId, setCommentId] = useState();
  const [commentIdOfUpdate, setCommentIdOfUpdate] = useState();
  const [replyOfUpdate, setReplyOfUpdate] = useState();
  const [isSearchPage, setIsSearchPage] = useState(false)

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };
  const handleSpaChangeQuery = (e) => {
    setSpaQuery(e.target.value);
  };
  const handleMasseuseChangeQuery = (e) => {
    setMasseuseQuery(e.target.value);
  };

  return (
    <Context.Provider
      value={{
        query,
        handleChangeQuery,
        spaQuery,
        handleSpaChangeQuery,
        masseuseQuery,
        handleMasseuseChangeQuery,
        commentOfType,
        setCommentOfType,
        setCommentId,
        commentId,
        setCommentIdOfUpdate,
        commentIdOfUpdate,
        setReplyOfUpdate,
        replyOfUpdate,
        setIsSearchPage,
        isSearchPage
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default DataProvider;
