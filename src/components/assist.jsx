// import React, { useState } from 'react';
// import './assist.css'; // Import the CSS file for styling
// import axios from 'axios';

// const ChatInterface = () => {
//     const [question, setQuestion] = useState('');
//     const [answer, setAnswer] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await axios.post('https://9ec3-35-230-102-62.ngrok-free.app/query', {//change link here
//                 query: question
//             });

//             // Split response into sentences and join with new lines
//             const formattedAnswer = response.data.answer.split('. ').join('.\n');
//             setAnswer(formattedAnswer);
//         } catch (err) {
//             setError('Error fetching response from backend.');
//             console.error('Error:', err);
//         }

//         setLoading(false);
//         setQuestion('');
//     };

//     return (
//         <div className="chat-interface">
//             <div className="chat-container">
//                 <div className="chat-box">
//                     <form onSubmit={handleSubmit} className="form">
//                         <textarea
//                             className="question-input"
//                             placeholder="Ask your question here..."
//                             value={question}
//                             onChange={(e) => setQuestion(e.target.value)}
//                             required
//                         />
//                         <button type="submit" className="submit-button" disabled={loading}>
//                             {loading ? 'Loading...' : 'Submit'}
//                         </button>
//                     </form>
//                 </div>
                
//                 <div className="response-box">
//                     <div className="response-container">
//                         {error && <div className="error-message">{error}</div>}
//                         {answer && (
//                             <>
//                                 <div className="response-header">Response:</div>
//                                 <div className="response-text" style={{ whiteSpace: 'pre-wrap' }}>{answer}</div>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatInterface;

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
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("https://lawback-1.onrender.com/query", {
        query: question,
      });

      // Split response into sentences and format for readability
      const formattedAnswer = response.data.answer.split(". ").join(".\n");
      setAnswer(formattedAnswer);
    } catch (err) {
      setError("Error fetching response from backend.");
      console.error("Error:", err);
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <Box sx={{ flex: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Legal Assistant Chat
      </Typography>

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
      <div>
        <p>Copy and paste any case name beside and search as : ADM Jabalpur v. Shivkant Shukla case materials</p>
      </div>

      <div className="response-box">
        <div className="response-container">
          {error && <Typography color="error">{error}</Typography>}
          {answer && (
            <>
              <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
                Response:
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {answer}
              </Typography>
            </>
          )}
        </div>
      </div>
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
const App = () => {
  return (
    <Container maxWidth="lg" sx={{ display: "flex", height: "100vh", py: 4 }}>
      <ChatInterface />
      <CourtCases />
    </Container>
  );
};

export default App;

