/**
 * @fileOverview 最低在庫不足画面
 *
 * @author Kentaro Kamiyama
 * @version 1.0.0
 */

/*
 * ファンクションキー制御の初期化
 */
function init(msg) {
	// helpイベントはreturn falseで無効にする
	window.onhelp = function() {return false;};

	if (msg != undefined && msg != null && msg != ""){
		alert(msg);
	}
	// onkeydownイベントハンドラに、key_event関数を登録
	document.onkeydown = key_event;
}
/**
 * ファンクションキー押下時に実行される関数
 */
function key_event()
{
	// 発生したイベントのキーコードを取得
	var code = event.keyCode;

	//F1-F12キーであれば、無効化する(F1キー：112,... F12キー:123)
	if(event.keyCode >= 112 && event.keyCode <= 123)
	{
		event.keyCode = null;
		event.returnValue = false;
	}else{
		return true;
	}
	//該当するキーコードで分岐。それぞれのcase内に、実行したい独自の処理を記述する。
	switch(code){
	// F1キー(検索)
	case 112:
		document.getElementById("oldSortMode").value = "2";
		search("1");
		break;
	// F2キー(出力)
	case 113:
		if ((document.getElementById("csvKbn").value == "1") || (document.getElementById("csvKbn").value == "2")){
			download();
		}
		break;
	// F3キー（発注)
	case 114:
		if (document.getElementById("ordering-kbn").value !="0"){
			//発注区分
			order();
		}
		break;
	// F12キー（戻る）
	case 123:
		window.location.href = "./MenuServlet";
		break;
	default:
		break;
	}
	return false;
}

/*
 * 検索処理
 */
function initSearch(sortKbn) {
	document.getElementById("oldSortMode").value = "2";
	search(sortKbn);
}
/*
 * 検索処理
 */
function search() {
	
	var list = document.getElementById("list");

	if(list.style.visibility=="visible"){
		// 非表示
		list.style.visibility ="hidden";
	}else{
		// 表示
		list.style.visibility ="visible";
	}
	document.getElementById("show-details-btn").click();
}
function search_2() {
	
	var list = document.getElementById("list");

	if(list.style.visibility=="hidden"){
		// 表示
		list.style.visibility ="visible";
	}
	document.getElementById("show-details-btn").click();
}


function order(){
	let stocksCnt = document.getElementById("stocks-cnt").value;

	let checkedCnt = 0;

	//1つだけチェックボックスにチェックがあれば発注追加画面に遷移
	for (let i = 0; i < stocksCnt; i++){
		if (document.getElementById("select" + i).checked ) {
			checkedCnt ++;
		}
	}

	if (checkedCnt == 1) {

		//$("#indicator").fadeIn(500);
		//処理区分に更新を指定
		document.getElementById("procMode").value="4";
		//前回のソート区分で検索する
		document.getElementById("sortKbn").value=document.getElementById("oldSortKbn").value;
		//同じソート順にするために、前回のソート順の逆を指定
		if (document.getElementById("oldSortMode").value == "1"){
			document.getElementById("oldSortMode").value = "2";
		}else{
			document.getElementById("oldSortMode").value = "1";
		}
		//フォームの送信先を変更
		document.myForm.action="./RegistrationOrderingServlet";
		document.myForm.submit();

	} else  {
		alert("チェックボックスを1つだけ選択してください");
	}

}

/*
 * ダウンロード処理
 */
function download() {
	//処理区分にダウンロードを指定
	document.getElementById("procMode").value="2";
	//前回のソート区分で検索する
	document.getElementById("sortKbn").value=document.getElementById("oldSortKbn").value;
	//同じソート順にするために、前回のソート順の逆を指定
	if (document.getElementById("oldSortMode").value == "1"){
		document.getElementById("oldSortMode").value = "2";
	}else{
		document.getElementById("oldSortMode").value = "1";
	}
	//ダウンロードを実行
	document.getElementById("myForm").removeAttribute("target");
	document.myForm.submit();
}

