import React, { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom'; // import useLocation
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { NavBarLogo } from "../NavBarLogo/NavBarLogo";
import Swal from "sweetalert2";
import "./Navbar.css";
import { SignUp } from "../../../CreateUsers/SignUp/SignUp";
import { SignIn } from "../../../CreateUsers/SignIn/SignIn";
import { UseAuth } from "../../../../../Hooks/useAuth";
import { UserProfile } from "../../../CreateUsers/UserProfile/UserProfile";
import { SocialLogin } from "../../../CreateUsers/SocialLogin/SocialLogin";

export const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true); // true for Sign Up, false for Sign In

  const { user } = UseAuth();
  const location = useLocation(); // Get current location

  const handleSignUpSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Account Created!",
      text: "Your account has been successfully created.",
      confirmButtonText: "OK",
    }).then(() => {
      setIsModalOpen(false); // Close the modal after success
    });
  };

  // Check if the current path is the Dashboard page
  const isDashboardPage = location.pathname.includes("/dashboard");

  return (
    <div className="shadow-lg">
      {/* Navbar */}
      {!isDashboardPage && ( // Only render the navbar if not on the dashboard page
        <Navbar className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 h-20 text-white shadow-md">
          <NavLink>
            <NavbarContent to={`/`}>
              <NavbarBrand className="flex items-center text-center">
                <NavBarLogo />
                <p className="font-extrabold font1 text-3xl text-white tracking-wide ml-2">
                  PicoWorkers
                </p>
              </NavbarBrand>
            </NavbarContent>
          </NavLink>

          <NavbarContent justify="end" className="space-x-4">
            <NavbarItem>
              {user ? (
                <UserProfile />
              ) : (
                <Button
                  color="gradient"
                  className="bg-gradient-to-r px-8 py-4 from-green-400 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                  onClick={() => {
                    setIsSignUp(true); // Default to Sign Up
                    setIsModalOpen(true);
                  }}
                >
                  Sign Up
                </Button>
              )}
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        backdrop="blur"
      >
        <ModalContent className="max-w-md mx-auto my-auto rounded-lg shadow-lg">
          <ModalHeader className="flex flex-col gap-1 items-center">
            {isSignUp ? (
              <h2 className="text-2xl font-bold text-gray-800">
                Create Your Account
              </h2>
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            )}
          </ModalHeader>
          <ModalBody className="flex flex-col items-center gap-6 px-6 py-1">
            {isSignUp ? (
              <SignUp onSuccess={handleSignUpSuccess} />
            ) : (
              <SignIn onSuccess={handleSignUpSuccess} />
            )}
          </ModalBody>
          <ModalFooter className="flex flex-col gap-3 items-center">
            <Button
              className="w-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "New user? Create an Account"}
            </Button>
            <p className="text-gray-500 text-sm">or</p>
            <SocialLogin onSuccess={handleSignUpSuccess} />
            <Button
              className="w-full border text-red-600 font-semibold hover:text-red-700 transition duration-300"
              variant="light"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
