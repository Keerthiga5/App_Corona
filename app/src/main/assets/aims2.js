var questions = [{
                    question: "Please select your eligibility !",
                    choices: ["Asymptomatic healthcare workers (involved in care of suspected or confirmed cases of COVID-19).", "Asymptomatic household contact (of laboratory confirmed cases).","Known case of Retinal Problems", "History of allergy to Chloroquine/ Hydroxy-choloroquine, 4-Aminoquinolone compounds","Age < 15 years", "None of the above"],
                    riskfactor: [1, 2, 3, 4, 5]
                }];

var workerType = {
    question: "Please select any one of the category below !",
    choices: ["Doctor [Registered Medical Practitioner]", "Other Health Care Workers [Nurse, Paramedical Workers, etc]"]
};

var checkBoxValues = {
                        question: "Please select the risk factors that are applicable for you!",
                        choices: ["Age >= 68 years", "Female Gender", "Loop diuretic ( Ethacrynic acid, Furosemide, Bumetanide, Torasemide,Azosemide)", "Serum Potassium+ <=3.5 mEq/L", "Admission QTc >=450 ms", "Acute Myocardial Infarction", ">=2 QTc-prolonging drugs", "sepsis", "Heart failure", "One QTc-prolonging drug"],
                        riskfactor: [1, 1, 1, 2, 2, 2, 3, 3, 3, 3]
                      };

var questionCounter = 0; //Tracks question number
var selections = []; //Array containing user choices
var quiz = document.getElementById('quiz');
var global_choice = 10;
var global_risk=0;

function createQuestionElement(quesAndAns) {
    var qElement = document.createElement('div');
    qElement.id = 'content';
    qElement.innerText = quesAndAns.question;
    var radioButtons = createRadios(quesAndAns);
    qElement.appendChild(radioButtons);
    qElement.appendChild(document.createElement('br'));
    return qElement;
}

// Creates a list of the answer choices as radio inputs
function createRadios(quesAndAns) {
    var radioList = document.createElement('div');
    for (var i = 0; i < quesAndAns.choices.length; i++) {
        radioList.appendChild(document.createElement('br'));
        var inputObj = document.createElement('div');
        inputObj.innerHTML = '<input type = "radio" name= "answer" value='+i+'></input>'+quesAndAns.choices[i];
        radioList.appendChild(inputObj);
    }
    return radioList;
}

// initial function that creates the first page
function displayinitial(){
      flushDivs();
      quiz.append(createQuestionElement(questions[0]));
      document.getElementById("container").style.backgroundImage = 'none';
      document.getElementById("container").style.backgroundColor = 'white';
      var btn = document.createElement('div');
      btn.id = "btn";
      btn.innerHTML = createButton('Next','initialNext','levelTwo');
      quiz.appendChild(btn);
}
// creates a button with the give params
function createButton(name,btnID,func){
  var btn = '<button type="button" onclick="'+func+'()" id="'+btnID+'">'+name+'</button>';
  return btn;
}


// checks the selection in first page and then creates the next page element
function levelTwo(){
     var choice;
     var choiceBoxes = document.getElementsByName('answer');
     for(i=0;i<choiceBoxes.length;i++){
         if(choiceBoxes[i].checked){
             choice = choiceBoxes[i].value;
         }
     }
     if (isNaN(choice)){
         alert("please select a val");
     }
     else{
          if (choice  == 0 || choice == 1)
          {
              createRiskCheckBox();
          }
          else if (choice == 2 || choice == 3 || choice == 4) {
              choiceThree();
          }
          else if (choice == 5) {
              choiceFour();
          }
          global_choice = choice;
     }
}

// creates the risk box in level2
function createRiskCheckBox(){
    flushDivs();
    var content = document.createElement('div');
    content.id = 'content';
    var quesAndAns = checkBoxValues;
    content.innerHTML = '<p><u>Cardiac Risk Assessment<u></p>'+'<br>'+
                        '<p>'+quesAndAns.question+'</p>'+'<br>';
    for(var i=0; i < quesAndAns.choices.length;i++){
        var innerDiv = document.createElement('div');
        innerDiv.innerHTML = '<input type="checkbox" name="riskCheckBox" value="'+ quesAndAns.riskfactor[i]+'">'+quesAndAns.choices[i]+'<br>';
        content.appendChild(innerDiv);
    }
   content.append(document.createElement('br'));
    quiz.appendChild(content);
    var btn = document.createElement('div');
    btn.id = "btn";
    btn.innerHTML = createButton('Back','checkBoxBack','displayinitial') + createButton('Next', 'riskNext', 'calculateRisk');
    quiz.appendChild(btn);
    var content1 = document.createElement('div');
    content1.id = 'content1';
    quiz.append(document.createElement('br'));
    content1.innerHTML = '<p>Precautions in :</p><ul><li>Known Glucose 6 phosphate dehydrogenase deficiency (G6PD)</li><li>Myasthesnia gravis</li><li>Uncontrolled diabetes</li><li>Porphyria(blood related disorders)</li><li>Epilepsy</li></ul>';
    quiz.appendChild(content1);
}

