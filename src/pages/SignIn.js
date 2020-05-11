import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  Button,
  CardBody,
  FormGroup,
  Input,
  Label,
  Form
} from "reactstrap";
import { UserContext } from "../context/UserContext";
import firebase from "firebase/app";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
const SignIn = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        context.setUser({ email: res.user.email, uid: res.user.uid });
      })
      .catch(error => {
        console.log(error);
        toast(error.message, {
          type: "error"
        });
      });
  };
  const handleSubmit = e => {
    e.preventDefault();
    handleSignIn();
  };
  if (context.user?.uid) {
    return <Redirect to="/" />;
  }
  return (
    <Container className="text-center">
      <Row>
        <Col md={6} className="offset-md-3 mt-5">
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardHeader>SignIn Here</CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for="email" sm={3}>
                    Email
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm={3}>
                    Password
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button color="info" block>
                  SignIn
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
