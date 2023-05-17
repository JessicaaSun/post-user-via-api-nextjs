"use client";
import { Formik, Form, ErrorMessage, Field } from "formik";
import React from "react";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Users() {
  // define validationSchema to define rule and error message
  const validationSchema = Yup.object({
    name: Yup.string().required("Username can not be blank"),
    email: Yup.string().email("Invalid email address"),
    password: Yup.string().min(4, "Must be at least 4 characters long"),
    // description: Yup.string().required("Description can't be empty"),
    // categoryId: Yup.number().positive().integer(),
  });

  const postUser = (user, resetForm) => {
    fetch("https://api.escuelajs.co/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to create user");
        }
      })
      .then((data) => {
        console.log(data);
        resetForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div className="flex w-full h-screen justify-center align-middle items-center flex-row bg-slate-100">
        <div className="w-3/4">
          <img
            alt="img"
            style={{ objectFit: "cover", height: "100vh", width: "100%" }}
            src="https://source.unsplash.com/random?wallpapers"
          />
        </div>
        <div className="w-1/2 mx-20">
          <Typography component="h1" className=" mb-11" variant="h5">
            ADD USER
          </Typography>

          <Formik
            initialValues={{
              email: "",
              name: "",
              password: "",
              role: "admin",
              avatar:
                "https://i.pinimg.com/736x/98/13/cf/9813cfbee4f8b0ec9fb1c787e01d612a.jpg",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                postUser(values, resetForm);
                console.log(values);
                // alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-full">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* <div className="m-5">
                <Field as="select" name="role">
                  <option value="1">Electronic</option>
                  <option value="2">Furniture</option>
                  <option value="3">Other</option>
                </Field>
                <ErrorMessage name="categoryId" />
              </div> */}
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                    className="bg-blue-500"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
