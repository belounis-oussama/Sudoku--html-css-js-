//this is the time you take to finish the game
const startTiming=10
let time=startTiming*60


const count=document.getElementById("timer")
const timertext=document.getElementById("timertext")
const instructions=document.getElementById("containerins")

//funtion that start the timer countdown
function startTimer(){
  timertext.innerHTML="Timer:    "
  setInterval(updateTimer, 1000)
} 


//funtion that end the game 
function endGame() {

  if (window.confirm('GAME OVER \nWanna play again?'))
{
    // They clicked Yes
    location.reload();  
}
else
{
  location.reload()
}
}


//funtion that update the timer every secounds
//show time in red if the time left is less than 30s
function updateTimer()
{
  const min=Math.floor(time/60)
  let sec=time%60

  sec=sec<10 ?'0' +sec:sec
  count.innerHTML= `${min}:${sec}`
  if(time<=30)
  {
    count.style.color="#9b361d"
  }
  if(time===0)
  {
    //we basically end the game here 
    console.log('finish')
    endGame()
    return
  }
  time--
}

//this function get the data from the json file table and fill in our inputs
function getdata(){
  const tables=fetch('../data.json').then(response=>{
     if(response.ok===true)
     {
       return response.json()
     }
     else{
       
     }
   })
 
 .then(obj=>{
  
   const soduko=obj[0] //0 for the first table in the json table
   const table=soduko.table

   for(let i=0; i<9; i++) //looping lines
   {
     
     for(let j=0;j<9;j++)//looping columns
     {
       const value =table[i][j]
 
       if(value!= null)
       {
 
         const idInput='a'+i+j ;// id a00 ....
         const input=document.getElementById(idInput)
         input.readOnly =true;
 
         //add value to table
         input.value =value
                
       }
       
     }
   }
 
 
 })
  
 
 
 } 
 

 //verify if the value entered is valid and correct
