import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/dataContext";
import heroBg from "../../assets/hero-bg.png";
import "../../css/herosec.css";
import { useNavigate } from "react-router-dom";
import { getCities } from "../../axiosCalls";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Hero_Section() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [selectValue, setSelectValue] = useState(1);
  const { handleChangeQuery, query } = useContext(Context);

  const submitHandler = () => {
    let errors = {};
    if (!query) {
      errors["query"] = "Search is required";
    }
    if (Object.keys(errors).length <= 0) {
      navigate("/search", { state: { userType: "" } });
    } else {
      setErrors(errors);
    }
  };

  const handleKeypress = (e) => {
    if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
      console.log("called the submit handler");
      submitHandler();
    }
  };

  const [Allcity, setAllcity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getCities().then((res) => {
        setAllcity(res.data.data);
      });
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div
      className="hero-section section overlay"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="">
        <div className="row ">
          <div className="col-lg-12 hero-right left-side home-left-side">
            <div className="col-md-8">
              <h2 className="heading">
                Discover The Most Reviewed <br /> Massage Parlours
              </h2>

              {/* <div
                class="input-group home-searxh home-page-search"
              // style={{ width: "88%" }}
              > */}
              {/* <select
                name="city"
                onChange={onChange}
                type="search"
                class="formcontrol search-select"
                style={{ width: "100px" }}
              >
                {Allcity.map((city) => {
                  return <option value={city.id}>{city.name}</option>;
                })}
              </select> */}

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
                  value={query}
                  type="search"
                  onChange={handleChangeQuery}
                  name="query"
                  onKeyPress={handleKeypress}
                  required
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
          </div>

          {/* <div className='col-lg-5 hero-right'></div> */}
        </div>
      </div>
    </div>
  );
}