/*
 * 一覧がスクロールされた時
 */
function listScroll(){
	document.getElementById( "listHeader" ).scrollLeft = document.getElementById( "listData" ).scrollLeft;// 左右連動させる
}

/*
 * 検索条件入力モーダル
 */
$(function(){
    $('.js-modal-open').on('click',function(){
        $('.js-modal').fadeIn();
        return false;
    });
    $('.js-modal-close').on('click',function(){
        $('.js-modal').fadeOut();
		document.getElementById("show-details-btn").click();
        return false;
    });
});

/*
 * 棚コード連動
 */
$(function(){
    var shelfCdWord1_1 = $('#shelfCdWord1_1');
	var shelfCdWord1_2 = $('#shelfCdWord1_2');
	$(document).on('change keyup', '#shelfCdWord1_1', function(){
		shelfCdWord1_2.val(shelfCdWord1_1.val());
	});
});
$(function(){
	var shelfCdWord1_1 = $('#shelfCdWord1_1');
	var shelfCdWord1_2 = $('#shelfCdWord1_2');
	$(document).on('change keyup', '#shelfCdWord1_2', function(){
		shelfCdWord1_1.val(shelfCdWord1_2.val());
	});
});

/*
 * 詳細条件の表示
 */
function baseListSelect(obj) {
	var idx = obj.selectedIndex;
    var text  = obj.options[idx].text;
	if(text != "" && text != null && text != " "){
		$("#base-select-text").remove();
		$('.conditions-class').append('<ul class="conditions-text-class" id="base-select-text">' +
													'拠点：<font color=#ffff00>' + text + '</font></ul>');
	}else{
		$("#base-select-text").remove();
	}
}
function locationCdInput(obj) {
	var text = obj.value;
	if(text != ""){
		$("#locationCd-input-text").remove();
		$('.conditions-class').append('<ul class="conditions-text-class" id="locationCd-input-text">' +
													'ロケーション：<font color=#ffff00>' + text + '</font></ul>');
	}else{
		$("#locationCd-input-text").remove();
	}
}
function shelfCdWordInput(obj1,obj2) {
	var text1 = obj1.value;
	var text2 = obj2.value;
	if(text1 != "" && text2 == ""){
		$("#shelfCdWord-input-text").remove();
		$('.conditions-class').append('<ul class="conditions-text-class" id="shelfCdWord-input-text">' +
													'棚コード：<font color=#ffff00>' + text1 + '</font></ul>');
	}else if(text1 == "" && text2 != ""){
		$("#shelfCdWord-input-text").remove();
		$('.conditions-class').append('<ul class="conditions-text-class" id="shelfCdWord-input-text">'+
													'棚コード：<font color=#ffff00>' + text2 + '</font></ul>');
	}else if(text1 != "" && text2 != ""){
		$("#shelfCdWord-input-text").remove();
		$('.conditions-class').append('<ul class="conditions-text-class" id="shelfCdWord-input-text">' +
							'棚コード：<font color=#ffff00>' + text1 + '</font> ～ <font color=#ffff00>' + text2 +'</font></ul>');
	}else{
		$("#shelfCdWord-input-text").remove();
	}
}
function word1Input(obj) {
	var text = obj.value;
	if(text != ""){
		$("#word1-input-text").remove();
		$('.conditions-class').append('<ul class="conditions-text-class" id="word1-input-text">' +
													'ワード1：<font color=#ffff00>' + text + '</font></ul>');
	}else{
		$("#word1-input-text").remove();
	}
}
function word2Input(obj) {
	var text = obj.value;
	if(text != ""){
		$("#word2-input-text").remove();
		$('.conditions-class').append('<ul class="conditions-text-class" id="word2-input-text">' +
													'ワード1：<font color=#ffff00>' + text + '</font></ul>');
	}else{
		$("#word2-input-text").remove();
	}
}
window.addEventListener('load', () => {
	document.getElementById("show-details-btn").click();
});

