import React, { useState } from "react";
import { Collapse, Radio } from "antd";

const { Panel } = Collapse;
const RadioBox = ({ list, handleFilters }) => {
  const [Value, setValue] = useState(0);

  const renderRadioBox = () =>
    list &&
    list.map((value, index) => (
      <Radio key={value.id} value={value.id}>
        {value.name}
      </Radio>
    ));

  const handleChange = (e) => {
    setValue(e.target.value);
    handleFilters(e.target.value);
  };

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
      ,
    </div>
  );
};

export default RadioBox;
