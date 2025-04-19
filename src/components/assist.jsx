import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import "./assist.css"; // Optional for any additional styles

// Court Cases Data
const cases = [
  "Kesavananda Bharati v. State of Kerala",
  "Maneka Gandhi v. Union of India",
  "Vishaka v. State of Rajasthan",
  "S.R. Bommai v. Union of India",
  "ADM Jabalpur v. Shivkant Shukla",
  "Shayara Bano v. Union of India",
  "Justice K.S. Puttaswamy (Retd.) v. Union of India",
  "Aruna Shanbaug v. Union of India",
  "Shreya Singhal v. Union of India",
  "Laxmi v. Union of India",
  "Bhopal Gas Tragedy Case (Union Carbide Corporation v. Union of India)",
  "State of Tamil Nadu v. Suhas Katti",
  "Nirbhaya Case (Mukesh & Anr v. State for NCT of Delhi & Ors)",
  "MC Mehta v. Union of India",
  "Indra Sawhney v. Union of India",
  "Naz Foundation v. Government of NCT of Delhi",
  "Keshav Singh v. State of Rajasthan",
  "Narmada Bachao Andolan v. Union of India",
  "State of West Bengal v. Committee for Protection of Democratic Rights",
  "Bachan Singh v. State of Punjab",
  "R.C. Cooper v. Union of India",
  "People's Union for Civil Liberties v. Union of India",
  "Gian Kaur v. State of Punjab",
  "D.K. Basu v. State of West Bengal",
  "Vineet Narain v. Union of India",
].sort();

// Chat Interface Component
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("lawra-chat-history")) || [];

    if (saved.length > 0) {
      const processed = saved.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(processed);
    } else {
      const welcome = {
        text: "Hello! I am LAWRA, your legal assistant for Indian law information. How can I help you today?",
        user: "bot",
        timestamp: new Date(),
      };
      setMessages([welcome]);
      localStorage.setItem("lawra-chat-history", JSON.stringify([welcome]));
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    if (messages.length > 0) {
      localStorage.setItem("lawra-chat-history", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!question.trim()) return;

    const newUserMessage = {
      text: question,
      user: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);

    try {
      const response = await axios.post("https://lawback-1.onrender.com/query", {
        query: question,
      });

      const botText = response.data.answer.split(". ").join(".\n");
      const botMessage = {
        text: botText,
        user: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        text: "Error fetching response from backend.",
        user: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Error:", err);
    }

    setQuestion("");
    setLoading(false);
  };

  return (
    <Box sx={{ flex: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Legal Assistant Chat
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 2, maxHeight: "60vh", overflowY: "auto", backgroundColor: "#fafafa" }}>
        {messages.map((msg, idx) => (
          <Box key={idx} sx={{ mb: 1, textAlign: msg.user === "user" ? "right" : "left" }}>
            <Typography
              variant="body2"
              sx={{
                backgroundColor: msg.user === "user" ? "#e3f2fd" : "#f1f8e9",
                display: "inline-block",
                px: 2,
                py: 1,
                borderRadius: 2,
                whiteSpace: "pre-wrap",
                maxWidth: "80%",
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>

      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <TextField
          label="Ask your legal question..."
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>

      <Typography variant="body2" sx={{ mt: 2, color: "#777" }}>
        Tip: Copy and paste any case name and search like: <em>ADM Jabalpur v. Shivkant Shukla case materials</em>
      </Typography>
    </Box>
  );
};

// Court Cases Component
const CourtCases = () => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        maxHeight: "80vh",
        p: 3,
        borderLeft: "2px solid #ddd",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Landmark Supreme Court Cases
      </Typography>

      <Grid container spacing={2}>
        {cases.map((courtCase, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                backgroundColor: "#fff",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.03)", boxShadow: "0 6px 12px rgba(0,0,0,0.2)" },
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: "500", color: "#444" }}>
                  {courtCase}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Main App Component
const Complete = () => {
  return (
    <Container maxWidth="lg" sx={{ display: "flex", height: "100vh", py: 4 }}>
      <ChatInterface />
      <CourtCases />
    </Container>
  );
};

export default Complete;
