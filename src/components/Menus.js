import React from "react";
import { Link} from "react-router-dom";
import { ListGroup } from "reactstrap";

const Menus = () => {
    return(
        <ListGroup>
            <Link className="list-group-item list-group-item-action" tag="a" to="/" action>Home</Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="/add-course" action>Add Course</Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="/create-test" action>Crate Quiz</Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="/live-contest" action>Live Contest</Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="#!" action>About</Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="#!" action>Contact</Link>
        </ListGroup>
    );
}

export default Menus;