// calculates risk and gives the result page of risk
function calculateRisk(){
    global_risk = 0;
    var risk = 0;
    var choice;
    var choiceBoxes = document.getElementsByName('riskCheckBox');
    for(i=0;i<choiceBoxes.length;i++){
        if(choiceBoxes[i].checked){
            choice = choiceBoxes[i].value;
            console.log(choice);
            risk = risk + parseInt(choice);
        }
    }
    window.alert(risk);
    flushDivs();
    var content = document.createElement('div');
    content.id = 'content';
    content.innerHTML = '<p>Your risk is : '+risk+' / 21.</p>';
    var result = document.createElement('div');
    if(risk<=6){
        result.innerHTML = '<p>you are in low risk.</p>';
        global_risk = 1;
    }
    else if(risk>6 && risk < 11){
        result.innerHTML = '<p>you are in medium risk.</p>';
        global_risk = 2;
    }
    else if(risk>=11 && risk < 22){
        result.innerHTML = '<p>you are in high risk.</p>';
        global_risk = 3;
    }
    content.appendChild(result);
    var table = document.createElement('div');
    table.style = "overflow-x:auto;";
    table.innerHTML = '<table><tr><th colspan="2">Interpretation</th></tr><tr><td>Low Risk*</td><td>&lt;= 6 risk factor</td></tr><tr><td>Medium Risk</td><td>7-10 risk factor</td></tr><tr><td>High Risk</td><td>&gt; 11 risk factor</td></tr></table>'+'<br>';
    content.appendChild(table);
    var exclusionPara = document.createElement('div');
    exclusionPara.innerHTML = '<p id="highText">* - Excluding QTc prolonging drugs intake.</p>';
    var moreRef = document.createElement('div');
    moreRef.innerHTML = '<a href="#" target="" onclick="qtcTable()">To know more about QTc drugs ...</a>';
    content.append(exclusionPara);
    content.append(moreRef);
    quiz.appendChild(content);
    var btn = document.createElement('div');
    btn.id = "btn";
    btn.innerHTML = createButton('Next','riskNext','getWorkerType');
    quiz.appendChild(btn);
}

function qtcTable(){
    flushDivs();
    var content = document.createElement('div');
    content.id = 'content';
    content.innerHTML = '<p>DRUGS CAUSING QTc PROLONGATION</p>';
    var table = document.createElement('div');
    table.style = "overflow-x:auto;";
    table.innerHTML = '<table><tr><td>Antiarrhythmics</td><td id="left"><ul><li> Quinidine</li> <li>Procainamide</li> <li>Disopyramide</li> <li>Dofetilide</li> <li>Ibutilide</li> <li>Sotolol</li> <li>Dronedarone</li> <li>Quinidine</li> </ul></td></tr><tr><td>Antihistamines</td><td id="left"><ul><li>Terfenadine</li> <li>Astemizole</li></ul></td></tr><tr><td>Antipsychotics</td><td id="left"><ul><li>Chlorpromazine</li><li>Haloperiodol</li><li>Thioridazine</li><li>Ziprasidone</li><li>Riseperidone</li> </ul></td></tr><tr><td>Antidepressants</td><td id="left"><ul><li>Amitriptyline</li> <li>Despramine</li><li>Imipramine</li><li>Sertraline</li><li>Fluoxetine</li> </ul></td></tr><tr><td>Antibiotics</td><td id="left"><ul><li>Levofloxacin</li><li>Moxifloxacin</li><li>Erythromycin</li><li>Clarithromycin</li><li>Azithromycin</li> </ul></td></tr><tr><td>Antiemetics</td><td id="left"><ul><li>Ondensetron</li></ul></td></tr><tr><td>Diuertics</td><td id="left"><ul><li>All loop diuretics</li></ul></td></tr><tr><td>Antifungals</td><td id="left"><ul><li>Flucanazole</li></ul></td></tr></table>'+'<br>';
    content.appendChild(table);
    quiz.appendChild(content);
    var btn = document.createElement('div');
    btn.id = "btn";
    btn.innerHTML = createButton('Next','riskNext','getWorkerType');
    quiz.appendChild(btn);
}

function getWorkerType()
{
    flushDivs();
    window.alert(global_risk);
    quiz.appendChild(createQuestionElement(workerType));
    var btn = document.createElement('div');
    btn.id = "btn";
    btn.innerHTML = createButton('Next','workerTypeNext','solutionForRisk');
    quiz.appendChild(btn);
}

