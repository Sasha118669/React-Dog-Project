import { useState, useEffect } from 'react'
import './App.css'
// import Box from './components/firstComponent/firstComponent'

  function Box({ option, setOption }){
    const [dataBreed, setDataBreed] = useState([]);
    const [error, setError] = useState(null);
    // const [option, setOption] = useState(null);

      useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(data => {
      setDataBreed(Object.keys(data.message))
    })
    .catch(err => {
        console.error(err);
        setError('Error loading data');
      });
  }, []);

    return(
           <div className='leftSideConainer'>
                <img src="https://dog.ceo/img/dog-api-logo.svg" alt="picture" />
                <h1>Dog API</h1>
                <div className='breedList'>
                    <h2>Breed List:</h2>

                    <ul className='breedMenu'>
                      {dataBreed.map((breed) => (
                        <li data-breed={breed} tabIndex="0" key={breed} onClick={(event) => setOption(event.currentTarget.dataset.breed )}>
                          {breed.charAt(0).toUpperCase() + breed.slice(1)}
                          </li>
                        ))}
                      
                    </ul>
                </div>
        </div>
    );
}

export default function App(){
const [imgData, setImgData] = useState(null);
const [error, setError] = useState(null);
const [option, setOption] = useState(null);
// const [dataBreed, setDataBreed] = useState([]);

function fetchImg(e){
  if(!option){
  fetch("https://dog.ceo/api/breeds/image/random")
  .then(response => response.json())
  .then(data => setImgData(data.message))
   .catch(err => {
        console.error(err);
        setError('Error loading data');
      });
  } else{
fetch(`https://dog.ceo/api/breed/${option}/images/random`)
 .then(response => response.json())
  .then(data => setImgData(data.message))
   .catch(err => {
        console.error(err);
        setError('Error loading data');
      });
  }
}

  useEffect(() => {
    fetchImg();
  }, []);

  //   useEffect(() => {
  //   fetch("https://dog.ceo/api/breeds/list/all")
  //   .then(response => response.json())
  //   .then(data => {
  //     setDataBreed(Object.keys(data.message))
  //   })
  //   .catch(err => {
  //       console.error(err);
  //       setError('Error loading data');
  //     });
  // }, []);

  useEffect(() => {
    console.log(option)
  }, [option]);

  return (
    <>
      <Box option={option} setOption={setOption} />
    <div className='container'>
{imgData && (
<div className='dogsImg'>
  <img src={imgData} alt="dog" />
  <button onClick = {fetchImg}>Fetch!</button>
</div>
)}
    </div>
    </>

  );
}
