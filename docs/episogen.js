//var data = {}

var answers = [
    "滋賀", "神戸", "池袋", "大町"
]

var questions = [
    "額をケガしたのは?",
    "公園でコケたのは?",
    "眼鏡をなくしたのは?"
]

function display(){
    $('#answers').empty()
    // for (var i of answers.sort()){
    for (var i of answers){
	$('#answers')
	    .append($('<span class="answer">')
		    .append($(`<span>${i}</span>`))
		    .append($('<span> </span>'))
		    .append($('<span class="answerdelete">x</span>'))
		   )
    }
    $('.answerdelete').on('click', function(e) {
	answers = answers.filter(item => item != e.target.parentElement.children[0].innerHTML)
	display()
    });
    $('.answeraddbutton').on('click', function(e) {
	let newanswers = $('#answeradd').val().split(/\n/).reverse()
	for (var answer of newanswers){
	    if(answer != '' && ! answers.includes(answer)){
		answers.unshift(answer)
	    }
	}
	display()
    });
    
    $('#questions').empty()
    for (var i of questions){
	$('#questions')
	    .append($('<span class="question">')
		    .append($(`<span>${i}</span>`))
		    .append($('<span> </span>'))
		    .append($('<span class="questiondelete">x</span>'))
		   )
    }
    $('.questiondelete').on('click', function(e) {
	questions = questions.filter(item => item != e.target.parentElement.children[0].innerHTML)
	display()
    });
    $('.questionaddbutton').on('click', function(e) {
	let newquestions = $('#questionadd').val().split(/\n/)
	for (var question of newquestions){
	    if(question != '' && ! questions.includes(question)){
		questions.unshift(question)
	    }
	}
	questions = questions.sort()
	display()
    });
}

function handleFileSelect(evt) {
    var f = evt.target.files[0]
    var reader = new FileReader();
    reader.onload = function(e){
	var data = JSON.parse(e.target.result)
	questions = data.questions
	answers = data.answers
	display()
	$('#read').val('') // on('change')が何度も効くようにする
    }
    reader.readAsText(f);
}


$(function() {
    display()
    $('#write').on('click', function(e) {
	// alert('episopass.jsonにデータを書き出します')
	/*
	// こんな方法で良いのだろうか??
	var outdata = {}
	outdata['answers'] = answers
	outdata['questions'] = questions
	var result = JSON.stringify(outdata)
	*/
	/*
	var result = JSON.stringify(data)
	result = `
const qa = ''
`
	const a = document.createElement('a');
        a.href = 'data:application/text;base64,' + btoa(unescape(encodeURIComponent(result)))
	*/

	// 自力でJSONを生成
	let out = []
	out.push('{\n  "answers": [')
	out.push('    "' + answers.join('",\n    "') + '"')
        out.push('  ],\n  "questions": [')
	out.push('    "' + questions.join('",\n    "') + '"')
        out.push('  ]\n}\n')
        result = out.join('\n')
	
	const a = document.createElement('a');
        a.href = 'data:application/json;base64,' + btoa(unescape(encodeURIComponent(result)))
	a.download = 'episopass.json';
	a.click();
    })
    
    $('.read').on('change', handleFileSelect);
});