function solutionForRisk(){
    var choice;
    var choiceBoxes = document.getElementsByName('answer');
    for(i=0;i<choiceBoxes.length;i++){
        if(choiceBoxes[i].checked){
            choice = choiceBoxes[i].value;
        }
    }
    if (isNaN(choice)){
        alert("please select a val");
    }
    else{
        flushDivs();
        var content = document.createElement('div');
        content.id = 'content';
        var table = document.createElement('div');
        table.style = "overflow-x:auto;";
        if(choice == 0)
        {
            if(global_risk == 1){
                content.innerHTML = '<p>You are eligible to take the drug</p><p>Please follow the following prescriptions!</p>';
            }
            else if(global_risk == 2){
                content.innerHTML = '<p id="highText">You should undergo preliminary investigations such as </p><ul id="highText"><li>ECG.</li><li>Blood Glucose.</li><li>Serum Potassium.</li></ul><p id="highText">You can then follow with the prescribed dosage.</p>';
            }
            else if(global_risk == 3){
                content.innerHTML = '<p id="highText">You should undergo preliminary investigations such as </p><ul id="highText"><li>ECG.</li><li>Blood Glucose.</li><li>Serum Potassium.</li></ul><p id="highText">You can then follow with the prescribed dosage.</p>';
            }
            else{
                content.innerHTML = '<p>Please try again once</p>';
            }
            table.innerHTML = '<table><tr><th>Day</th><th>Drug</th><th>Dosage</th><th>Frequency</th><th>Relationship with meal</th></tr><tr><td>1<sup>st</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning, Night</td><td>With meal</td></tr><tr><td>8<sup>th</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning</td><td>With meal</td></tr><tr><td>15<sup>th</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning</td><td>With meal</td></tr><tr><td>22<sup>nd</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning</td><td>With meal</td></tr><tr><td>29<sup>th</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning</td><td>With meal</td></tr><tr><td>36<sup>th</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning</td><td>With meal</td></tr><tr><td>43<sup>rd</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning</td><td>With meal</td></tr><tr><td>50<sup>th</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning</td><td>With meal</td></tr><tr><td>57<sup>th</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning</td><td>With meal</td></tr></table>'+'<br>';
        }
        else if(choice ==1){
            if(global_risk == 1){
                content.innerHTML = '<p id="highText">You are eligible to take the drug.</p><p id="highText">Please consider a Registered Medical Practitioner.</p><p id="highText"> You can then follow prescribed dosage levels.</p>';
            }
            else if(global_risk == 2){
                content.innerHTML = '<p id="highText">Please check with a Registered Medical Practitioner.</p><p id="highText"> You should definitely undergo preliminary investigations such as </p><ul id="highText"><li>ECG.</li> <li>Blood Glucose</li> <li>Serum Potassium</li> </ul><p id="highText">before starting the desired dosage</p> <p id="highText">You can then follow Prescribed the dosage levels</p>';
            }
            else if(global_risk == 3){
                content.innerHTML = '<p id="highText">Please check with a Registered Medical Practitioner.</p><p id="highText"> You should definitely undergo preliminary investigations such as </p><ul id="highText"><li>ECG.</li> <li>Blood Glucose</li> <li>Serum Potassium</li> </ul><p id="highText">before starting the desired dosage</p> <p id="highText">You can then follow Prescribed the dosage levels</p>';
            }
            else{
                content.innerHTML = '<p>Please try again once</p>';
            }
            table.innerHTML = '<table><tr><th>Day</th><th>Drug</th><th>Dosage</th><th>Frequency</th><th>Relationship with meal</th></tr><tr><td>1<sup>st</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning, Night</td><td>With meal</td></tr><tr><td>8<sup>th</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning</td><td>With meal</td></tr><tr><td>15<sup>th</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning</td><td>With meal</td></tr><tr><td>22<sup>nd</sup></td><td>Tab Hydroxy Chloroquine</td><td>400 mg</td><td>Morning</td><td>With meal</td></tr></table>'+'<br>';
        }
        else
        {
            content.innerHTML = '<p>Please try once again</p>';
        }
        global_risk = 0;
        content.appendChild(table);
        quiz.appendChild(content);
        var btn = document.createElement('div');
        btn.id = "btn";
        btn.innerHTML = createButton('Next','dosageNext','contactDetails');
        quiz.appendChild(btn);
    }
}

