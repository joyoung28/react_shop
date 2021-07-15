import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;
const SearchFeature = ({ refreshFunction }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const changeHanler = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  const searchHandler = (e) => {
    setSearchTerm(e);
    refreshFunction(searchTerm);
  };

  return (
    <div>
      {" "}
      <Search
        placeholder="input search text"
        onChange={changeHanler}
        onSearch={searchHandler}
        value={searchTerm}
        style={{ width: 200 }}
      />
    </div>
  );
};

export default SearchFeature;
