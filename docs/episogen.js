
fetch('https://s3-ap-northeast-1.amazonaws.com/masui.org/f/b/fbf92f88a64ddfd86ae8ce1c1329f6bf.json', {
    mode: 'no-cors' })
    .then((response) => response.text())
    .then((data) => console.log(data))

var answers = [
    "滋賀", "神戸", "池袋", "大町", "鍋屋横丁"
]

var questions = [
    "額をケガしたのは?", "眼鏡をなくしたのは?"
]

function display(){
    $('#answers').empty()
    // for (var i of answers.sort()){
    for (var i of answers){
	$('#answers')
	    .append($('<span class="answer">')
		    .append($(`<span>${i}</span>`))
		    .append($('<span>&nbsp;&nbsp;</span>'))
		    .append($('<span class="answerdelete">×</span>'))
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
		    .append($('<span>&nbsp;&nbsp;</span>'))
		    .append($('<span class="questiondelete">×</span>'))
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
	
	// on('change')が何度も効くようにする
	// https://qiita.com/_Keitaro_/items/57b1c5dd36b7bed08ad8
	$('#read').val('')
    }
    reader.readAsText(f);
}


$(function() {
    display()
    $('#write').on('click', function(e) {
	alert('ダウンロードフォルダのepisopass.jsonにデータを書き出します')
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

    // input=file のファイル名を表示させない工夫
    // https://qiita.com/shiva_it/items/ae95d9e1d0977fc0bf22
    $('#read').on('change', handleFileSelect);
    $('#fileSelect').on('click', function(e){
	$('#read').click();
    })
});

