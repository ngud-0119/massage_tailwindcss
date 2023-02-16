import React, { useState, useEffect, useRef } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import "./css/time-dropdown.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
function TimeDropdown({ value, state, name, ChangeTime }) {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState(value ? value : "set time");
  const refOne = useRef(null);

  useEffect(() => {
    setIsSelected(value ? value : "set time");
  }, [value]);

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <>
      <div className="dropdownTimer" tabindex="0" onBlur={handleBlur}>
        <div
          onClick={(e) => {
            setIsActive(!isActive);
          }}
          className="dropdownTimer-btn"
          style={{
            backgroundColor: state === "Closed" && "#ddd",
            pointerEvents: state === "Closed" && "none",
          }}
        >
          {selected}{" "}
          {state === "true" ? (
            <AccessTimeIcon sx={{ fontSize: "1.1rem" }} />
          ) : (
            " "
          )}
          {/* <span
            className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
          /> */}
        </div>
        <div
          className="dropdownTimer-content"
          style={{ display: isActive ? "block" : "none" }}
        >
          <div
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
            className="itemTimer"
          >
            12:00 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            12:30 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            1:00 am
          </div>
          <div
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
            className="itemTimer"
          >
            1:30 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            2:00 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            2:30 am
          </div>
          <div
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
            className="itemTimer"
          >
            3:00 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            3:30 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            4:00 am
          </div>
          <div
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
            className="itemTimer"
          >
            4:30 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            5:00 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            5:30 am
          </div>

          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            6:00 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            6:30 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            7:00 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            7:30 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            8:00 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            8:30 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            9:00 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            9:30 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            10:00 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            10:30 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            11:00 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            11:30 am
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            12:00 pm
          </div>

          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            12:30 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            1:00 pm
          </div>
          <div
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
            className="itemTimer"
          >
            1:30 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            2:00 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            2:30 pm
          </div>
          <div
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
            className="itemTimer"
          >
            3:00 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            3:30 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            4:00 pm
          </div>
          <div
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
            className="itemTimer"
          >
            4:30 pm
          </div>

          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            5:00 pm
          </div>

          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            5:30 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            6:00 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            6:30 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            7:00 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            7:30 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            8:00 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            8:30 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            9:00 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            9:30 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            10:00 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            10:30 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            11:00 pm
          </div>
          <div
            className="itemTimer"
            name={name}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
              ChangeTime(e);
            }}
          >
            11:30 pm
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeDropdown;

// Old code of menue

{
  /* 

      <select
        name="time"
        id="time"
        // class="form-select selectpicker selectDropdown"
        // aria-label="size 3 select example"
        style={{
          width: "120px",
          borderRadius: "18px",
          height: "35px",
          paddingLeft: "19px",
          cursor: "pointer",
        }}
        className="mydropdown"
      >
        <option value="12:00am">12:00am</option>
        <option value="12:30am">12:30am</option>
        <option value="1:00am">1:00am</option>
        <option value="1:30am">1:30am</option>
        <option value="2:00am">2:00am</option>
        <option value="2:30am">2:30am</option>
        <option value="3:00am">3:00am</option>
        <option value="3:30am">3:30am</option>
        <option value="4:00am">4:00am</option>
        <option value="4:30am">4:30am</option>
        <option value="5:00am">5:00am</option>
        <option value="5:30am">5:30am</option>
        <option value="6:00am">6:00am</option>
        <option value="6:30am">6:30am</option>
        <option value="7:00am">7:00am</option>
        <option value="7:30am">7:30am</option>
        <option value="8:00am">8:00am</option>
        <option value="8:30am">8:30am</option>
        <option value="9:00am">9:00am</option>
        <option value="9:30am">9:30am</option>
        <option value="10:00am">10:00am</option>
        <option value="10:30am">10:30am</option>
        <option value="11:00am">11:00am</option>
        <option value="11:30am">11:30am</option>
        <option value="12:00pm">12:00pm</option>
        <option value="12:30pm">12:30pm</option>
        <option value="1:00pm">1:00pm</option>
        <option value="1:30pm">1:30pm</option>
        <option value="2:00pm">2:00pm</option>
        <option value="2:30pm">2:30pm</option>
        <option value="3:00pm">3:00pm</option>
        <option value="3:30pm">3:30pm</option>
        <option value="4:00pm">4:00pm</option>
        <option value="4:30pm">4:30pm</option>
        <option value="5:00pm">5:00pm</option>
        <option value="5:30pm">5:30pm</option>
        <option value="6:00pm">6:00pm</option>
        <option value="6:30pm">6:30pm</option>
        <option value="7:00pm">7:00pm</option>
        <option value="7:30pm">7:30pm</option>
        <option value="8:00pm">8:00pm</option>
        <option value="8:30pm">8:30pm</option>
        <option value="9:00pm">9:00pm</option>
        <option value="9:30pm">9:30pm</option>
        <option value="10:00pm">10:00pm</option>
        <option value="10:30pm">10:30pm</option>
        <option value="11:00pm">11:00pm</option>
        <option value="11:30pm">11:30pm</option>
      </select>
    </>

*/
}
