var sequence = [];
var playedSequence = [];
var colors = ["blue", "red", "yellow", "green"];
var computerPlaying = false;
var index = 0;

function generateNextColor(){
	let i = Math.floor(Math.random()*4);
	return colors[i];
}

function computerPlay(){
	
	computerPlaying = true;
	$("#player").html("Computer is playing...");
	delay = 1000;
	for(let i=0; i<sequence.length; i++){
		setTimeout(
			function(){
				$("#"+sequence[i]).trigger('click');
			},
			delay
		);
		delay += 1000;
	}
	
	setTimeout(
		function(){
			computerPlaying = false;
			$("#player").html("You are playing!");
		},
		delay
	);
	playedSequence = [];
	index = 0;
	
}

function playerPlay(color){
	if(sequence[index]!=color){
		alert("Wrong! Try again.");
		index = 0;
		computerPlay();
	} else {
		index++;
	}
	if(index==sequence.length){
		$("#score").html(index);
		sequence.push(generateNextColor());
		computerPlay();
	}
}

$(document).ready(
	function(){
		$("#game").hide();
		$("#start").click(
			function(e){
				e.preventDefault();
				$(this).slideUp(500);
				$("#game").attr('hidden', false).slideDown(500);
				
				//button interaction
				colors.forEach(
					color => {
						$("#"+color).hover(
							function(){
								$(this).css("box-shadow", "0px 2px 4px 4px #737373");
							}, function(){
								$(this).css("box-shadow", "0px 1px 2px 2px #737373");
							}
						).click(
							function(e){
								e.preventDefault();
								var col = $(this).css("background-color");
								$(this).fadeOut(100).css("background-color", this.id).fadeIn(100, function(){$(this).css("background-color", col)});
								if(computerPlaying){
									return;
								}
								playerPlay(this.id);
							}
						);
					}
				);
				
				sequence.push(generateNextColor());
				computerPlay();
			}
		);
	}
);