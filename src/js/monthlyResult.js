import moment from "moment-timezone";
import { Table, notification } from "antd";
import React, { useState, useEffect } from "react";

function MonthlyTable({ gamedata, dropValue }) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectMonthDrop, setSelectMonthDrop] = useState(""); // Holds selected month

  const currentYear = moment().tz("Asia/Kolkata").year();
  const currentMonth = moment().tz("Asia/Kolkata").month() + 1; // 1-based index
  const numberDaysMonth = moment().tz("Asia/Kolkata").daysInMonth();

  useEffect(() => {
    // Set the month to the selected value or default to the current month
    const month = dropValue.month || currentMonth;
    const monthName = moment()
      .month(month - 1)
      .format("MMMM"); // Convert to month name
    setSelectMonthDrop(monthName);
  }, [dropValue, currentMonth]);

  useEffect(() => {
    if (gamedata) {
      setData(gamedata);
    }
  }, [gamedata]);

  useEffect(() => {
    if (data.length > 0) {
      const array = Object.keys(data[0]).map((key) => ({
        title: key === "day" ? selectMonthDrop : key, // Use selected month in the column header
        dataIndex: key,
        key,
      }));
      setColumns(array);
    }
  }, [data, selectMonthDrop]);

  useEffect(() => {
    const fetchMonthData = async () => {
      try {
        // Check if the selected date is in the future
        if (dropValue.month > currentMonth && dropValue.year === currentYear) {
          // Show a notification for unavailable data
          notification.error({
            message: "Data Unavailable",
            description: "The data for the selected month is not available.",
            placement: "right",
            duration: 3,
          });
          // Clear the data
          setData([]);
          setColumns([]);
        } else {
          // Fetch data if the date is not in the future
          const response = await fetch(
            "https://api.sattakingvip.co.in/getmonthdata",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                month: dropValue.month || currentMonth,
                year: dropValue.year || currentYear,
                gameName: dropValue.gameName || "",
                result: "",
                days: numberDaysMonth,
              }),
            }
          );
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMonthData();
  }, [dropValue, currentMonth, currentYear, numberDaysMonth]);

  return (
    <div className="pt-3 monthYrTbl">
      <div id="scrollbar1">
        <h5
          className="text-white text-center m-3"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {dropValue ? (
            <>
              <span>{dropValue?.gameName} MONTHLY RECORD CHART</span>
              <span style={{ marginLeft: "10px" }}>
                {dropValue.year || currentYear}
              </span>
            </>
          ) : (
            <>
              <span>MONTHLY RECORD CHART</span>
              <span style={{ marginLeft: "10px" }}>{currentYear}</span>
            </>
          )}
        </h5>
        </div> 
         <div
        className="table-responsive"
        id="scrollbar1"
        style={{ border: "2px solid" }}
      > 
        <Table dataSource={data} columns={columns} pagination={false} />
      </div>
    </div>
  );
}

export default MonthlyTable;
