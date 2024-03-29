// GenerativeAIComponent.js

import { useEffect } from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import MaterialUIForm from '../components/MaterialUIForm';
import styles from "../styles/Home.module.scss"
import Navbar from '../components/navbar';


const MODEL_NAME = 'gemini-1.0-pro';
const API_KEY = 'AIzaSyB6_KTRV8d3jAd9-iMhiuBCsBM9ej-Cgtk'; // Replace with your actual API key

const GenerativeAIComponent = () => {

  useEffect(() => {
    const run = async () => {
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
        { text: 'input: tell me what is 4+4' },
        { text: 'output: answer is 8' },
        { text: 'input: what is 5+9' },
        { text: 'output: ' },
      ];

      const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
        generationConfig,
        safetySettings,
      });

      const response = result.response;
      console.log(response.text());
    };

    run();
  }, []);

  return(
    <div className={styles.wrapper}>
        <div className={styles.wrapper_padding}>
          <Navbar />
<div style={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  height: '150vh', 
  backgroundImage: `url("https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`, /* Direct image URL */
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
}}>
  <MaterialUIForm />
</div>
</div>
</div>

  )
};

export default GenerativeAIComponent;