function contactDetails(){
    flushDivs();
    var content = document.createElement('div');
    content.id = 'content';
    content.innerHTML = '<p>Adverse Drug Reaction contacts :</p>';
    var table = document.createElement('div');
    table.style = "overflow-x:auto;";
    table.innerHTML = '<table><col width=60><col width="200"><tr><td><i class="fab fa-google-play" style="font-size:20px;color:lightblue;text-shadow:2px 2px 4px #000000;"></i></td><td><a href="https://play.google.com/store/apps/details?id=com.vinfotech.suspectedadversedrugreaction" target="_blank">ADR PvPI app</a></td></tr><tr><td><i class="fas fa-envelope" style="font-size:20px;color:lightblue;text-shadow:2px 2px 4px #000000;"></i></td><td>pvpi@ipcindia.net</td></tr><tr><td><i class="fas fa-mobile-alt" style="font-size:25px;color:lightblue;text-shadow:2px 2px 4px #000000;"></i></td><td><a href="tel:+18001803024" target="_blank">ARDs Reporting Call on PvPI Helpline(Toll Free) 18001803024</a></td></tr></table>'+'<br>';
    content.appendChild(table);
    quiz.appendChild(content);
    var btn = document.createElement('div');
    btn.id = "btn";
    btn.innerHTML = createButton('Next','contactNext','keyPoints');
    quiz.appendChild(btn);
}

function keyPoints(){
    flushDivs();
    var content = document.createElement('div');
    content.id = 'content';
    content.innerHTML = '<p>Key Points</p>'+
                      "<p>1. Please be informed taking prophylaxis does not means you won't get infection during or later period of drugs taken.</p>"+
                      "<p>2. Please follow </p><ul><li>hand hygiene.</li><li>Cough etiquette.</li><li>social distancing.</li></ul>"+
                      "<p>3. Be quarantined during prophylaxis.</p>"+
                      "<p>4. Please consult in person (as per availability) or any Govt Hospital if you develop any symptoms (fever, cough, difficulty in breathing, etc) because it may be symptoms of COVID-19 or adverse drug reactions.</p>";
    quiz.appendChild(content);
    var btn = document.createElement('div');
    btn.id = "btn";
    btn.innerHTML = createButton('Next','contactNext','references');
    quiz.appendChild(btn);
}

function references(){
    flushDivs();
    var content = document.createElement('div');
    content.id = 'content';
    content.innerHTML = '<p>References :</p>'+
                      '<li><a href="https://www.acc.org/latest-in-cardiology/articles/2020/03/27/14/00/ventricular-arrhythmia-risk-due-to-hydroxychloroquine-azithromycin-treatment-for-covid-19" target="_blank">Ventricular Arrhythmia Risk Due to Hydroxychloroquine-Azithromycin Treatment For COVID-19 - American Colllege of Cardiology</a></li>'+
                      '<li><a href="https://www.mohfw.gov.in/pdf/AdvisoryontheuseofHydroxychloroquinasprophylaxisforSARSCoV2infection.pdf" target="_blank"> use of hydroxy- chloroquine for prophylaxis of SARS-COV-2 infection - National Task force</a></li>'+'<br>';
    quiz.appendChild(content);
    var btn = document.createElement('div');
    btn.id = "btn";
    btn.innerHTML = createButton('Start Over','refNext','home');
    quiz.appendChild(btn);
}

//choice three result is created
function choiceThree() {
    flushDivs();
    var content = document.createElement('div');
    content.id = 'content';
    content.innerText = 'Currently you are not eligible to take this drug !';
    quiz.appendChild(content);
    var btn = document.createElement('div');
    btn.id = "btn";
    btn.innerHTML = createButton('Start Over','start','displayinitial');
    quiz.appendChild(btn);
}

//choice four result is created
function choiceFour() {
  flushDivs();
  var content = document.createElement('div');
  content.id = 'content';
  content.innerText = 'Currently you are not eligible to take this drug !';
  quiz.appendChild(content);
  var btn = document.createElement('div');
  btn.id = "btn";
  btn.innerHTML = createButton('Start Over','start','displayinitial');
  quiz.appendChild(btn);
}

function flushDivs(){
    if(document.getElementById('content')){
        document.getElementById('content').remove();
    }
    if(document.getElementById('btn')){
       document.getElementById('btn').remove();
    }
    if(document.getElementById('content1')){
        document.getElementById('content1').remove();
    }
}

function home(){
  flushDivs();
  var content = document.createElement('div');
  content.id = 'content';
  var contentText = "Prophylaxis of High Risk Population with Hydroxy Chloroquine for SARS COV-2 Infection - Assessment and Easy Guide";
  content.innerText = contentText;
  document.getElementById("container").style.backgroundImage = "url('image.jpg')";
  document.getElementById("container").style.backgroundColor = "rgba(255, 255, 255, 0.47)";
  quiz.appendChild(content);
  document.getElementById("content").style.fontSize = "38px";
  var btn = document.createElement('div');
  btn.id = "btn";
  btn.innerHTML = createButton('Start Over','start','displayinitial');
  quiz.appendChild(btn);
}
