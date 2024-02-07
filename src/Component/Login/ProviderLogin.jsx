import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./ProviderLogin.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProviders";
import PhoneAuth from "../PhoneAuth";
import   firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app"
import { onAuthStateChanged } from 'firebase/auth';
const ProviderLogin = () => {
  
const firebaseConfig = {
  apiKey: "AIzaSyC7chfOPb7kE6CjPGKpKcvRE_YnjYK3l5Y",
  authDomain: "neighborserve-c3db4.firebaseapp.com",
  projectId: "neighborserve-c3db4",
  storageBucket: "neighborserve-c3db4.appspot.com",
  messagingSenderId: "534526095463",
  appId: "1:534526095463:web:27b233d3149a387ae7e4c2"
};
firebase.initializeApp(firebaseConfig)  
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    watch,
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const location = useLocation();

  const from = location.state?.form?.pathname || "/";
  const navigate = useNavigate();
  
  const handlePhoneSignIn = () =>{
    useEffect (()=>{
        const unRegisterd = onAuthStateChanged(firebase.auth(),(currentUser)=>{
            console.log(currentUser)
            setPuser(currentUser);
        })
    },[])
}
  const handlesignup = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const today = new Date();
          const currentDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          );
          const saveUser = {
            user_fullname: data.name,
            user_email: data.email,
            user_pass: data.password,
            user_dob: "",
            user_gender: "",
            user_type: "Service Provider",
            user_category: data.category,
            user_status: "Regular",
            user_location: data.area,
            user_lat: "",
            user_lon: "",
            user_phone: data.phone,
            user_regYear: currentDate.toLocaleDateString("en-US"),
            user_hireCount: 0,
            user_verficationStatus: "0%",
            user_serviceDetails: "",
            user_respondTime: 60,
          };
          fetch("http://localhost:5000/users/providersignup", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                const userId = data.insertedId;
                localStorage.setItem("userID", userId);

                reset();
                Swal.fire({
                  position: "middle",
                  icon: "success",
                  title: "Provider created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(from, { replace: true });
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Navbar></Navbar>
      <br /><br /><br />
      <div>
        <form onSubmit={handleSubmit(handlesignup)}>
          <div className="main1">
            <div className="main2">
              <div>
                <p
                  style={{
                    display: "flex",
                    color: "black",
                    justifyContent: "center",
                    marginTop: "30px",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  SERVICE PROVIDER REGISTRATION
                </p>
                <div className="s-underline"></div>
                <div className="service-reg-container">
                  <div className="reg-form">
                    <div className="service-reg-label">Full Name</div>
                    <input
                      type="text"
                      {...register("name")}
                      name="name"
                      placeholder="Enter your Full Name"
                      className="service-reg-field"
                    />
                    {errors.name && (
                      <span className="text-red-600">Name is required</span>
                    )}

                    <div className="service-reg-label">Email</div>
                    <input
                      type="text"
                      {...register("email")}
                      name="email"
                      placeholder="Enter your Email Address"
                      className="service-reg-field"
                    />
                    {errors.email && (
                      <span className="text-red-600">Email is required</span>
                    )}

                    <div className="service-reg-label">
                      Position you are applying for
                    </div>
                    <select
                      {...register("category", {
                        validate: (value) => value !== "0",
                      })}
                      className="service-reg-field"
                    >
                      <option value="">Choose option</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Plumber">Plumber</option>
                      <option value="Cleaner">Cleaner</option>
                      <option value="Painter">Painter</option>
                      <option value="Pest Service">Pest Service</option>
                      <option value="Mover">Mover</option>
                      <option value="HVAC Service">HVAC Service</option>
                      <option value="Gas Stove Service">Gas Stove Service</option>
                      <option value="Wall Repairs">Wall Repairs</option>
                      <option value="Computer Service">Computer Service</option>
                      <option value="Carpenter">Carpenter</option>
                      <option value="Car Wash">Car Wash</option>
                    </select>
                  </div>

                  <div className="additional-service-reg-container">
                    <div className="service-reg-label">Phone Number</div>
                    <input
                      type="text"
                      {...register("phone")}
                      name="phone"
                      placeholder="Enter your phone number"
                      className="service-reg-field"
                    />
                    {errors.phone && (
                      <span className="text-red-600">Email is required</span>
                    )}

                    <div className="service-reg-label">Area</div>
                    <select
                      {...register("area", {
                        validate: (value) => value !== "0",
                      })}
                      className="service-reg-field"
                    >
                      <option value="">Select</option>
                      <option value="Badda">Badda</option>
                      <option value="Gulshan">Gulshan</option>
                      <option value="Banani">Banani</option>
                      <option value="Mirpur">Mirpur</option>
                      <option value="Dhanmondi">Dhanmondi</option>
                      <option value="Uttora">Uttora</option>
                      <option value="Baridhara">Baridhara</option>
                      <option value="Bashundhora">Bashundhora</option>
                    </select>

                    <div className="service-reg-label">Password</div>
                    <input
                      type="password"
                      id="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                      })}
                      placeholder="password"
                      className="reg-field"
                    />
                    {errors.password?.type === "required" && (
                      <p className="text-red-600">Password is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="text-red-600">
                        Password must be 6 characters
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="text-red-600">
                        Password must have one Uppercase and one special
                        character.
                      </p>
                    )}
                  </div>
                </div>

                <button
                  className="service-reg-btn"
                  style={{
                    display: "flex",
                    marginLeft: "auto",
                    marginRight: "auto",
                    justifyContent: "center",
                    marginTop: "20px",
                    width: "30%",
                    padding: "10px",
                    border: "1px",
                    borderRadius: "10px",
                    backgroundColor: "#4C40ED",
                    color: "white",
                  }}
                >
                  Sign Up
                </button>
               
              </div>
            </div>

            <div className="main3">
              <div>
                <p
                  style={{
                    display: "flex",
                    color: "white",
                    justifyContent: "center",
                    marginTop: "30px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                 LogIn With Phone Number
                </p>

                {/* <button
                  className="service-signin-btn"
                  style={{
                    display: "flex",
                    marginLeft: "auto",
                    marginRight: "auto",
                    justifyContent: "center",
                    marginTop: "20px",
                    width: "30%",
                    padding: "10px",
                    border: "1px",
                    borderRadius: "10px",
                    backgroundColor: "white",
                    color: "#570DF8",
                  }}
                >
                  Sign In
                </button> */}
                 <PhoneAuth auth={firebase.auth()}></PhoneAuth>
              </div>
            </div>
          </div>
        </form>
      </div> <br /><br />
      <Footer></Footer>
    </>
  );
};

export default ProviderLogin;
