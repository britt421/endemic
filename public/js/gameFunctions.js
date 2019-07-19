$(document).ready(function() {
  getDisease();
  getTreatments();
  getEffect();
  //set up global variables to use for functions
  var patientLifePoints = 50;
  var disease;
  var treatments = [];
  var effect;
  var specialistType = "doctor";

  $("#patientHealth").text(patientLifePoints);
  $("#patientSymptoms").css("opacity", "0.5"); //since we start at 50% health

  function getRandomId(maxId){
    var randomId = Math.floor(Math.random() * maxId) +1;
    return randomId;
  }

  //GET a random 1 DISEASE and 3 SYMPTOMS
  function getDisease(){
    var randomId = getRandomId(10);
    //Select * from diseases where id = randomId
    $.ajax({
      method: "GET",
      url: "/api/disease/" + randomId
    }).then(function (res){
      disease = res;
      //assign the initial values to load the game page
      $("#symptom-1").text(disease.symptom1);
      $("#symptom-2").text(disease.symptom2);
      $("#symptom-3").text(disease.symptom3);
    });
  }


  //GET 3 random TREATMENTS
  function getTreatments(){
    var randomId;
    var ids = [];
    while (ids.length < 3){
      randomId = getRandomId(9);
      if(ids.indexOf(randomId) === -1){
        ids.push(randomId);
      }
    }
    //treatments = select * from diseases where id = ids[0] or id = ids[1] or id = ids[2]
    for(var i = 0; i < ids.length; i++){
      $.ajax({
        method: "GET",
        url: "/api/treatment/" + ids[i]
      }).then(function(res){
        treatments.push(res);
        $("#treatment-1").text(treatments[0].treatmentName + ": " + treatments[0].treatmentCategory);
        $("#treatment-2").text(treatments[1].treatmentName + ": " + treatments[1].treatmentCategory);
        $("#treatment-3").text(treatments[2].treatmentName + ": " + treatments[2].treatmentCategory);
      });
    }
  }

  //GET 1 random EFFECT
  function getEffect(){
    var randomId = getRandomId(37);
    var ids = [];

    //effect = select * from effects where id = randomId
    $.ajax({
      method: "GET",
      url: "/api/effect/" + randomId
    }).then(function (res){
      effect = res;
      });
  }

  $(".treatment").click(function(event){
    getEffect();
    //check if the effect picked is positive or negative
    var effectType;
    if(effect.positiveEffect)
    {
      effectType = 1;
    }else{
      effectType = -1;
    }

    //get the treatment row based on the id of the button clicked
    var treatmentData;
    var buttonId = this.id.split("-")[1];

    //apply the appropriate specialist healing effect based on avatar type selected
    switch (specialistType) {
      case "doctor":
        patientLifePoints += treatments[buttonId - 1].doctorEffect * effectType;
        $("#effectLog").prepend('<button type="button" class="btn btn-info btn-block disabled="disabled">'+ 
          treatments[buttonId - 1].doctorEffect * effectType + ' | ' + effect.effectName +
          effect.effectDescription +'</button>');
        $("#patientHealth").text(patientLifePoints);
        break;
      case "biochemist":
        patientLifePoints += treatments[buttonId - 1].biochemistEffect * effectType;
        $("#effectLog").prepend('<button type="button" class="btn btn-info btn-block disabled="disabled">'+ 
          treatments[buttonId - 1].biochemistEffect * effectType + ' | ' + effect.effectName +
          effect.effectDescription +'</button>');
        $("#patientHealth").text(patientLifePoints);
        break;
      case "shaman":
        patientLifePoints += treatments[buttonId - 1].shamanEffect * effectType;
        $("#effectLog").prepend('<button type="button" class="btn btn-info btn-block disabled="disabled">'+ 
          treatments[buttonId - 1].shamanEffect * effectType + ' | ' + effect.effectName +
          effect.effectDescription +'</button>');
        $("#patientHealth").text(patientLifePoints);
        break;
      default:
        break;
    }

    //check patient health after each treatment and take appropriate action
    if(patientLifePoints <= 0){
      gameLost();
    }else if(patientLifePoints >= 100){
      gameWon();
    }else if(patientLifePoints > 0 && patientLifePoints <= 25){
      $("#patientSymptoms").css("opacity", "1");
      //show appropriate animation on patient
    }else if(patientLifePoints > 25 && patientLifePoints <= 50){
      $("#patientSymptoms").css("opacity", "0.5");
      //show appropriate animation on patient
    }else if(patientLifePoints > 50 && patientLifePoints <= 75){
      //show appropriate animation on patient
    }else if(patientLifePoints > 75 && patientLifePoints <= 99){
      $("#patientSymptoms").css("opacity", "0.1");
      //show appropriate animation on patient
    }
  });

  function gameLost(){
    //Pop a modal?
  }

  function gameWon(){
    //pop a modal?
  }
});

