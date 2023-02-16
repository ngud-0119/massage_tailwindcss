import React, { useState, useEffect } from "react";
import { Timeline, TimelineEvent } from "react-event-timeline";
import { Icon } from "@iconify/react";
import { getRecentActivityUser } from "../../axiosCalls";
import Parser from "html-react-parser";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBTextArea,
  MDBModalBody,
  MDBModalFooter,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import views from "../../assets/views.svg";
import ReactStars from "react-rating-stars-component";

const RecentActivity = () => {
  const [data, setData] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const [recentUserActivity, setRecentUserActivity] = useState([]);
  const givRating = {
    size: 40,
    value: 2.5,
    edit: true,
    isHalf: true,
  };

  const [title, setTitle] = useState("");
  useEffect(() => {
    setTitle("Recent Activity");
    const data = [
      {
        time: "2 hrs ago",
        title: "Your replied to Mike:",
        text: "The Health Point Spa is the best massage center in the town, i really satisfied with all the services which they provide specially there swedish massage is best which make me fully relax.",
        date: "2022-07-15 8:10 PM",
      },

      {
        time: "2 hrs ago",
        title: "Your replied to Mike:",
        text: "The Health Point Spa is the best massage center in the town, i really satisfied with all the services which they provide specially there swedish massage is best which make me fully relax.",
        date: "2022-07-15 8:10 PM",
      },

      {
        time: "2 hrs ago",
        title: "Your replied to Mike:",
        text: "The Health Point Spa is the best massage center in the town, i really satisfied with all the services which they provide specially there swedish massage is best which make me fully relax.",
        date: "2022-07-15 8:10 PM",
      },

      {
        time: "2 hrs ago",
        title: "Your replied to Mike:",
        text: "The Health Point Spa is the best massage center in the town, i really satisfied with all the services which they provide specially there swedish massage is best which make me fully relax.",
        date: "2022-07-15 8:10 PM",
      },

      {
        time: "2 hrs ago",
        title: "Your replied to Mike:",
        text: "The Health Point Spa is the best massage center in the town, i really satisfied with all the services which they provide specially there swedish massage is best which make me fully relax.",
        date: "2022-07-15 8:10 PM",
      },
    ];
    setData(data);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("function get called");
      await getRecentActivityUser().then((res) => {
        console.log(res.data.recent_activity);
        setRecentUserActivity(res.data.recent_activity);
      });
    };

    fetchData().catch(console.error);
  }, []);

  const spaTime = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);

    const result = currentDate.getTime() - postDate.getTime();

    const finalResult = Math.ceil(result / (1000 * 3600 * 24));

    return finalResult;
  };

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }

  console.log(recentUserActivity);
  return (
    <>
      <br />
      <MDBRow className=" discussion-section">
        <MDBCol md={12}>
          <MDBRow
            style={{
              borderRadius: "30px",
              // padding: '0 10% 10% 10%',
              background: "#FFFFFF",
              boxShadow: "2.7px 2.7px 21.6px rgba(200, 23, 93, 0.15)",
            }}
          >
            <MDBCol md={12} style={{ marginBottom: "18px" }}>
              <>
                <MDBRow className="panelHeading">
                  <MDBCol md={12}>{title}</MDBCol>
                </MDBRow>
                <div className="main-recenet-act">
                  {recentUserActivity?.map((currentValue) => {
                    let showrating = {
                      size: 20,
                      value: currentValue.rating,
                      edit: false,
                      isHalf: true,
                    };
                    console.log(currentValue);
                    return (
                      <>
                        <Timeline className="timeline-main">
                          <TimelineEvent
                            className="event-time-line"
                            title={
                              <p
                                style={{ fontWeight: "bold", fontSize: "20px" }}
                              >
                                {"Your " +
                                  currentValue.actiontype +
                                  " to mark:"}
                              </p>
                            }
                            createdAt={formatTime(
                              currentValue.createdAt.substring(11, 16)
                            )}
                            // createdAt={currentValue.createdAt}
                            icon={
                              <Icon
                                className="timeline-dot"
                                icon="carbon:dot-mark"
                              />
                            }
                          >
                            <p
                              style={{
                                fontSize: "20px",
                                marginLeft: "-14px",
                                margnTop: "-100px",
                                marginBottom: "-100px",
                              }}
                            >
                              {currentValue.actiontype === "rating" ? (
                                <>{currentValue.metadata.review}</>
                              ) : (
                                <>{Parser(currentValue.metadata.comment)}</>
                              )}
                            </p>
                          </TimelineEvent>
                        </Timeline>
                      </>
                    );
                  })}
                </div>
              </>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </>
  );
};
export default RecentActivity;
