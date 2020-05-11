import React, { useState, useContext } from "react";
import {
  Container,
  Input,
  Row,
  Col,
  InputGroupAddon,
  InputGroup,
  Button
} from "reactstrap";
import Axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";
import UserCard from "../components/UserCard";
import Repos from "../components/Repos";
const Home = () => {
  const context = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const fetchDetails = async () => {
    try {
      const { data } = await Axios.get(`https://api.github.com/users/${query}`);
      console.log(data);
      setUser(data);
    } catch (error) {
      toast("Not able to fetch user details", {
        type: "error"
      });
    }
  };
  if (!context.user?.uid) {
    return <Redirect to="/signin" />;
  }
  return (
    <Container>
      <Row className="mt-3">
        <Col md={5}>
          <InputGroup>
            <Input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button color="info" onClick={fetchDetails}>
                FetchUser
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {user ? <UserCard user={user} /> : null}
        </Col>
        <Col md={7}>{user ? <Repos repos_url={user.repos_url} /> : null}</Col>
      </Row>
    </Container>
  );
};

export default Home;
