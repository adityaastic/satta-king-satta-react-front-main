import { useState, useEffect } from "react";
import moment from "moment";
import AdvertisementComponent from "../utilities/advertismentComponent";
const momenttz = require("moment-timezone");

function DayWiseResult({ dayGameData }) {
  const [data, setGameData] = useState([]);
  const currentTime = moment().format("HH:mm");
  const currentDate = moment().format("YYYY-MM-DD");

  useEffect(() => {
    setGameData(dayGameData);
  }, [dayGameData]);

  // based on current date and time get data
  const getTodayResult = (gameData) => {
    const itemTime = moment(gameData.open_time, "HH:mm");
    const currentMoment = moment(currentTime, "HH:mm");

    if (gameData?.curr_date?.date === currentDate) {
      return currentMoment.isSameOrAfter(itemTime)
        ? gameData?.curr_date?.result || ""
        : "";
    }
    return "";
  };

  return (
    <div className="text-center">
      <div className="col-12 text-center dayResultCompo">
        <h1 className="text-center">
          {" "}
          <span className="spinner-grow text-danger"></span>SATTA KING FAST RESULT{" "}
          <span className="spinner-grow text-danger"></span>
        </h1>

        {data.map((gameData, index) => (
          <div key={index} className="row">
            <div className="col-6 div-left border border-primary">
              <h3>{gameData?.game_name}</h3>
              <span>{gameData?.open_time}</span>
            </div>
            <div className="col-6 div-right border border-danger">
              <h3 style={{color:"black"}}>कल {gameData?.prev_date?.result || " null"}🚫</h3>
              <h3>आज {getTodayResult(gameData)}✅</h3>
            </div>
          </div>
        ))}
      </div>
      <AdvertisementComponent type='even' />
    </div>
  );
}

export default DayWiseResult;