function verify(){

const listeInput = document.querySelectorAll('input')

  //reset the invalid class from errors
  for(const input of listeInput)
  {
    input.classList.remove('error');
     
  }


for (const input of listeInput) {
  const validityInputs = input.checkValidity()
      if (validityInputs === false) {
        return //if validity is false we stop
      }
}

  //get data from all inputs
 
  const mtable=[]

    for(let i=0; i<9; i++) //looping lines
    {
      const mtableLine=[]
      for(let j=0;j<9;j++)//looping columns
      {
        let numbervalue;
        //getting the ids of inputs
        const idInput='a'+i+j ;// id a00 ....
        // console.log(idInput) //test
        const input=document.getElementById(idInput)
        const value=input.value
        
        if(value ==='') //if value is empty
        {
          numbervalue=''
        }
        else{
          numbervalue=parseInt(value,10) //cast to int 
        }
        mtableLine.push(numbervalue) 
      }
        mtable.push(mtableLine)
    }

    //verify the occurance in the the lines
    for(let i=0; i<9; i++) //looping lines
    {
        const mlist=new Set();
      for(let j=0;j<9;j++)//looping columns
      {
        const valueoftable=mtable[i][j]
        if(valueoftable==='')
        {

        }
        else{
          const exsitedValue =mlist.has(valueoftable) //if value already exist
          if(exsitedValue)
          {
           //add red bg and border to show error
           const eroorinput=document.getElementById('a'+i+j)
           eroorinput.classList.add('error') 
          }
          else
          {
            mlist.add(valueoftable)
          }
        }
      }
    }


    //verify the occurance in the the columns
    for(let j=0; j<9; j++) //looping columns
    {
        const mlist=new Set();
      for(let i=0;i<9;i++)//looping columns
      {
        const valueoftable=mtable[i][j]
        if(valueoftable==='')
        {
          //we dont check if there is no data in the input
        }
        else{
          const exsitedValue =mlist.has(valueoftable) //if value already exist
          if(exsitedValue)
          {
           //add red bg and border to show error
           const eroorinput=document.getElementById('a'+i+j)
           eroorinput.classList.add('error')
          }
          else
          {
            mlist.add(valueoftable)
          }
        }
     
      }
    }


    //squares of 3   
    const squares =[
      [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2],
      ],
      [
        [0, 3], [0, 4], [0, 5],
        [1, 3], [1, 4], [1, 5],
        [2, 3], [2, 4], [2, 5],
      ],
      [
        [0, 6], [0, 7], [0, 8],
        [1, 6], [1, 7], [1, 8],
        [2, 6], [2, 7], [2, 8],
      ],
      [
        [3, 0], [3, 1], [3, 2],
        [4, 0], [4, 1], [4, 2],
        [5, 0], [5, 1], [5, 2],
      ],
      [
        [3, 3], [3, 4], [3, 5],
        [4, 3], [4, 4], [4, 5],
        [5, 3], [5, 4], [5, 5],
      ],
      [
        [3, 6], [3, 7], [3, 8],
        [4, 6], [4, 7], [4, 8],
        [5, 6], [5, 7], [5, 8],
      ],
      [
        [6, 0], [6, 1], [6, 2],
        [7, 0], [7, 1], [7, 2],
        [8, 0], [8, 1], [8, 2],
      ],
      [
        [6, 3], [6, 4], [6, 5],
        [7, 3], [7, 4], [7, 5],
        [8, 3], [8, 4], [8, 5],
      ],
      [
        [6, 6], [6, 7], [6, 8],
        [7, 6], [7, 7], [7, 8],
        [8, 6], [8, 7], [8, 8],
      ],
    ]


    //verify the occurance in the the squares of 3 
    //looping all squares
    for(const square of squares)
    {
      const mlist=new Set()
      for(const item of square)
      {
        const i=item[0]
        const j=item[1]

        const valueoftable=mtable[i][j]

        if(valueoftable==='')
        {

        }
        else{
          const exsitedValue =mlist.has(valueoftable) //if value already exist
          if(exsitedValue)
          {
           //add red bg and border to show error
           const eroorinput=document.getElementById('a'+i+j)
           eroorinput.classList.add('error')
          }
          else
          {
            mlist.add(valueoftable)
          }
        }
      }
    }




    let errorfound=false; //we use it to check if y did win

    for(const input of listeInput)
  {
   if(input.classList.contains('error'))
   {
    errorfound= true 
   }
  }

  const inputs = document.querySelectorAll('input')
  let emptyinputs=false;//we use it to check if y did win
    
  for(const input of inputs)
  {
   if(input.value==='')
   {
    
    emptyinputs= true
   }
  }

    //checking for win 
    //the player win if there is no empty inputs and no errors
    if(errorfound===false && emptyinputs===false)
    {
    console.log("YOU WON")
    const listeInput = document.querySelectorAll('input')


  for(const input of listeInput)
  {
    input.classList.add('win'); //make all inputs look green
  if (window.confirm('Congratulations YOU WON YAY! 🏅'))
{
    location.reload(); 
}
    
    
  }
    }
    else{
      console.log(emptyinputs) //test
      console.log(errorfound)//test
    }
   
}


//this function clear all the data filled in the table before
function clearTabledata() {

  const listeInput = document.querySelectorAll('input')
  for(const input of listeInput)
  {
    input.value=''
  }
}


const button = document.getElementById('verifybtn')


button.addEventListener('click', verify)
sodukotable=document.getElementById('suduko')


const buttonstart = document.getElementById('butt')
const buttonend = document.getElementById('buttend')

buttonend.addEventListener('click',
function() {
  clearTabledata()
  location.reload()
  
})


buttonstart.addEventListener('click', getdata)
buttonstart.addEventListener('click', 
    function() {
        sodukotable.style.display = "block";
        button.style.display= "inline-block";
        buttonstart.style.display= "none";
        buttonend.style.display= "inline-block"
        instructions.style.display="none"
        
        startTimer();
    }
);
 