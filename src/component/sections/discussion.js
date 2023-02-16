import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import views from "../../assets/views.svg";
const Section = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    setTitle("Most Recent Discussions");
    const data = [
      {
        text: "I have been a client of Health Point Spa for over one years,enjoying monthly relaxation massages. The staff is alwaysprofessional. The environment is serene and relaxing. A favoriteis therapist come and ask what kind of massage we need.",
        commentCount: 2345,
        threadCount: 633,
        day: 1,
        views: 564,
      },
      {
        text: "I have been a client of Health Point Spa for over one years,enjoying monthly relaxation massages. The staff is alwaysprofessional. The environment is serene and relaxing. A favoriteis therapist come and ask what kind of massage we need.",
        commentCount: 2345,
        threadCount: 633,
        day: 1,
        views: 564,
      },
      {
        text: "I have been a client of Health Point Spa for over one years,enjoying monthly relaxation massages. The staff is alwaysprofessional. The environment is serene and relaxing. A favoriteis therapist come and ask what kind of massage we need.",
        commentCount: 2345,
        threadCount: 633,
        day: 1,
        views: 564,
      },
    ];
    setData(data);
  }, []);
  return (
    <>
      <br />
      <MDBRow className="discussion-section">
        <span className="no-of-views">(72 Views)</span>

        <MDBCol md={12}>
          <MDBRow
            style={{
              borderRadius: "30px",
              // padding: '0 10% 10% 10%',
              background: "#FFFFFF",
              boxShadow: "2.7px 2.7px 21.6px rgba(200, 23, 93, 0.15)",
            }}
          >
            <MDBCol md={12}>
              <>
                <MDBRow className="panelHeading">
                  <MDBCol md={12}>{title}</MDBCol>
                </MDBRow>
                {data.map((currentValue) => (
                  <>
                    <MDBRow style={{ padding: "1.5% 0" }}>
                      <MDBRow>
                        <MDBCol md={8}>{currentValue.text}</MDBCol>
                        <MDBCol md={2} className="right plr-0 ">
                          <p>
                            <b>{currentValue.threadCount} Thread &gt; </b>
                          </p>
                        </MDBCol>
                        <MDBCol md={2} className="right plr-0 ">
                          <p>
                            <b>{currentValue.commentCount} Comments &gt;</b>
                          </p>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow style={{ paddingTop: "1%" }}>
                        <MDBCol md={8} className="daysCount">
                          {currentValue.day} day ago
                        </MDBCol>
                        <MDBCol md={4} className="right ">
                          <div className="viewsCount">
                            <img src={views} alt="eye icon" />
                            &nbsp;
                            {currentValue.views} views
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBRow>
                    <hr />
                  </>
                ))}
                <div>
                  <center>
                    1 &nbsp;&nbsp; 2 &nbsp;&nbsp; 3 &nbsp;&nbsp;&nbsp; Next
                  </center>
                </div>
              </>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </>
  );
};
export default Section;
