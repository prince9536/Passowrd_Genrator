const inputslider= document.querySelector("[data-lengthSlider]");
const lengthdisplay = document.querySelector("[data-lengthNumber]");

const passworddisplay = document.querySelector("[data-passwordDisplay");
const copybtn = document.querySelector("[data-copy]");
const copymsg = document.querySelector("[datacopy-msg]");

const uppercasebox= document.querySelector("#uppercase");
const lowercasebox = document.querySelector("#lowercase");
const numbersbox = document.querySelector("#numbers");
const symbolsbox = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const genbtn = document.querySelector(".gen-password");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~!@#$&*(){}[]<>?/+=.:,;';


let password = "";
let passwordlength = 100;
let checkcount = 0;
handleslider();



function handleslider()
{
    inputslider.value = passwordlength;
    lengthdisplay.innerText= passwordlength;
}

//setindicator
function setindicator()
{
  indicator.style.backgroundcolor = color;
  //shadow--home work
}


//for random number ka functiojn subke liye
function getRndInteger(min,max)
{
 return Math.floor(Math.random()*(max-min))+min;

}


//random number ke liye

function genraterandomUpercase()
{
    return String.fromCharCode(getRndInteger(65,91))
   
}



//random uppercase letters ke liye
function genraterandomlowercase()
{
    return String.fromCharCode(getRndInteger(97,122));
}


function genraterandomnumber()
{
      return  getRndInteger(0,9);
}


function genrateSymbols()
{
   const randnum = getRndInteger(0,symbols.length);
   return symbols.charAt(randnum);
}

function calcStrength()
{
    let hasupper = false;
    let haslower = false;
    let hasnum = false;
    let hassym = false;

    if(uppercasebox.checked) hasupper =true;
    if(lowercasebox.checked) haslower= true;
    if(numbersbox.checked) hasnum = true;
    if(symbolsbox.checked) hassym = true;

    if(haslower && hasupper &&(hasnum || hassym) && passwordlength>=8)
    {
        setindicator("#0f0");
    }

    else if(haslower && hasupper &&(hasnum || hassym) && passwordlength>=6)
    {
        setindicator("#ff0");
    }

    else

     setindicator("#f00");
}

async function copycontent()
{  
    try
    {
        await navigator.clipboard.writeText(passworddisplay.value);
        copymsg.innerText = "Copied";  
    }

    catch(e)
    {
        copymsg.innerText = "failed";
    }

    //copy bala text dikhane ke liye
    copymsg.classList.add("active");
   
    setTimeout(() =>
     {
    
          copymsg.classList.remove("active");
    }, 2000);
}
 
inputslider.addEventListener('input',(e) =>
{
    passwordlength= e.target.value;
    handleslider();
})


copybtn.addEventListener('click', ()=>
{
    if(passworddisplay.value)
     copycontent();
})

//check boxes ko handle krne ke liye
function handleCheckboxchange()
{
    checkcount = 0;
    allcheckbox.forEach((checkbox) => 
    {
        if(checkbox.checked)
        checkcount++;

    });
}

  if(passwordlength < checkcount )
  {
    passwordlength = checkcount;
    handleslider();
  }


allcheckbox.forEach((checkbox) =>
{
    checkbox.addEventListener('change', handleCheckboxchange);
})


//for suffle array
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


genbtn.addEventListener('click',()=>
{
    //none of the boxes are selected
    if(checkcount==0)
     return;

    if(passwordlength < checkcount)
    {
        passwordlength = checkcount;
        handleslider();
    }

  


    //Lets start to find new password

    console.log("Genrate password");

    //remove old password
        password = "";

        let funcArr = [];

        if(uppercasebox.checked)
            funcArr.push(genraterandomUpercase);
    
        if(lowercasebox.checked)
            funcArr.push(genraterandomlowercase);
    
        if(numbersbox.checked)
            funcArr.push(genraterandomnumber);
    
        if(symbolsbox.checked)
            funcArr.push(genrateSymbols);
    
        //compulsory addition

        for(let i=0; i<funcArr.length; i++) {
            password += funcArr[i]();
        }

        console.log("COmpulsory adddition done");
    
        //remaining adddition
        for(let i=0; i<passwordlength-funcArr.length; i++) 
        {
            let randIndex = getRndInteger(0 ,funcArr.length);
            console.log("randIndex" + randIndex);
            password += funcArr[randIndex]();
        }

        console.log("Remaining adddition done");
        //shuffle the password

        password = shufflePassword(Array.from(password));
        
        console.log("Shuffling done");
        //show in UI
        passworddisplay.value = password;

        console.log("UI adddition done");
        //calculate strength
        calcStrength();
    });