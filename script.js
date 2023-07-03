const metric = document.querySelector(".metric-round");
const imperial = document.querySelector(".imperial-round");
const selectorMetric = document.querySelector(".inside-metric");
const selectorImperial = document.querySelector(".inside-imperial");
const box_height_metric = document.querySelector(".box-height-metric");
const box_weight_metric = document.querySelector(".box-weight-metric");
const mainTop = document.querySelector(".main-top");
const imperial_1 = document.querySelector(".imperial-1");
const imperial_2 = document.querySelector(".imperial-2");
const imper_1 = document.querySelector(".imper-1");
const imper_2 = document.querySelector(".imper-2");
const curveLeft = document.querySelector(".curve-left");
const curveRight = document.querySelector(".curve-right");
const bmiValue = document.querySelector(".value");
const resultBmi = document.querySelector(".result-right");

const input_cm = document.querySelector(".input-cm");
const input_kg = document.querySelector(".input-kg");
const input_ft = document.querySelector(".input-ft");
const input_in = document.querySelector(".input-in");
const input_st = document.querySelector(".input-st");
const input_lbs = document.querySelector(".input-lbs");

const box_input_unit_ft = document.querySelector(".ft");
const box_input_unit_in = document.querySelector(".in");
const box_input_unit_st = document.querySelector(".st");
const box_input_unit_lbs = document.querySelector(".lbs");

//////////////////////////////////////////////////////////////////////////////////////////


(function() {
   if(window.screen.width < 950){
   curveLeft.style.display = "none";
   curveRight.style.display = "none";
   }
})();



// To check if the content is a number 
const checkContent = (input) => input.value.replace(/\d/g, "").length === input.value.length;

const getResult = function(bmiResult) {
   if(Number(bmiResult) <= 18.5) return "Underweight";
   else if(Number(bmiResult) > 18.5 && Number(bmiResult) <= 24.9) return "Healthy weight";
   else if(Number(bmiResult) > 24.9 && Number(bmiResult) <= 29.9) return "Overweight";
   else return "Obese";
};

const getIdealWeigthCM_KG = function() {

   const bmiBottom = 18.5 * ((Number(input_cm.value) / 100) * (Number(input_cm.value) / 100));
   const bmiTop = 24.9 * ((Number(input_cm.value) / 100) * (Number(input_cm.value) / 100));

   return `<b>${bmiBottom.toFixed(1)}kgs - ${bmiTop.toFixed(1)}kgs</b>`;

};

const getIdealWeigthIN_LBS = function() {

   const bmiBottom = 18.5 * (Number(input_in.value) * Number(input_in.value)) / 703;
   const bmiTop = 24.9 * (Number(input_in.value) * Number(input_in.value)) / 703;

   return `<b>${bmiBottom.toFixed(1)}lbs - ${bmiTop.toFixed(1)}lbs</b>`;

};

const getIdealWeigthFT_ST = function() {

   const bmiBottom = 18.5 * ((Number(input_ft.value) * 30.48 / 100) * (Number(input_ft.value) * 30.48 / 100)) / 6.35;
   const bmiTop = 24.9 * ((Number(input_ft.value) * 30.48 / 100) * (Number(input_ft.value) * 30.48 / 100)) / 6.35;

   return `<b>${bmiBottom.toFixed(1)}st - ${bmiTop.toFixed(1)}st</b>`;

};


const descriptionResult = function(bmi, funcGetIdealWeight) {
   const result = `<p>Your BMI suggests you’re a ${getResult(bmi)}. Your ideal weight is between ${funcGetIdealWeight()}.</p>`;

   return result;
};


const setBmiValues = function (bmi, description) {
   bmiValue.innerHTML = bmi;
   resultBmi.innerHTML = description;
}

///////////////////////////////////////////////////////////////////////////////////////////


