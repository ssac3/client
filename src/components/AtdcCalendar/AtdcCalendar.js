import React from 'react';
// import PropTypes from 'prop-types';
import 'antd/dist/antd.min.css';
import './index.css';
import {Badge, Calendar} from 'antd';

const getListData = (value) => {
  let listData;

  switch (value.date()) {
    case 8:
      listData = [
        {
          type   : 'warning',
          content: 'This is warning event.',
        }
      ];
      break;

    case 10:
      listData = [
        {
          type   : 'warning',
          content: 'This is warning event.',
        }
      ];
      break;

    case 15:
      listData = [
        {
          type   : 'warning',
          content: 'This is warning event',
        }
      ];
      break;

    default:
  }

  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
  return 0;
};

export const AtdcCalendar = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content}/>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};

// AtdcCalendar.propTypes = {
//     getListData: PropTypes.arrayOf(PropTypes.string).isRequired,
//     getMonthData: PropTypes.string.isRequired
// };