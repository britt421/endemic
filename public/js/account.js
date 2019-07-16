$("#add-player").on("click", function (event) {
  event.preventDefault();
  console.log("Add player button clicked.");
  console.log($("#inputFirst").val());
  var newPlayer = {
    id: $("#id").val(),
    userName: $("#userName").val(),
    password: $("#password").val(),
    // gender: $("#inputEmail").val(),
    // age: $("#age").val(),
    medicinalPreference: $("#medicinalPreference").val(),
    lastAvatarId: $("#lastAvatarId").val(),
    lastGameLog: $("#lastGameLog").val(),
  };
  if (newPlayer.playerKey.length > 0 && newPlayer.email.length > 0 && newPlayer.lastName.length > 0 && newPlayer.firstName.length > 0) {
    $.ajax({
      type: "post",
      url: "/signup",
      data: newPlayer
    }).then(function () {
      window.location.href = "/character";
    });
  } else {
    console.log("**Please complete the entire form.**");
    $("#create-err-msg").empty("").text("**Please complete the entire form.**");
  }
});