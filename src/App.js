import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages=[
  {src:"/img/helmet-1.png", matched: false},
  {src:"/img/potion-1.png", matched: false},
  {src:"/img/ring-1.png", matched: false},
  {src:"/img/scroll-1.png", matched: false},
  {src:"/img/shield-1.png", matched: false},
  {src:"/img/sword-1.png", matched: false}
]

function App() {

  const [cards, setCards]=useState([])
  const [turn, setTurn]=useState(0)

  //shuffle cards
  const shufffleCards=()=>{
      const shufffledCards=[...cardImages,...cardImages]
      .sort(()=> Math.random()- 0.5)
      .map((card)=> ({...card, id: Math.random()}) )

      setCards(shufffledCards);
      setTurn(0);
      setChoiceOne(null)
      setChoiceTwo(null)
  }

  // handling card choices

  const [choiceOne, setChoiceOne]=useState(null);
  const [choiceTwo, setChoiceTwo]=useState(null);
  const [disabled, setDisabled]=useState(false);

  const handleChoice=(card)=>{
      if(choiceOne===null)
        setChoiceOne(card)
      else
        setChoiceTwo(card)
  }

  const resetTurn=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurn(prevTurn => prevTurn+1 )
    setDisabled(false)
  }

  //to show the cards when the page is firts loaded

  useEffect(()=> shufffleCards(),[])

  //comparing choices 
  useEffect(()=>{
    if(choiceOne && choiceTwo)
    {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src)
      {
        //--------------------------    SYNTAX IS IMPORTANT TRY TO REMEMBER    ----------------------------------

        setCards((prev)=>{    // bcoz we cant directly change cards property as they are state variables
          //also we need prev values of card to be same so we use this syntax. we call fn insite statechange fn

          return prev.map((card)=>{       //we recreate the cards array with matched=true for same pair of cards
            if(card.src === choiceOne.src)   
            {
              return {...card, matched:true}  //...card keeps all other properties same and matched is changed 
            }
            else
            {
              return card
            }
          })
        })
      }
      setTimeout(()=> resetTurn(),1000)  //to stop cards from flipping instantly if they dont match
    }
  },[choiceOne,choiceTwo])

  //console.log(cards)
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shufffleCards} >New Game</button>

      <div className='card-grid' >
        {cards.map((card)=>(
          <SingleCard  
            key={card.id}
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
        ))}
      </div>
      <p>Turns: {turn}</p>
    </div>
  );
}

export default App