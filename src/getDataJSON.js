var requestURL='';
var collums=[];
var filterSelected='';
var listSelected='';

function loadData(data){
    var arrItems = [];      // THE ARRAY TO STORE JSON ITEMS.
    $.each(data, function (index, value) {
        arrItems.push(value);       // PUSH THE VALUES INSIDE THE ARRAY.
    });
    
    var col = [];
    for (var i = 0; i < arrItems.length; i++) {
        for (var key in arrItems[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    // CREATE HEADER AND SELECTS.
    var table = document.createElement("table");
    var tr = table.insertRow(-1);  
    // SELECTS.
    document.getElementById("list").innerHTML='';
    document.getElementById("filter").innerHTML='';
    var list_option = document.createElement("option");
    var filter_option = document.createElement("option");
    list_option.innerHTML='--';
    filter_option.innerHTML='All';
    document.getElementById("list").appendChild(list_option);
    document.getElementById("filter").appendChild(filter_option);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
        
        var list_option = new Option(col[i], col[i]);
        if (filterSelected==col[i]){
            var filter_option = new Option(col[i], col[i], true, true);
        } else {
            var filter_option = new Option(col[i], col[i]);
        }
        if (listSelected==col[i]){
            var list_option = new Option(col[i], col[i], true, true);
        } else {
            var list_option = new Option(col[i], col[i]);
        }
        
        document.getElementById("list").appendChild(list_option);
        document.getElementById("filter").appendChild(filter_option);
    }
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < arrItems.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = arrItems[i][col[j]];
        }
        // *** UPDATE.
        td = document.createElement('td');
        tr.appendChild(td);
        var btUpdate = document.createElement('input');
        btUpdate.setAttribute('type', 'button');   
        btUpdate.setAttribute('value', 'Update');
        btUpdate.setAttribute('id', 'Edit' + i);
        btUpdate.setAttribute('class', 'btn btn-update');
        btUpdate.setAttribute('onclick', 'createForm(this)');   
        td.appendChild(btUpdate);
            // *** DELETE.
        td = document.createElement('td');
        tr.appendChild(td);
        var btDelete = document.createElement('input');
        btDelete.setAttribute('type', 'button');  
        btDelete.setAttribute('value', 'Delete');
        btDelete.setAttribute('class', 'btn btn-delete');
        btDelete.setAttribute('onclick', 'deleteData(this)');  
        td.appendChild(btDelete);
    }
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    return collums = col; 
}

function createForm(data){
    if (data!=''){
        var trNumber=$(data).closest("tr").index();
        console.log('tr:', trNumber);
        var str ='table tr:nth-child(' + (trNumber+1) + ')';
        var elements = document.querySelector(str);
        var elem = $(elements).children();
        console.log('elements:', elem);
        $("html, body").animate({ scrollTop: "0px" }, 1100);
    }
    for (var i = 0; i < collums.length; i++) {
        var lblCell = document.createElement("label");     
        lblCell.innerHTML = collums[i];
        lblCell.setAttribute('for', "cell" + i);
        var inputCell = document.createElement("input");
        inputCell.setAttribute('name', collums[i]);
        inputCell.setAttribute('placeholder', collums[i]);
        inputCell.setAttribute('id', 'input' + i);
        if (elem){
            inputCell.setAttribute('value', elem[i].innerText);
            if (inputCell.name=='id'){
                inputCell.disabled=true;
            }
        }
        var divCell = document.createElement("div");
        divCell.appendChild(lblCell);
        divCell.appendChild(inputCell);
        document.getElementById("addForm").append(divCell);
    }

    var btnGenerate = document.createElement("input");
    btnGenerate.setAttribute('type', "button");
    btnGenerate.setAttribute('value', 'Generate');
    btnGenerate.setAttribute('id', 'btnGenerate');
    btnGenerate.setAttribute('class', 'btnForm');
    btnGenerate.setAttribute('onclick', 'generateItem()');

    var btnAdd = document.createElement("input");
    btnAdd.setAttribute('type', "button");
    btnAdd.setAttribute('value', 'Add');
    btnAdd.setAttribute('id', 'btnAdd');
    btnAdd.setAttribute('class', 'btnForm');
    btnAdd.setAttribute('onclick', 'newAdd()');

    var btnCancel = document.createElement("input");
    btnCancel.setAttribute('type', "button");
    btnCancel.setAttribute('value', 'Cancel');
    btnCancel.setAttribute('class', 'btnForm');
    btnCancel.setAttribute('onclick', 'newCancel()');

    if (data!=''){
        btnGenerate.setAttribute("style", "display: none;");
        btnAdd.setAttribute("value", "Save");
        btnAdd.setAttribute('onclick', 'updateData(this)');
    }
    document.getElementById("addForm").append(btnGenerate);                   
    document.getElementById("addForm").append(btnAdd);
    document.getElementById("addForm").append(btnCancel); 
    document.getElementById("btn-add").disabled=true;
    document.getElementById("btn-add").setAttribute("class", "btn-go-disabled");
}

