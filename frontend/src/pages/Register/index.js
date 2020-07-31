import React, { useState } from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

export default function Register({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const response = await api.post("/user/register", {
      email,
      password,
      firstName,
      lastName,
    });
    const userId = response.data._id || false;

    if (userId) {
      localStorage.setItem("user", userId);
      history.push("/dashboard");
    } else {
      const { message } = response.data;
      console.log(message);
    }
  };

  return (
    <Container>
      <h2>Register:</h2>
      <p>
        Please <strong>Register</strong> for a new account
      </p>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="firstName" className="mr-sm-2">
            First Name
          </Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Your first name..."
            onChange={(evt) => setFirstName(evt.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="lastName" className="mr-sm-2">
            Last Name
          </Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Your last name..."
            onChange={(evt) => setLastName(evt.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="email" className="mr-sm-2">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Your email..."
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="password" className="mr-sm-2">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="You password..."
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}
