import React, { useState } from "react";
import { Container, Grid, Card, CardContent, Typography, TextField, Button, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import "./assist.css"; // Import CSS for chat styling

// **Court Cases Data**
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

// **Chat Interface Component**
const ChatInterface = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!question.trim()) return;

    setAnswer('');
    setError(null);
    setLoading(true);

    try {
      const result = await axios.post(
        'http://127.0.0.1:8000/query',
        { query: question },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      console.log("Response from backend:", result.data);
      
      // Check response structure and extract answer
      if (result.data) {
        // If result.data itself is the answer (string)
        if (typeof result.data === 'string') {
          setAnswer(result.data);
        } 
        // If result.data.answer exists
        else if (result.data.answer) {
          setAnswer(result.data.answer);
        }
        // If result.data.response exists (common alternative name)
        else if (result.data.response) {
          setAnswer(result.data.response);
        }
        // If result.data has some other structure, convert to string
        else {
          setAnswer(JSON.stringify(result.data, null, 2));
        }
      } else {
        setError("Received an empty response from the server");
      }
    } catch (err) {
      console.error("Error:", err.response || err);
      setError("Error fetching response from backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flex: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Legal Assistant Q&A
      </Typography>

      <Box
        sx={{
          minHeight: '200px',
          mb: 2,
          p: 2,
          bgcolor: '#f5f5f5',
          borderRadius: 1,
          boxShadow: 1,
          overflowY: 'auto'
        }}
      >
        {question && (
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Q: {question}
          </Typography>
        )}
        {loading ? (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        ) : (
          answer && (
            <Typography 
              variant="body1" 
              sx={{ 
                whiteSpace: 'pre-wrap',
                maxHeight: '300px', // Set a maximum height
                overflowY: 'auto',  // Add vertical scrollbar when needed
                padding: '10px',    // Add some padding
                border: '1px solid #e0e0e0', // Optional: adds a subtle border
                borderRadius: '4px', // Optional: rounds corners
                backgroundColor: '#ffffff', // Optional: white background for contrast
              }}
            >
              A: {answer}
            </Typography>
          )
        )}
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Ask your legal question..."
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          disabled={loading}
          sx={{ mb: 2 }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          disabled={loading || !question.trim()}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};


// **Court Cases Component**
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

// **Main App Component**
const Bot = () => {
  return (
    <Container maxWidth="lg" sx={{ display: "flex", height: "100vh", py: 4 }}>
      <ChatInterface />
      <CourtCases />
    </Container>
  );
};

export default Bot;