metric.addEventListener("click", function(e) {
   e.preventDefault()
 
   if( window.screen.width > 550 && window.screen.width <= 950) mainTop.style.marginTop = "27vw";
   if(window.screen.width > 950) mainTop.style.marginTop = "50px";
 
   let styleMetric = window.getComputedStyle(selectorMetric).opacity;
   
    if(styleMetric === "0"){
       selectorMetric.style.opacity = "1";
       metric.style.backgroundColor = "rgba(52, 95, 246, 0.19)";
       selectorImperial.style.opacity = "0";
       imperial.style.backgroundColor = "rgb(255, 255, 255)";
 
       box_height_metric.style.display= "block";
       box_weight_metric.style.display= "block";
 
       imperial_1.style.display= "none";
       imperial_2.style.display= "none";
       imper_1.style.display= "none";
       imper_2.style.display= "none";
    } 
    
 })
 
 
 imperial.addEventListener("click", function(e) {
   e.preventDefault();
 
   if( window.screen.width > 550 && window.screen.width <= 950) mainTop.style.marginTop = "40vw";
   if(window.screen.width > 950) mainTop.style.marginTop = "150px"
 
   let styleImperial = window.getComputedStyle(selectorImperial).opacity;
   
   if(styleImperial === "0"){
     selectorImperial.style.opacity = "1";
     imperial.style.backgroundColor = "rgba(52, 95, 246, 0.19)";
     selectorMetric.style.opacity = "0";
     metric.style.backgroundColor = "rgb(255, 255, 255)";
 
     
 
     box_height_metric.style.display= "none";
     box_weight_metric.style.display= "none";
 
     imperial_1.style.display= "block";
     imperial_2.style.display= "block";
     imper_1.style.display= "block";
     imper_2.style.display= "block";
  } 
   
 })


 ////////////////////////////////////////////////////////////////////////////////////////////


 console.log(input_cm);

const elementsCM_KG = [input_cm, input_kg];
const elementsIN_LBS = [input_in, input_lbs];
const elementsFT_ST = [input_ft, input_st];




elementsCM_KG.forEach( el => {

   el.addEventListener("input", function(e) {
      e.preventDefault();

      if(!checkContent(input_cm) && !checkContent(input_kg)) {

         let bmi = Number(input_kg.value) / ((Number(input_cm.value) / 100) * (Number(input_cm.value) / 100));
         setBmiValues(bmi.toFixed(1), descriptionResult(bmi, getIdealWeigthCM_KG));  
      }
      
    });
   
});



elementsIN_LBS.forEach(el => {

   el.addEventListener("input", function(e) {
      e.preventDefault();


      if(!checkContent(input_in) && !checkContent(input_lbs) && input_ft.value === "" && input_st.value === "") {

         let bmi = (Number(input_lbs.value) / (Number(input_in.value) * Number(input_in.value))) * 703;
         setBmiValues(bmi.toFixed(1), descriptionResult(bmi, getIdealWeigthIN_LBS));  
      }
      
    });
   
});


elementsFT_ST.forEach(el => {

   el.addEventListener("input", function(e) {
      e.preventDefault();


      if(!checkContent(input_ft) && !checkContent(input_st) && input_in.value === "" && input_lbs.value === "") {

         let bmi = (Number(input_st.value) * 6.35) / ((Number(input_ft.value) * 30.48 / 100) * (Number(input_ft.value) * 30.48 / 100));
         setBmiValues(bmi.toFixed(1), descriptionResult(bmi, getIdealWeigthFT_ST));
         
      }
      
    });
   
});



 elementsIN_LBS.forEach(el => {

   el.addEventListener("click", function(e) {
      e.preventDefault();

      input_ft.value = "";
      input_st.value = "";

      box_input_unit_ft.style.backgroundColor = "rgb(230, 230, 230)";
      box_input_unit_st.style.backgroundColor = "rgb(230, 230, 230)";
      input_ft.style.backgroundColor = "rgb(230, 230, 230)";
      input_st.style.backgroundColor = "rgb(230, 230, 230)";


      box_input_unit_in.style.backgroundColor = "white";
      box_input_unit_lbs.style.backgroundColor = "white";
      input_in.style.backgroundColor = "white";
      input_lbs.style.backgroundColor = "white"; 
    });
   
});



elementsFT_ST.forEach(el => {

   el.addEventListener("click", function(e) {
      e.preventDefault();

      input_in.value = "";
      input_lbs.value = "";

      box_input_unit_in.style.backgroundColor = "rgb(230, 230, 230)";
      box_input_unit_lbs.style.backgroundColor = "rgb(230, 230, 230)";
      input_in.style.backgroundColor = "rgb(230, 230, 230)";
      input_lbs.style.backgroundColor = "rgb(230, 230, 230)";


      box_input_unit_ft.style.backgroundColor = "white";
      box_input_unit_st.style.backgroundColor = "white";
      input_ft.style.backgroundColor = "white";
      input_st.style.backgroundColor = "white"; 
    });
   
});





// function insertHTMLAfterChild(newHTML, parentEl, targetChildEl) {
//    // Create a document fragment
//    var fragment = document.createDocumentFragment();
 
//    // Create a temporary container element
//    var tempContainer = document.createElement('div');
 
//    // Set the new HTML code as the innerHTML of the temporary container element
//    tempContainer.innerHTML = newHTML;
 
//    // Append the child elements to the document fragment
//    while (tempContainer.firstChild) {
//      fragment.appendChild(tempContainer.firstChild);
//    }
 
//    code = fragment;
 
//    // Insert the document fragment after the target child element
//    parentEl.insertBefore(fragment, targetChildEl);
//  }