// CalorieInfoComponent.js


import React, { useEffect,useState } from 'react';
import axios from 'axios';
import backgroundImage from '../components/assets/images/img1.jpg';
import styles from "../styles/Home.module.scss"
import Navbar from '../components/navbar';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const Nutrition = () => {


    const [foods, setFoods] = useState(['']); // Initial state with one empty field
    const [resultClicked, setResultClicked] = useState(false); // Track if the "result" button is clicked
    const apiKey = 'ans5iS7g2zl4FUdLVaLs7w==5Pn76PSTA3ijezeU'; // Replace with your actual API key
    const [foodData, setFoodData] = useState([]);
    const [showTableHeader, setShowTableHeader] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState({});

    const [totals, setTotals] = useState({
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
    });

    const calculateTotals = (items) => {
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbohydrates = 0;
        let totalFat = 0;

        items.forEach((item) => {
            totalCalories += item.calories;
            totalProtein += item.protein_g;
            totalCarbohydrates += item.carbohydrates_total_g;
            totalFat += item.fat_total_g;
        });

        setTotals({
            calories: totalCalories.toFixed(2),
            protein: totalProtein.toFixed(2),
            carbohydrates: totalCarbohydrates.toFixed(2),
            fat: totalFat.toFixed(2),
        });
    };

  
    const handleAddFood = () => {
      setFoods([...foods, '']); // Add an empty field when the "+" button is clicked
    };
  
    const handleFoodChange = (index, value) => {
      const updatedFoods = [...foods];
      updatedFoods[index] = value;
      setFoods(updatedFoods);
    };
  
    const foodSentence = ` ${foods.join(', ').replace(/,([^,]*)$/, ' and$1')}`;
  
    const handleResultClick = () => {
      setShowTableHeader(true)
      setResultClicked(true); // Set the flag to indicate that the "result" button is clicked
      setIsLoading(true);

  
      // Make the API call using foodSentence as the query
      axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${foodSentence}`, {
        headers: {
          'X-Api-Key': apiKey,
        },
      })
      .then((response) => {
        setFoodData(response.data.items);
        calculateTotals(response.data.items);
        setIsLoading(false);
    })
    .catch((error) => {
        console.error('Request failed:', error);
        setIsLoading(false);
    });
    };

    const createChartData = () => {
        setChartData({
            labels: ['Total Fat', 'Protein', 'Carbohydrates'],
            datasets: [
                {
                    label: 'Nutrition',
                    data: [ totals.fat, totals.protein, totals.carbohydrates],
                    backgroundColor: [

                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderWidth: 1
                }
            ]
        });
    };

    useEffect(() => {
        createChartData();
    }, [totals]);

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Nutrition Overview',
                font: {
                    size: 18
                }
            }
        }
    };
    const legendItems = [

        { label: 'Total Fat', color: 'rgba(54, 162, 235, 0.6)' },
        { label: 'Protein', color: 'rgba(255, 206, 86, 0.6)' },
        { label: 'Carbohydrates', color: 'rgba(75, 192, 192, 0.6)' }
    ];

  return (
    <div className={styles.wrapper}>
    <div className={styles.wrapper_padding}>
      <Navbar />
    <div
    style={{
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundImage: `url(${backgroundImage})`, // Use the imported image
      backgroundImage: `url("https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`, /* Direct image URL */
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height:'260vh'
    }}



  >
    <h2 style={{ color: '#12328a', fontSize: '28px', marginBottom: '20px' }}>
      What Foods Did You Eat?
    </h2>
    {foods.map((food, index) => (
      <div key={index} style={{ marginBottom: '10px', width: '80%' }}>
        <input
          type="text"
          placeholder="Food name"
          value={food}
          onChange={(e) => handleFoodChange(index, e.target.value)}
          style={{
            width: '40%',
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
    ))}
    <button
      onClick={handleAddFood}
      style={{
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginLeft:';'
      }}
    >
     + Add food
    </button>
    


<div>
    <br />



      <button
      onClick={handleResultClick}
      style={{
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 40px',
        fontSize: '16px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      Get Nutrition Info
    </button>
    {showTableHeader && <h2 style={{ color: '#12328a' }}>Nutrition Result</h2>}

      {showTableHeader && (
        
<table style={{ borderCollapse: 'collapse', width: '100%' }}>
    <thead>
        <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Serving Size</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Calories</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total Fat</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Saturated Fat</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cholesterol</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sodium</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Carbohydrates</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Fiber</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sugar</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Protein</th>
        </tr>
    </thead>
    <tbody>
        {foodData.map((food, index) => (
            <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{food.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{food.serving_size_g}g</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{food.calories}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{food.fat_total_g}g</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{food.fat_saturated_g}g</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{food.cholesterol_mg}mg</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{food.sodium_mg}mg</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{food.carbohydrates_total_g}g</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{food.fiber_g}g</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{food.sugar_g}g</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{food.protein_g}g</td>
            </tr>
        ))}
    </tbody>


                                    <thead>
                                        <tr>

                                            <th style={{ border: '1px solid #ddd', padding: '8px' , color:'red'}}>Total Calories</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totals.calories}</td>

                                        </tr>
                                    </tbody>
                                    
</table>


      )}
    </div>
{showTableHeader && (
    <>
        {/* ... (existing tables) */}

        <div style={{ marginTop: '20px', width: '50%' }}>
            <h2 style={{ color: '#12328a' }}>Nutrition Chart</h2>
            <Pie style={{width:'30%',height:'30px'}} data={chartData}  options={options} />
        </div>
        <div style={{ width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {legendItems.map((item, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <div style={{ backgroundColor: item.color, width: '20px', height: '20px', marginRight: '10px' }}></div>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
    </>
)}




  </div>
  </div>
  </div>

  );
};

export default Nutrition;
