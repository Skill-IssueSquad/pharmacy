import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./Protected/AuthProvider";
import io from "socket.io-client";
import { Typography, TextField, Button, Paper } from "@mui/material";

const socket = io.connect("http://localhost:8004");
const Chat = () => {
  let show = false;
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const query = new URLSearchParams(location.search);
  const doctorUN = query.get("doctorUN");
  const patientUN = query.get("patientUN");
  // const isDoctor = doctorUN && patientUN;
  //const [isDoctor, setIsDoctor] = useState(false); //localStorage.getItem("role") === "Doctor" ? true : false
  var isDoctor = false;
  const [currentMessage, setCurrentMessage] = useState("");
  var doctorUsername = "";
  var patientUsername = "";
  if (auth() && localStorage.getItem("role") === "Pharmacist") {
    show = true;
    if (localStorage.getItem("role") === "Pharmacist") {
      patientUsername = localStorage.getItem("username");
      doctorUsername = location.state.username;
      console.log("I'm a patient");
      console.log(doctorUsername);
      console.log(patientUsername);
      isDoctor = false;
    }
  } else {
    if (doctorUN && patientUN) {
      console.log("I'm a doctor");
      console.log(doctorUsername);
      console.log(patientUsername);
      show = true;
      doctorUsername = doctorUN;
      patientUsername = patientUN;
      isDoctor = true;
    }
  }
  useEffect(() => {
    const f = async () => {
      await socket.emit("join-room", {
        roomId: doctorUsername + patientUsername,
      });
      await socket.on("receive-message", (data) => {
        console.log("inside receive-message");
        if (
          data.message === null ||
          data.message === undefined ||
          data.message === "" ||
          data.roomId !== doctorUsername + patientUsername
        ) {
          return;
        }
        const sender = isDoctor ? patientUsername : doctorUsername;
        setMessages((prev) => [
          ...prev,
          {
            message: `${sender} : ${data.message} (${data.time})`,

            alignment: "left",
          },
        ]);
      });
    };
    f();
  }, []);
  const handleSendMessage = async () => {
    //event.preventDefault();
    if (
      currentMessage === "" ||
      currentMessage === null ||
      currentMessage === undefined
    ) {
      //alert("Please enter a message");
      return;
    }
    const messageData = {
      message: currentMessage,
      roomId: doctorUsername + patientUsername,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("send-message", messageData);
    setMessages((prev) => [
      ...prev,
      {
        message: `You : ${currentMessage} (${messageData.time})`,
        alignment: "right",
      },
    ]);
    //document.getElementById("message").value = "";
    setCurrentMessage("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div>
      {show ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paper
            style={{
              padding: "20px",
              marginTop: "20px",
              width: "400px",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              EL7A2NI Live Chat
            </Typography>
            <div
              style={{
                width: "100%",
                height: "300px",
                border: "1px solid black",
                overflowY: "auto",
                marginBottom: "10px",
              }}
            >
              {messages.map((message, index) => (
                <div style={{ textAlign: message.alignment }}>
                  <div
                    key={index}
                    style={{
                      padding: "5px",
                      marginBottom: "5px",
                      borderRadius: "5px",
                      backgroundColor:
                        message.alignment === "right" ? "#4caf50" : "#2196f3",
                      color: "#fff",
                      display: "inline-block",
                      maxWidth: "70%",
                    }}
                  >
                    {message.message}
                  </div>
                  <br />
                </div>
              ))}
            </div>
            <TextField
              multiline
              rows={2}
              variant="outlined"
              fullWidth
              placeholder="Type your message..."
              id="message"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Paper>
        </div>
      ) : (
        <h2>No access</h2>
      )}
    </div>
  );
};

export default Chat;
