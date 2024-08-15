import React from "react";
import axios from "axios";

class Apis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      ctName: "",
      ctPhoneno: "",
      ctEmail: "",
      statusMsg: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/Apis")
      .then((res) => this.setState({ contacts: res.data }))
      .catch((err) => console.log("Error fetching contacts:", err));
  }

  handleChange = (e, keyWord) => {
    this.setState({
      [keyWord]: e.target.value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { ctName, ctPhoneno, ctEmail } = this.state;
    axios
      .post("http://localhost:3000/Apis", {
        cname: this.state.ctName,
        cemail: this.state.ctEmail,
        cno: this.state.ctPhoneno,
      })
      .then(() => {
        this.setState({ statusMsg: "User created successfully" });
        axios
          .get("http://localhost:3000/Apis")
          .then(({ data }) => this.setState({ contacts: data }))
          .catch((err) => console.log("Error fetching contacts:", err));
      })
      .catch((err) =>
        this.setState({ statusMsg: "Creation unsuccessful, please try again" })
      );
  };
  handleDel = (id) => {
    axios
      .delete(`http://localhost:3000/Apis/${id}`)
      .then(() => {
        this.setState((prevState) => ({
          contacts: prevState.contacts.filter((contact) => contact.id !== id),
          statusMsg: "Contact deleted successfully",
        }));
      })
      .catch((err) => {
        this.setState({ statusMsg: "Error deleting contact" });
        console.log("Error deleting contact:", err);
      });
  };  
  render() {
    const { contacts, statusMsg, ctName, ctPhoneno, ctEmail } = this.state;
    return (
      <>
        <h1>Contact List</h1>
        <form>
          Name:
          <input
            type="text"
            value={ctName}
            placeholder="Enter your Name"
            onChange={(e) => this.handleChange(e, "ctName")}
          />
          Phoneno:
          <input
            type="number"
            value={ctPhoneno}
            placeholder="Enter your phone"
            onChange={(e) => this.handleChange(e, "ctPhoneno")}
          />
          Email:
          <input
            type="email"
            value={ctEmail}
            placeholder="Enter your Email"
            onChange={(e) => this.handleChange(e, "ctEmail")}
          />
          <button type="button" onClick={(e)=>this.handleClick(e)}>
            Click
          </button>
        </form>
        <p>{statusMsg}</p>
        {contacts.map((contact) => (
          <div key={contact.id}>
           <h2>Name: {contact.cname}</h2>
            <p>Phone: {contact.cno}</p>
            <p>Email: {contact.cemail}</p>
            <button type="button" onClick={() => this.handleDel(contact.id)}>Del</button>
            <br />
            <hr />
          </div>
        ))}
      </>
    );
  }
}

export default Apis;
