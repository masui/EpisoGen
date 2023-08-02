var data = {}

data.answers = [
    "イギリス", "神戸", "恵比寿", "富士山"
    /*
    "北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島", 
    "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川", 
    "新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜", 
    "静岡", "愛知", "三重", "滋賀", "京都", "大阪", "兵庫", 
    "奈良", "和歌山", "鳥取", "島根", "岡山", "広島", "山口", 
    "徳島", "香川", "愛媛", "高知", "福岡", "佐賀", "長崎", 
    "熊本", "大分", "宮崎", "鹿児島", "沖縄"
*/
]

data.questions = [
    "無限タコヤキしたのは?",
    "ナショナル坊やは?",
    "公園でコケたのは?",
    "トイレを借りたのは?",
    "床屋と飲んだのは?",
    "ヘビの坂とは?",
    "深尾さんの実家は?",
    "高校の頃超美味かった店は?",
    "鈴木の家から峠を越えると?",
    "布施君の出身は?",
    "義父の出身は?",
    "義母の生まれは?",
    "廃虚がすごかったのは?",
    "高見君の親戚の家は?",
    "猫又といえば?",
    "コケた公園は?",
    "ライブハウスが閉まってたのは?",
    "夜中に雀荘を発見したのは?",
    "盆は帰省しろと怒られたのは?",
    "特急が止まって歩いたのは?",
    "電波が通じなくて苦労したのは?",
    "額を怪我したのは?",
    "前田君と偶然会ったのは?",
    "駐車違反でつかまったのは?"
]

function display(){
    $('#answers').empty()
    // for (var i of answers.sort()){
    for (var i of data.answers){
	$('#answers')
	    .append($('<span class="answer">')
		    .append($(`<span>${i}</span>`))
		    .append($('<span> </span>'))
		    .append($('<span class="answerdelete">x</span>'))
		   )
    }
    $('.answerdelete').on('click', function(e) {
	data.answers = data.answers.filter(item => item != e.target.parentElement.children[0].innerHTML)
	display()
    });
    $('.answeradd').on('click', function(e) {
	let answer = $('#answeradd').val()
	if(answer != '' && ! data.answers.includes(answer)){
	    data.answers.unshift(answer)
	    display()
	}
    });
    
    $('#questions').empty()
    for (var i of data.questions){
	$('#questions')
	    .append($('<span class="question">')
		    .append($(`<span>${i}</span>`))
		    .append($('<span> </span>'))
		    .append($('<span class="questiondelete">x</span>'))
		   )
    }
    $('.questiondelete').on('click', function(e) {
	data.questions = data.questions.filter(item => item != e.target.parentElement.children[0].innerHTML)
	display()
    });
    $('.questionadd').on('click', function(e) {
	let question = $('#questionadd').val()
	if(question != '' && ! data.questions.includes(question)){
	    data.questions.unshift(question)
	    display()
	}
    });
}

$(function() {
    display()
    $('#write').on('click', function(e) {
	alert('episopass.jsonにデータを書き出します')
	// こんな方法で良いのだろうか??
	/*
	var outdata = {}
	outdata['answers'] = answers
	outdata['questions'] = questions
	var result = JSON.stringify(outdata)
	*/
	var result = JSON.stringify(data)
	result = `
const qa = ''
`
	const a = document.createElement('a');
        a.href = 'data:application/json;base64,' + btoa(unescape(encodeURIComponent(result)))
        a.href = 'data:application/text;base64,' + btoa(unescape(encodeURIComponent(result)))
	a.download = 'episopass.json';
	a.click();
    })
});
