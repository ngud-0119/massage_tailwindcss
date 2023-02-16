import React, { useEffect } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
// import { TokenVerify } from '../../axiosCalls';
// import { useNavigate } from 'react-router-dom';

export default function Layout(props) {
  const { childCom } = props;

  // const navigate = useNavigate();
  // useEffect(() => {

  //   const fetchData = async () => {
  //   const newtoken = localStorage.getItem('token');

  //       await TokenVerify(newtoken).then((res)=>{

  //         if(!res.data.success){
  //             navigate('/')
  //           localStorage.removeItem('userSignupEmail')
  //         }else{
  //           localStorage.setItem('userSignupEmail',res.data.data.email)

  //         }
  //       })

  //   }

  //     fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);;

  //   })

  return (
    <div className="baseClass">
      <Header />

      {childCom}
      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
    </div>
  );
}
