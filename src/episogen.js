answers = [
    "北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島", 
    "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川", 
    "新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜", 
    "静岡", "愛知", "三重", "滋賀", "京都", "大阪", "兵庫", 
    "奈良", "和歌山", "鳥取", "島根", "岡山", "広島", "山口", 
    "徳島", "香川", "愛媛", "高知", "福岡", "佐賀", "長崎", 
    "熊本", "大分", "宮崎", "鹿児島", "沖縄"
]

function display(){
    $('#answers').empty()
    for (var i of answers.sort()){
	$('#answers')
	    .append($('<span class="test">')
		    .append($(`<span>${i}</span>`))
		    .append($('<span> </span>'))
		    .append($('<span class="button">x</span>'))
		   )
    }
    $('.button').on('click', function(e) {
	// console.log(e.target.parentElement.children[0].innerHTML)
	answers = answers.filter(item => item != e.target.parentElement.children[0].innerHTML)
	display()
    });
    $('.add').on('click', function(e) {
	let answer = $('#add').val()
	if(answer != '' && ! answers.includes(answer)){
	    answers.push(answer)
	    display()
	}
    });
}

$(function() {
    display()
});
