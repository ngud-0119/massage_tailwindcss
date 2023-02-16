import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../src/context/dataContext";
import { useNavigate } from "react-router-dom";
import { getCities } from "../axiosCalls";
import heroBg from "../assets/hero-bg.png";
import rightImg from "../assets/image-14.png";
import MostRecentMasseuseDiscussion from "../component/sections/most-recent-masseuse-discussions";
import { MDBBtn } from "mdb-react-ui-kit";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Messeuse() {
  const navigate = useNavigate();
  const [Allcity, setAllcity] = useState([]);
  const [selectValue, setSelectValue] = useState(1);
  const { handleMasseuseChangeQuery, masseuseQuery, setIsSearchPage } = useContext(Context);

  const [errors, setErrors] = useState({});

  const submitHandler = () => {
    let errors = {};
    if (!masseuseQuery) {
      errors["query"] = "Search is required";
    }
    if (Object.keys(errors).length <= 0) {
      navigate("/masseuse/search", {
        state: { userType: "masseuse" },
      });
    } else {
      setErrors(errors);
    }
  };

  const handleKeypress = (e) => {
    console.log(e); //it triggers by pressing the enter key
    if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
      console.log("called the submit handler");
      submitHandler();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCities().then((res) => {
        setAllcity(res.data.data);
      });
    };
    setIsSearchPage(false)
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <div
        className="hero-section section overlay"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="">
          <div className="row main-row-adv messeuse-left-side">
            <div className="col-md-8 left-side">
              <h2 className="heading">
                Discover The Most Reviewed <br /> Masseuse In Your City
              </h2>

              {/* <div class="input-group home-searxh"> */}
              {/* <FormControl sx={{ minWidth: 120 }} size="small">
                  <Select
                    name="city"
                    type="search"
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={selectValue}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: 0,
                      },
                    }}
                  >
                    <MenuItem value="1">{Allcity[0]?.name}</MenuItem>
                    {Allcity?.map((city) => {
                      return (
                        <MenuItem
                          style={{
                            display:
                              Allcity[0]?.name === city?.name ? "none" : "",
                          }}
                          value={city?.id}
                        >
                          {city?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl> */}

              {/* <input
                  type="search"
                  value={masseuseQuery}
                  onChange={handleMasseuseChangeQuery}
                  name="query"
                  required
                  onKeyPress={handleKeypress}
                  class="form-control "
                  placeholder="Search here..."
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                <button
                  type="submit"
                  onClick={submitHandler}
                  class="btn btn-outline"
                >
                  search
                </button>
              </div> */}
            </div>

            <div className="col-md-4 right">
              <img src={rightImg} className="" />
            </div>
          </div>
        </div>
      </div>

      <MostRecentMasseuseDiscussion />
    </>
  );
}