function newCancel(){
    document.getElementById("addForm").innerHTML='';
    document.getElementById("btn-add").disabled=false;;
    document.getElementById("btn-add").setAttribute("class", "btn-go");
}

function generateItemId(len,symbols){
    var itemId = "";
    for (var i = 0; i < len; i++){
        itemId += symbols.charAt(Math.floor(Math.random() * symbols.length));     
    }
    return itemId;
}

function generateItem(){
    var symbolsInt = "0123456789";
    var symbols = "abcdefghijklmnopqrstuvwxyz0123456789";
    var symbolsChar = "abc defghi jklmnop qrstuv wxyz";
    document.getElementById('input0').value=generateItemId(1,symbolsInt) + generateItemId(23,symbols);
    document.getElementById('input1').value=generateItemId(8,symbols) + '-' + generateItemId(4,symbols) + '-' + generateItemId(4,symbols) + '-' + generateItemId(4,symbols) + '-' + generateItemId(12,symbols);
    document.getElementById('input2').value=generateItemId(6,symbolsInt);

    document.getElementById('input3').value=new Date(Math.floor(Math.random()*49*365*24*3600*1000)); 
    document.getElementById('input4').value=new Date(Math.floor(Math.random()*49*365*24*3600*1000));
    document.getElementById('input5').value=new Date(Math.floor(Math.random()*49*365*24*3600*1000));
    document.getElementById('input6').value=generateItemId(60,symbolsChar);
}

function newAdd(){
    var formData = $('#addForm').serialize();
    console.log('Otvet but newAdd:', formData); 
    postData(formData);
    document.getElementById("addForm").innerHTML='';
    document.getElementById("btn-add").disabled=false;;
    document.getElementById("btn-add").setAttribute("class", "btn-go");
    alert('Data added successfully');     
}

function getData(getbody) { 
    console.log('Otvet:', getbody);
    $.ajax({
        url: 'https://project-werkax1.herokuapp.com/invoices' + getbody,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log('Otvet ajax:', data);
            loadData(data);
        },
        error: function(xhr, status, error){
            console.log('ajaxError xhr:', xhr); 
            console.log('ajaxError status:', status);
            console.log('ajaxError error:', error);
        // соберем самое интересное в переменную
        var errorInfo = 'Ошибка выполнения запроса: '
        + '\n[' + xhr.status + ' ' + status   + ']'
        +  ' ' + error + ' \n '
        + xhr.responseText
        + '<br>'
        + xhr.responseJSON;
            console.log('ajaxError:', errorInfo); // в консоль
        }
    });
}

