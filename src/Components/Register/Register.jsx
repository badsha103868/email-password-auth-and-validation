import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

import React, { useState } from "react";

import { auth } from "../../firebase/firebase.init";

import { FaRegEyeSlash } from "react-icons/fa";

import { FaEye } from "react-icons/fa";

import { Link } from "react-router";

const Register = () => {
  // success error
  const [success, setSuccess] = useState(false);

  //  state declare error
  const [error, setError] = useState("");
  // show password state
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    console.log("form submitted", email, password, terms ,name, photo);
  
    // all condition ak sate
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]).{6,}$/;

    // const lengthPattern = /^.{6,}$/;
    // const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    // const specialPattern =/^(?=.*[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]).+$/;

    // 

    //   if(!lengthPattern.test(password)){
    //     console.log('password did not match')
    //     setError("Password must be 6 character or longer")
    //     return
    //   }
     
    //   // case check
    //   else if(!casePattern.test(password)){
    //     setError('password must have at least one upper case and lower case character')
    //     return
    //   }
    //   //  special character check

    //   else if(!specialPattern.test(password)){
    //     setError('Password must contain at least one special character!')
    //     return;
    //   }

    if(!passwordRegex.test(password)){
      setError('Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.')
      return
    }

    // reset status: success or error
    setError("");
    setSuccess(false);

    // terms condition check
    if(!terms){
      setError('Please accept our terms and conditions')
      return
    }

    // email/password auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("after creation a new user", result.user);
        setSuccess(true);
        e.target.reset();


        // update user profile
        const profile = {
          displayName: name,
          photoURL: photo
        }
        updateProfile(result.user, profile)
        .then(()=>{
          
        })
        .catch(error =>{
          console.log(error.message)
        })

        // send email verification
        sendEmailVerification(result.user)
        .then(()=>{
          alert("Please log in to your email and verify your email address")
        })
      })
      .catch((error) => {
        console.log("error happend", error.message);
        setError(error.message);
      });
  };

  // handle show password toggle
  const handleShowPassword = (e)=>{
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                {/*user name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Your Name"
                />
                {/* user photo url */}
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  className="input"
                  placeholder="Photo URl"
                />
                {/* user Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                {/* User password */}
                <label className="label">Password</label>


              <div className="relative ">
                  <input
                  type={showPassword? 'text': "password"}
                  name="password"
                  className="input"
                  placeholder="Password"
                />

                <button onClick={handleShowPassword} className="btn btn-xs top-2 right-5 absolute">{showPassword? <FaRegEyeSlash /> : <FaEye />}</button>
                

              </div>
                <div>
                   <label className="label">
                <input type="checkbox" 
                  name='terms' 
                className="checkbox" />
                Accept our terms and conditions
                </label>
                </div>
                
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>

              {/* error jodi dai sheta form ar nisa dekhate */}
              {success && <p className="text-green-500">Account Created Successfully</p>}

              {error && <p className="text-red-500">{error}</p>}
            </form>
            <p>Already have an account? <Link className="text-blue-500 underline"  to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
