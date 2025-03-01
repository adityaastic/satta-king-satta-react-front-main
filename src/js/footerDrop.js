import Select from "react-select";
import React, { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import MonthlyTable from "./monthlyResult";
import { useLocation } from "react-router-dom";
import AdvertisementComponent from "../utilities/advertismentComponent";

const monthFullName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function FooterDrop() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [gameOptions, setGameOptions] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [dropValue, setDropValue] = useState({});

  const location = useLocation();
  const isPrivacy = location.pathname.includes("/privacy-policy");
  const isDisclaimer = location.pathname.includes("/disclaimer");
  const isAbout = location.pathname.includes("/about-us");

  const currentMonth = moment().format("M"); // Numeric month index (1-based)
  const currentYear = new Date().getFullYear();

  const monthArray = monthFullName.map((month, index) => ({
    value: index + 1,
    label: month,
  }));
  const yearArray = Array.from({ length: 10 }, (_, i) => ({
    value: currentYear - i,
    label: currentYear - i,
  }));

  useEffect(() => {
    async function fetchGameNames() {
      try {
        const response = await fetch(
          "https://api.sattakingvip.co.in/getGameName",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          }
        );
        const result = await response.json();
        setGameOptions(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGameNames();
  }, []);

  const handleSelectChange = (setter) => (selected) => {
    setter(selected);
  };

  const fetchMonthlyData = useCallback(async (params) => {
    try {
      const response = await fetch(
        "https://api.sattakingvip.co.in/getmonthdata",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        }
      );
      const result = await response.json();
      setSelectedData(result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = () => {
    if (selectedMonth && selectedYear && selectedOption) {
      const selectedYearValue = selectedYear.value;
      const selectedMonthValue = selectedMonth.value;
      const daysInMonth = moment
        .tz(`${selectedYearValue}-${selectedMonthValue}`, "Asia/Kolkata")
        .daysInMonth();

      const allData = {
        month: selectedMonth.value,
        year: selectedYear.value,
        gameName: selectedOption.value,
        result: "",
        days: daysInMonth,
      };

      if (
        selectedMonthValue > currentMonth &&
        selectedYearValue === currentYear
      ) {
        toast.error("Selected month is out of date", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        fetchMonthlyData(allData);
        setDropValue(allData);
      }
    } else {
      toast.error("All Fields Required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const customStyles = {
    control: (provided) => ({ ...provided, minHeight: "46px", height: "46px" }),
    input: (provided) => ({ ...provided, minHeight: "46px" }),
    valueContainer: (provided) => ({
      ...provided,
      height: "46px",
      padding: "0 8px",
    }),
    singleValue: (provided) => ({
      ...provided,
      height: "46px",
      display: "flex",
      alignItems: "center",
    }),
    indicatorsContainer: (provided) => ({ ...provided, height: "46px" }),
  };

  return (
    <div className="footer">
      {!(isAbout || isDisclaimer || isPrivacy) && (
        <>
          <MonthlyTable
            gamedata={selectedData}
            dropValue={dropValue}
            style={{ display: "block" }}
          />

          <div className="yellow-container pt-5">
            <div className="bottom-container">
              <div className="selection-container">
                <div className="col-12">
                  <div className="row">
                    <div className="col-l-3 col-md-3 col-sm-12 col-xs-12 pb-2">
                      <Select
                        menuPlacement="auto"
                        value={selectedMonth}
                        onChange={handleSelectChange(setSelectedMonth)}
                        options={monthArray}
                        placeholder="Select Month"
                        styles={customStyles}
                      />
                    </div>
                    <div className="col-l-3 col-md-3 col-sm-12 col-xs-12 pb-2">
                      <Select
                        menuPlacement="auto"
                        value={selectedYear}
                        onChange={handleSelectChange(setSelectedYear)}
                        options={yearArray}
                        placeholder="Select Year"
                        styles={customStyles}
                      />
                    </div>
                    <div className="col-l-3 col-md-3 col-sm-12 col-xs-12 pb-2">
                      <Select
                        menuPlacement="auto"
                        value={selectedOption}
                        onChange={handleSelectChange(setSelectedOption)}
                        options={gameOptions}
                        placeholder="Select Game"
                        styles={customStyles}
                      />
                    </div>
                    <div className="col-l-3 col-md-3 col-sm-12 col-xs-12 pb-2">
                      <button
                        className="form-control"
                        id="go-button"
                        onClick={handleSubmit}
                      >
                        Go
                      </button>
                      <ToastContainer
                        autoClose={2000}
                        position="top-right"
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        pauseOnHover
                        draggable
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AdvertisementComponent type='random' />
          </div>
        </>
      )}
    </div>
  );
}

export default FooterDrop;
