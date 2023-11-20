import React, { useEffect, useState } from "react";
import "../style/BodyComponent.css";
import { priorityArr, statusTitleArr, statusTitleLogo } from "../utils/constants";
import ListComponent from "./ListComponent";

const BodyComponent = ({ curGroup, curOrder, data }) => {
  const [groupedUserData, setGroupedUserData] = useState([]);
  const [groupedPriorityData, setGroupedPriorityData] = useState([]);
  const [groupedStatusData, setGroupedStatusData] = useState([]);

  console.log(curOrder);

  useEffect(() => {
    if (data) {
      let res = Object.groupBy(data.tickets, ({ userId }) => userId);
      setGroupedUserData(res);

      res = Object.groupBy(data.tickets, ({ priority }) => priority);
      setGroupedPriorityData(res);

      res = Object.groupBy(data.tickets, ({ status }) => status);
      setGroupedStatusData(res);
    }
  }, [data]);

  return (
    <>
      <div className="body-div">
        {data
          ? curGroup === "user"
            ? data.users.map((user, idx) => (
                <div key={user.id}>
                  <ListComponent
                    curGroup={curGroup}
                    curOrder={curOrder}
                    title={user.name}
                    cardArr={groupedUserData[user.id]}
                  />
                </div>
              ))
            : curGroup === "priority"
            ? priorityArr.map((obj, idx) => (
                  <div key={obj.key}>
                    <ListComponent
                    logo={priorityArr[idx].image}
                      curGroup={curGroup}
                      curOrder={curOrder}
                      title={priorityArr[idx].value}
                      cardArr={groupedPriorityData[priorityArr[idx].key]}
                    />
                  </div>
                ))
            : priorityArr.map((obj, idx) => (
                <div key={obj.key}>
                  <ListComponent
                    logo={statusTitleLogo[idx]}
                    curGroup={curGroup}
                    curOrder={curOrder}
                    title={statusTitleArr[idx]}
                    cardArr={groupedStatusData[statusTitleArr[idx]]}
                  />
                </div>
              ))
          : null}

        {/* {curOrder && <h1>{curOrder}</h1>} */}
      </div>
    </>
  );
};

export default BodyComponent;
