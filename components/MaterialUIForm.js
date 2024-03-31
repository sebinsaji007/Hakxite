// MaterialUIForm.js
import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, FormGroup, Container, Typography, Grid, IconButton, Select, MenuItem, InputLabel, TextareaAutosize } from '@material-ui/core';
import Navbar from '../components/navbar';

import { useEffect } from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';



const MODEL_NAME = 'gemini-1.0-pro';
const API_KEY = ''; // Replace with your actual API key


const MaterialUIForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: '',
    dietType: '',
    healthHistory: '',
    allergy: '',
    termsChecked: false,
  });
 
  const combinedText = `my age is ${formData.age} ,i am a ${formData.gender} , my weight is ${formData.weight} and my height is ${formData.height} and my activity level is ${formData.activityLevel} and my fitness goal is ${formData.goal} and my type of diet is ${formData.dietType} i have have  health history of ${formData.healthHistory}. now you have to create me a diet plan for a complete week with morning,afternoon and dinner food considering all the details i gave you considering my gender,age,weight,height,activity level,fitness goal and type of diet and make sure you diet plan included foods does not give risk for the mentioned health history problems.increase the calories if mentioned is weight gain ,decrease the calories if mentioned is weight loss, increase the calories and proteins if mentioned is muscle gain.also mention the calories and macros of each food`;
  const [generatedText, setGeneratedText] = useState('');

  //console.log(combinedText);
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };
  
      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        // Add other safety settings as needed
      ];
  
      const parts = [
        { text: combinedText },  // Use combinedText here
      ];
  
      const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
        generationConfig,
        safetySettings,
      });
  
      const response = result.response;
      const generatedText = response.text();
      console.log(generatedText);
      setGeneratedText(generatedText);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };
  const formatGeneratedText = (text) => {
    let formattedText = "";
    let days = text.split("**Day");
    
    days.forEach((day, index) => {
      if (index !== 0) {
        const lines = day.trim().split("\n");
        formattedText += `**Day${lines[0]}\n`;
        lines.slice(1).forEach((line) => {
          formattedText += `* ${line.trim()}\n`;
        });
      }
    });
    
    return formattedText.trim();
  };

  const downloadPDF = () => {
    const element = document.getElementById('dietPlan');
    const opt = {
      margin: 1,
      filename: 'diet_plan.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New promise-based syntax for html2pdf
    html2pdf().from(element).set(opt).save();
  };
  return (
    
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>

      <Typography variant="h5" component="h1" style={{ marginBottom: '24px' }}>
        Fitness Goal Form
      </Typography>
      <form  onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ marginBottom: '16px', borderRadius: '32px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ marginBottom: '16px', borderRadius: '12px' }}
        />
        <Grid container spacing={2} style={{ marginBottom: '16px' }}>
          <Grid item xs={6}>
            <TextField
              label="Age"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              style={{ borderRadius: '12px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '16px', borderRadius: '12px' }}>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginBottom: '16px' }}>
          <Grid item xs={6}>
            <TextField
              label="Weight (kg)"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              style={{ borderRadius: '12px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Height (cm)"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              style={{ borderRadius: '12px' }}
            />
          </Grid>
        </Grid>
        <FormControl variant="outlined" fullWidth margin="normal" style={{ marginBottom: '16px', borderRadius: '12px' }}>
          <InputLabel>Activity Level</InputLabel>
          <Select
            label="Activity Level"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
          >
            <MenuItem value="sedentary">Sedentary</MenuItem>
            <MenuItem value="lightlyActive">Lightly Active</MenuItem>
            <MenuItem value="moderatelyActive">Moderately Active</MenuItem>
            <MenuItem value="veryActive">Very Active</MenuItem>
          </Select>
        </FormControl>

        <FormControl component="fieldset" fullWidth margin="normal" style={{ marginBottom: '16px', borderRadius: '12px' }}>
          <FormLabel component="legend">Goal</FormLabel>
          <RadioGroup
            row
            aria-label="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
          >
            <FormControlLabel value="muscleGain" control={<Radio />} label="Muscle Gain" />
            <FormControlLabel value="weightGain" control={<Radio />} label="Weight Gain" />
            <FormControlLabel value="weightLoss" control={<Radio />} label="Weight Loss" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth margin="normal" style={{ marginBottom: '16px', borderRadius: '12px' }}>
          <FormLabel component="legend">Type of Diet</FormLabel>
          <RadioGroup
            row
            aria-label="dietType"
            name="dietType"
            value={formData.dietType}
            onChange={handleChange}
          >
            <FormControlLabel value="vegetarian" control={<Radio />} label="Vegetarian" />
            <FormControlLabel value="nonVegetarian" control={<Radio />} label="Non Vegetarian" />
          </RadioGroup>
        </FormControl>
        
        <TextareaAutosize
          rowsMin={3}
          placeholder=" Health History and Allergy"
          defaultValue={'None'}
          name="healthHistory"
          value={formData.healthHistory}
          onChange={handleChange}
          style={{ width: '100%', padding: '16px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '12px', resize: 'vertical' }}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '16px', borderRadius: '12px' }}>
          Submit
        </Button>
      </form>
{/* Display the generated text */}
{generatedText && (
        <div style={{ marginTop: '24px', border: '1px solid #ccc', borderRadius: '12px', padding: '16px' }}>
          <Typography variant="h6" component="h2" style={{ marginBottom: '16px' }}>
            Diet plan
          </Typography>
          <Typography variant="body1">
            {formatGeneratedText(generatedText)}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default MaterialUIForm;
