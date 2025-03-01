import "./App.css";
import { useState, useEffect } from "react";
import moment from "moment";
import trackVisitor from "./utilities/tracker";
import DayWiseResult from "./js/dayWiseResult";
import AdvertisementComponent from "./utilities/advertismentComponent";
import { Helmet } from "react-helmet";
const momenttz = require("moment-timezone");
function App() {
  var currentDateDisplay = moment(new Date()).tz("Asia/Kolkata").format("lll");
  const currentDate = moment().format("YYYY-MM-DD");
  const prevDate = moment().subtract(1, "days").format("YYYY-MM-DD");
  const [data, setData] = useState([]); // State to store data fetched from backend
  const [datagame, setDataFor] = useState([]); // State to store processed data for display
  const currentTime = moment().format("HH:mm");

  // Fetch data from backend when component mounts
  useEffect(() => {
    fetch("https://api.sattakingvip.co.in/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        game_name: "",
        curr_date: currentDate,
        prev_date: prevDate,
        open_time: "market_sunday_time_open",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // Sort data based on open_time
        const sortedData = json.sort((a, b) => {
          const timeA = moment(a.open_time, "HH:mm");
          const timeB = moment(b.open_time, "HH:mm");
          return timeA.diff(timeB);
        });

        // Set sorted data into state
        setData(sortedData);
      })
      .catch((error) => console.error(error));
  }, [currentDate, prevDate]);

  useEffect(() => {
    if (data?.length > 0) {
      // Convert current time to a moment object for comparison
      const currentMoment = moment(currentTime, "HH:mm");

      // Process and filter the data
      const processedData = data.map((item) => {
        const itemTime = moment(item.open_time, "HH:mm");
        const resultAvailable = item?.curr_date?.result ? true : false;

        return {
          gameName: item.game_name,
          result: resultAvailable ? item?.curr_date?.result : "wait",
          openTime: item.open_time,
          isAvailable: resultAvailable,
          itemTime: itemTime,
        };
      });

      // Sort the processed data by open_time
      const sortedProcessedData = processedData.sort((a, b) => {
        return a.itemTime.diff(b.itemTime);
      });

      // Separate records into those with available results and those with "wait"
      const availableResults = sortedProcessedData.filter(
        (item) => item.isAvailable
      );
      const upcomingRecords = sortedProcessedData.filter(
        (item) => !item.isAvailable
      );

      // Determine the records to display
      let recordsToDisplay = [];

      if (availableResults.length > 0) {
        // Show available results and include records up to the next upcoming record
        recordsToDisplay = [...availableResults];

        const lastAvailableIndex = sortedProcessedData.indexOf(
          availableResults[availableResults.length - 1]
        );
        const nextRecord = sortedProcessedData[lastAvailableIndex + 1];
        if (nextRecord) {
          recordsToDisplay.push(nextRecord);
        }
      } else {
        // No available results, show up to 3 upcoming records with "wait"
        recordsToDisplay = [...upcomingRecords.slice(0, 3)];
      }

      // Ensure only 3 records are shown
      if (recordsToDisplay.length > 3) {
        // Remove the oldest record if more than 3 records are present
        recordsToDisplay = recordsToDisplay.slice(-3);
      }

      // Update state with the processed and limited data
      setDataFor(recordsToDisplay);

      // Debugging log
    }
  }, [data, currentTime]);

  useEffect(() => {
    trackVisitor();
  });

  return (
    <div className="App">
      {/* seo setup start */}
      <Helmet>
        <title></title>
        <meta
          name="description"
          content="satta-king-satta,satta-company,sattasport, satta sport, sattaking"
        />
        <meta
          name="Keywords"
          content="satta-company,satta company, sattakingreal, satta king real, sattaking real, Satta King, Satta King live result, Satta king online result, Satta king online, Satta king result today, Gali result, Desawar result, Faridabad result, Gaziyabad result, Satta matka king, Satta Bazar, Black satta king, Satta king 2017, satta king 2018, Gali Leak Number, Gali Single Jodi, Black Satta Result, Desawar Single Jodi, Satta king up, Satta king desawar, Satta king gali, Satta king 2019 chart, Satta baba king, Satta king chart, Gali live result, Disawar live result, Satta Number, Matka Number, Satta.com, Satta Game, Gali Number, Delhi Satta king,"
        />
        <link rel="canonical" href="https://satta-king-satta.co/" />
      </Helmet>
      {/* seo setup end */}
      <div className="headerSatta">
        <div className="col-12 text-center heading">
          <a href="/">
            <h3>SATTA KING</h3>
          </a>
          <h6>SATTA KING 2020 - SATTA KING RESULT - SATTA KING UP</h6>
        </div>
        <div className="dayResult text-center">
          <h5>{currentDateDisplay}</h5>
          <h6>डायरेक्ट सट्टा-किंग कंपनी से रिजल्ट देखने के लिए रुके रहिये</h6>
          <div className="row">
            {datagame?.map((todayData, index) => (
              <div key={index}>
                <h2 className="fs-2">{todayData?.gameName}</h2>
                <h5 className="lh-1 fs-4 mb-4  blinking-text">
                  {todayData?.result || "wait"}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AdvertisementComponent type="odd" />
      <DayWiseResult dayGameData={data} />
    </div>
  );
}

export default App;