function postData(data) { 
    $.ajax({
        url: 'https://project-werkax1.herokuapp.com/invoices',
        type: "POST",
        dataType: 'json',
        data: data,
        success: function (data, textStatus, jqXHR) {
            console.log('Otvet ajax:', data);
            getData('');
        },
        error: function(xhr, status, error){
            console.log('ajaxError xhr:', xhr); 
            console.log('ajaxError status:', status);
            console.log('ajaxError error:', error);
        // соберем самое интересное в переменную
        var errorInfo = 'Ошибка выполнения запроса: '
        + '\n[' + xhr.status + ' ' + status   + ']'
        +  ' ' + error + ' \n '
        + xhr.responseText
        + '<br>'
        + xhr.responseJSON;
            console.log('ajaxError:', errorInfo); // в консоль
        }
    });
} 

function updateData() {
    document.getElementById("input0").disabled=false;
    var formData = $('#addForm').serialize();
    var dataId = $('#addForm').serializeArray();
    document.getElementById("addForm").innerHTML='';
    document.getElementById("btn-add").disabled=false;;
    document.getElementById("btn-add").setAttribute("class", "btn-go"); 

    $.ajax({
        url: 'https://project-werkax1.herokuapp.com/invoices/' + dataId[0].value,
        type: "PUT",
        dataType: 'json',
        data: formData,
        success: function (data, textStatus, jqXHR) {
            console.log('Otvet ajax:', data);
            alert('Data updated successfully');
            getData('');
        },
        error: function(xhr, status, error){
            console.log('ajaxError xhr:', xhr); // выводим значения переменных
            console.log('ajaxError status:', status);
            console.log('ajaxError error:', error);
        // соберем самое интересное в переменную
        var errorInfo = 'Ошибка выполнения запроса: '
        + '\n[' + xhr.status + ' ' + status   + ']'
        +  ' ' + error + ' \n '
        + xhr.responseText
        + '<br>'
        + xhr.responseJSON;
        console.log('ajaxError:', errorInfo); 
        }
    });
}

function deleteData(data) {
    var trNumber=$(data).closest("tr").index();
    console.log('tr:', trNumber);
    var str ='table tr:nth-child(' + (trNumber+1) + ')';
    var elements = document.querySelector(str); 
    var elem = $(elements).children();
    console.log('elements:', elem[0].innerText);  
    $.ajax({
        url: 'https://project-werkax1.herokuapp.com/invoices/' + elem[0].innerText,
        type: "DELETE",
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log('Otvet ajax:', data);
            alert('Data deleted successfully');
            getData('');
        },
        error: function(xhr, status, error){
            console.log('ajaxError xhr:', xhr);
            console.log('ajaxError status:', status);
            console.log('ajaxError error:', error);
        // соберем самое интересное в переменную
        var errorInfo = 'Ошибка выполнения запроса: '
        + '\n[' + xhr.status + ' ' + status   + ']'
        +  ' ' + error + ' \n '
        + xhr.responseText
        + '<br>'
        + xhr.responseJSON;
        console.log('ajaxError:', errorInfo);
        }
    });
} 

function searchData(){
    var param=[];
    var str = '';
    var formElements=document.getElementById("myForm").elements;
    if ((formElements[0].value!="")){      
        param[0] = 'q=' + formElements[0].value;   
    }
    if ((formElements[1].value=='All')&&(formElements[2].value!='')){
        param[1] = 'q=' + formElements[2].value;
    }
    if ((formElements[1].value!='All')&&(formElements[2].value!='')){
        param[2] =formElements[1].value + '_like=' + formElements[2].value;
        filterSelected=formElements[1].value;  
    }
    if (formElements[3].value!='--'){
        param[3] = '_sort=' + formElements[3].value;
        listSelected=formElements[3].value;
        if (formElements[4].value!=''){
            param[3] = param[3] + '&' + '_order=' + formElements[4].value;
        }

    }
    for (var i = 0; i <= 3; i++) {
        if (param[i]){
            if(str==''){
                str = str + '?' + param[i];
            } else {
                str = str + '&' + param[i];
            }
        }        
    }
    //alert(str);
    getData(str);
}


$(document).ready(function () {
    getData(requestURL);
});
