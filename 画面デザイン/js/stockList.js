// メニュー作成のファンクション
window.addEventListener('load', function(){
    // メニューリストを作成する。
    var menuArray = ['', '更新', 'CSV出力', 'CSV取込', '削除'];
	let menuIcon = document.getElementById("menuIcon");
	// メニューがクリックタイミングで実行する
	menuIcon.onclick = function (){
		showMenu(menuArray);
    }
});

// 入荷日別モードが押された場合のファンクション
window.addEventListener('load', function(){
    // メニューリストを作成する。
    var menuArray = ['', '更新', 'CSV出力', 'CSV取込', '削除'];
	let menuIcon = document.getElementById("menuIcon");
	// メニューがクリックタイミングで実行する
	menuIcon.onclick = function (){
		showMenu(menuArray);
    }
});

function btnRegulation(searchModeValue){

//    let stocksCnt = document.getElementById("stocks-cnt").value;                //在庫数
//    let orderingKbn = document.getElementById("ordering-kbn").value;            //発注区分
//    let stocChangekKbn = document.getElementById("stockKbn").value;				//在庫数変更区分
//    let csvOperationKbn = document.getElementById("csvKbn").value;

//    let btnCsvOpen = document.getElementById("csvOpen");
//    let btnUpdate = document.getElementById("update");
//    let btnOrder = document.getElementById("order");

    const validColor = '#003300';       //ボタンが有効であることを示す色
    const invalidColor = '#808080';     //ボタンが有効でないことを示す色
    const chosenColor = '#3300FF';      //ボタンが選択済みであることを示す色
    const valiadeBtn = 'auto';          //ボタン機能を有効にする
    const invalidateBtn = 'none';       //ボタン機能を無効にする

    if(searchModeValue == 1){
        //文字を変更
       // document.getElementById("p-searchMode").innerHTML = "入荷日別在庫数モード";

//        if(csvOperationKbn != "1" && csvOperationKbn != "3"){
//            //CSV取込を無効
//            changeBtnState(btnCsvOpen,true,invalidColor,invalidateBtn)
//        }else{
//            //CSV取込ボタン有効化
//            changeBtnState(btnCsvOpen,false,validColor,valiadeBtn);
//        }
//        if(stocChangekKbn == "0" || stocksCnt == 0){
//            //更新無効化
//            changeBtnState(btnUpdate,true,invalidColor,invalidateBtn);
//        }else{
//            //更新有効化
//            changeBtnState(btnUpdate,false,validColor,valiadeBtn);
//        }
//        //発注
//        //発注データ追加区分の判断
//        if(stocksCnt == 0 || orderingKbn == "0"){
//            //発注無効
//            changeBtnState(btnOrder,true,invalidColor,invalidateBtn);
//        }else{
//            //発注有効
//            changeBtnState(btnOrder,false,validColor,valiadeBtn);
//        }
        //年数指定
//        document.getElementById("overDateKbn").disabled = false;
//        document.getElementById("select-year").style.background = '#7fffd4';
        //選択したボタンの色をキープ
        document.getElementById("searchArrivalDate").style.background = '#FF0000';
        document.getElementById("searchSummary").style.background = '#FFFFFF';

    }else{
        //文字を変更
       // document.getElementById("p-searchMode").innerHTML = "SUMモード";
        //CSV取込を無効化
//        changeBtnState(btnCsvOpen,true,invalidColor,invalidateBtn);
//        //更新を無効化
//        changeBtnState(btnUpdate,true,invalidColor,invalidateBtn);
//        //発注を無効化
//        changeBtnState(btnOrder,true,invalidColor,invalidateBtn);
        //年数指定
//        document.getElementById("overDateKbn").disabled = true;
//        document.getElementById("select-year").style.background = '#c0c0c0';
        //選択したボタンの色をキープ
        document.getElementById("searchArrivalDate").style.background = '#FFFFFF';
        document.getElementById("searchSummary").style.background = '#3DFF50';
    }
}

//ボタンを有効化
function changeBtnState(button,disabled,color,event) {
    button.disabled = disabled;
    button.style.background = color;
    button.style.pointerEvents = event
}

function arrival(sortKbn) {
	//入荷日別モードを設定する
	//let searchModeValue = document.getElementById("searchMode").value="1";
	btnRegulation(sortKbn);
    return false;
}

function summary(sortKbn) {
	//SUMモードを設定する
	//let searchModeValue = document.getElementById("searchMode").value="2";
	btnRegulation(sortKbn);
    return false;
}