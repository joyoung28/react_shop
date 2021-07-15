import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;
const CheckBox = ({ list, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    //누른것의 인덱스 구하고
    // console.log(checked.indexOf(value));
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    //전체 checked된 state에서 현재 누른 checked가 없다면
    if (currentIndex === -1) {
      //state를 넣어주고
      newChecked.push(value);
    } else {
      //빼준다.
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    list &&
    list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value.id)}
          checked={checked.indexOf(value.id) === -1 ? false : true}
        />
        {value.name}
      </React.Fragment>
    ));

  return (
    <>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </>
  );
};

export default CheckBox;
