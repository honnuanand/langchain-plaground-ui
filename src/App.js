import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const App = () => {
  const [request, setRequest] = useState({ input_language: '', output_language: '', text: '' });
  const [response, setResponse] = useState('');
  const [results, setResults] = useState('');

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const callApi = () => {
    axios.post('http://127.0.0.1:8000/translate', request)
      .then((res) => {
        setResponse(res.data.translated_text);
        setResults(prevResults => `${prevResults}\nRequest: ${JSON.stringify(request, null, 2)}\nResponse: ${JSON.stringify(res.data, null, 2)}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Grid container spacing={2} paddingTop={5} paddingLeft={10}>
      <Typography variant="h3" align="center">Translation App that Uses LangChain and</Typography>
      <Grid item xs={12}>
        <TextField
          label="Input Language"
          variant="outlined"
          fullWidth
          name="input_language"
          value={request.input_language}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Output Language"
          variant="outlined"
          fullWidth
          name="output_language"
          value={request.output_language}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Text"
          variant="outlined"
          fullWidth
          name="text"
          value={request.text}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={callApi}>
          Translate
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Translated Text"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={response}
          readOnly
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Results"
          variant="outlined"
          fullWidth
          multiline
          rows={8}
          value={results}
          readOnly
        />
      </Grid>
    </Grid>
  );
};

export default App;
