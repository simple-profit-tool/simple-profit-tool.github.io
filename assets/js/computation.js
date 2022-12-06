var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];;
var counter = 0;
var user_limit = 20;
var users = {};
var users_order = [];
var archived_users = {};
var total_fund = 0;
var fed_tax = 33;
var table_elm = document.createElement("table");
table_elm.className = "rtable";
var header_row = table_elm.createTHead(); 
var first_row = header_row.insertRow();
var body_elm = table_elm.createTBody();
var current_row = body_elm.insertRow();

var table_begin = "<table class=\"rtable\">"
var table_end = "</table>"

var thead_begin = ""
var thead_end = ""

var tbody_begin = "<tbody>"
var tbody_end = "</tbody>"

var row_begin = "<tr>"
var row_end = "</tr>"

var cell_begin = "<td>"
var cell_end = "</td>"

var head_cell_begin = "<th>"
var head_cell_end = "</th>"

header_content = ""
body_content = ""
current_row_content = ""

addCellInFirstRow("Total Fund");
csv_rows = []
csv_header = "Total Fund"

function baseFormat(str_value){
    return String(str_value).replace(/"/g, "");
}

function setDefault(){
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];;
    users = {};
    users_order = [];
    archived_users = {};
    total_fund = 0;
    fed_tax = 33;
    table_elm = document.createElement("table");
    table_elm.className = "rtable";
    first_row = table_elm.insertRow(-1);
    current_row = first_row;
    addCellInFirstRow("Total Fund");
    csv_rows = []
    csv_header = "Total Fund"
}


function addNewRow() {
    body_content = row_begin + current_row_content + row_end + body_content;
    current_row_content = "";
    // current_row = table_elm.insertRow(-1);
}

function addCell(cell_value) {
    current_row_content += cell_begin + cell_value + cell_end
    // var cell = current_row.insertCell(-1);
    // cell.innerHTML = cell_value;
    
}

function addCellInFirstRow(cell_value) {
    console.log("this is called");
    header_content += head_cell_begin + cell_value + head_cell_end
    // var cell = first_row.insertCell(-1);
    // cell.innerHTML = cell_value;
}

function showTable() {
    var dvCSV = document.getElementById("dvCSV");
    console.log(header_content);
    dvCSV.innerHTML = table_begin + thead_begin + row_begin + header_content + row_end + thead_end + tbody_begin + row_begin + current_row_content + row_end + body_content + tbody_end + table_end;
    // dvCSV.appendChild(table_elm);
    // console.log(table_elm.tBodies);
}

function addRowLog() {
    csv_rows.push([])
    var last_row = csv_rows.at(-1)
    last_row.push(total_fund)
    addNewRow();
    // console.log(users_order);
    addCell(round3(total_fund))
    for (i = 0; i < users_order.length; i++) {
        user_name = users_order[i];
        user_obj = users[user_name];
        // console.log(user_obj, user_name);
        addCell("");
        addCell(round3(user_obj.get_fund()));
        addCell(round3(user_obj.get_pct() * 100));
        addCell(round3(user_obj.get_tax()));
        addCell(round3(user_obj.get_withdraw()));
        last_row.push("");
        last_row.push(user_obj.get_initial_fund());
        last_row.push(user_obj.get_fund());
        last_row.push(user_obj.get_pct());
        last_row.push(user_obj.get_tax());
        last_row.push(user_obj.get_date());
        last_row.push(user_obj.get_withdraw());
    }
    // console.log(csv_rows);
    showTable();
}

class User {

    constructor(name, fund, date) {
        this.name = name;
        this.fund = fund;
        this.date = date;
        this.initial_fund = fund;
        this.pct = 0;
        this.tax = 0;
        this.withdraw = 0;
        this.profit = 0;
    }

    set_pct(pct_val) {
        this.pct = pct_val;
    }

    set_tax(tax_val) {
        this.tax = tax_val;
    }

    set_name(name_val) {
        this.name = name_val;
    }

    set_fund(fund_val) {
        this.fund = fund_val;
    }

    set_initial_fund(fund_val) {
        this.initial_fund = fund_val;
    }

    set_date(date_val) {
        this.date = date_val;
    }

    set_withdraw(withdraw_val) {
        this.withdraw = withdraw_val;
    }

    set_profit(profit_amt) {
        this.profit = profit_amt;
    }


    get_pct() {
        return this.pct;
    }

    get_tax() {
        return this.tax;
    }

    get_name() {
        return this.name;
    }

    get_fund() {
        return this.fund;
    }

    get_initial_fund() {
        return this.initial_fund;
    }

    get_date() {
        return this.date;
    }

    get_withdraw() {
        return this.withdraw;
    }

    get_profit() {
        return this.profit;
    }
}


function updateUsersPct() {
    var flg = false;
    if (total_fund == 0) {
        flg = true;
        total_fund = 1;
    }
    for (var key in users) {
        user_obj = users[key];
        user_fund = user_obj.fund;
        // console.log(key, user_fund, total_fund);
        user_obj.set_pct(user_fund / total_fund);
        // console.log(user_obj);
    }
    if (flg) {
        total_fund = 0;
    }
    addRowLog();
}

function addUser(user_name, fund) {


    var user_valid_name = user_name.toLowerCase();
    if(fund <= 0 || user_valid_name.length == 0){
        return;
    }

    if(users[user_valid_name] != undefined){
        addFund(user_valid_name, fund);
        return;
    }

    if(users_order.length == user_limit){
        alert("Maximum Users Limit has reached!(" + user_limit + ")");
        return
    }

    var date = new Date();
    var date_str = months[date.getMonth()] + ' ' + date.getFullYear();
    var user = new User(user_valid_name, fund, date_str);
    users[user_valid_name] = user;
    total_fund += fund;
    users_order.push(user_valid_name);
    addCellInFirstRow(user_valid_name);
    addCellInFirstRow("fund");
    addCellInFirstRow("pct");
    addCellInFirstRow("tax");
    addCellInFirstRow("withdraw");
    csv_header += "," + user_valid_name + ",Initial Fund,Fund,pct,tax,date,withdraw"
    updateUsersPct();
}

function addFund(user_name, fund) {

    var user_valid_name = user_name.toLowerCase();
    if(fund <= 0){
        return;
    }

    var user = users[user_valid_name];
    var user_fund = user.fund;
    user.set_initial_fund(user.get_initial_fund() + fund);
    user.set_fund(user_fund + fund);
    total_fund += fund;
    updateUsersPct();
}

function updateUsersFund() {
    for (var key in users) {
        user_obj = users[key];
        user_pct = user_obj.get_pct();
        user_obj.set_fund(total_fund * user_pct)
        // console.log(user_obj);
    }
    addRowLog()
}

function bookpnl(pnl) {
    total_fund += pnl;
    updateUsersFund()
}

function updateTotalFund(fund) {
    total_fund = fund;
    updateUsersFund()
}

function withdrawFund(user_name, fund) {

    var user_valid_name = user_name.toLowerCase();
    if(fund <= 0){
        return;
    }

    var user = users[user_valid_name];
    var user_fund = user.get_fund();
    // var total_withdraw = fund / (1 - fed_tax/100);
    // var user_tax = total_withdraw - fund;
    var user_initial_fund = user.get_initial_fund();
    var total_profit = user_fund - user_initial_fund;
    if (total_profit <= 0) {
        if (fund <= user_fund) {
            user.set_fund(user_fund - fund);
            user.set_withdraw(user.get_withdraw() + fund);
            user.set_initial_fund(user.get_initial_fund() - fund);
            updateUsersPct();
        return
        }
    }
    // console.log(user);
    if (fund <= total_profit * (1 - fed_tax / 100)) {
        var user_withdraw = fund / (1 - fed_tax / 100);
        var user_tax = user_withdraw - fund;
        console.log(user.get_fund(), user.get_initial_fund(), fund, total_profit);
        user.set_fund(user_fund - user_withdraw);
        user.set_tax(user.get_tax() + user_tax);
        user.set_withdraw(user.get_withdraw() + fund);
        // user.set_initial_fund(user.get_fund()); 
        // user_fund - user_withdraw - (user_fund - initial_fund) + user_withdraw
        // = initial_fund
        // user.set_initial_fund(user.get_fund() - total_profit + user_withdraw);
        user.set_initial_fund(user.get_initial_fund());
        console.log(user.get_fund(), user.get_initial_fund());
        total_fund -= user_withdraw;
        updateUsersPct();
        return
    }
    var user_tax = total_profit * fed_tax / 100;
    var user_withdraw = fund + user_tax;
    if (user_withdraw <= user_fund) {

        user.set_fund(user_fund - user_withdraw);
        user.set_withdraw(user.get_withdraw() + fund);
        user.set_tax(user.get_tax() + user_tax);
        user.set_initial_fund(user.get_fund());
        total_fund -= user_withdraw;
        updateUsersPct();
        return
    }

    // if(user_fund >= total_withdraw){
    //     var remaining_fund = user_fund - total_withdraw;
    //     var total_user_tax = user.get_tax();
    //     var total_user_withdraw = user.get_withdraw();
    //     user.set_fund(remaining_fund);
    //     user.set_withdraw(total_user_withdraw + fund);
    //     user.set_tax(total_user_tax + user_tax);
    //     total_fund -= total_withdraw;
    // }

}

function removeUser(user_name) {
    var user_valid_name = user_name.toLowerCase();
    var user = users[user_valid_name];
    var user_fund = user.get_fund();
    var user_initial_fund = user.get_initial_fund();
    var user_profit = user_fund - user_initial_fund;
    var user_tax = Math.max(user_profit * fed_tax / 100, 0);
    var user_withdraw = user_fund - user_tax;
    var total_user_tax = user.get_tax();
    var total_user_withdraw = user.get_withdraw();
    user.set_fund(0);
    user.set_withdraw(total_user_withdraw + user_withdraw);
    user.set_tax(total_user_tax + user_tax);
    user.set_initial_fund(0);
    total_fund -= user_fund;
    updateUsersPct()
}

function taxAllUsers() {
    if(total_fund == 0) return;
    for (var key in users) {
        var user_obj = users[key];
        var user_fund = user_obj.get_fund();
        var user_initial_fund = user_obj.get_initial_fund();
        var user_profit = user_fund - user_initial_fund;
        var user_tax = Math.max(user_profit * fed_tax / 100, 0);
        user_obj.set_fund(user_fund - user_tax);
        user_obj.set_tax(user_obj.get_tax() + user_tax);
        user_obj.set_initial_fund(user_obj.get_fund())
        total_fund -= user_tax;
        // console.log(user_obj);
    }
    updateUsersPct();
}

function round3(value) {
    return Math.round(value * 1000) / 1000
}


function Upload() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (true || regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var table = document.createElement("table");
                table.className = "rtable";
                var rows = e.target.result.split("\n");
                for (var i = 0; i < rows.length; i++) {
                    var cells = rows[i].split(",");
                    // console.log(cells);
                    if (cells.length > 1) {
                        var row = table.insertRow(-1);
                        for (var j = 0; j < cells.length; j++) {
                            var cell = row.insertCell(-1);
                            // console.log(cell, i);
                            cell.innerHTML = cells[j];
                        }
                    }
                }
                var dvCSV = document.getElementById("dvCSV");
                dvCSV.innerHTML = "";
                dvCSV.appendChild(table);
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}

function uploadCSV() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                setDefault()

                var rows = e.target.result.split("\n");
                // Header Cell Process
                csv_header = rows[0];
                var cells = csv_header.split(",");
                if (cells.length > 1){
                    for(var i = 1; i < cells.length; i+=7){
                        users_order.push(cells[i])
                        addCellInFirstRow(cells[i])
                        // addCellInFirstRow(cells[i+1])
                        addCellInFirstRow(cells[i+2])
                        addCellInFirstRow(cells[i+3])
                        addCellInFirstRow(cells[i+4])
                        // addCellInFirstRow(cells[i+5])
                        addCellInFirstRow(cells[i+6])
                    }
                }
                console.log(users_order);
                // Log Cells
                for (var i = 1; i < rows.length; i++) {
                    console.log(i, rows[i]);
                    var cells = rows[i].split(",");
                    // console.log(cells);
                    if (cells.length > 1) {
                        addNewRow();
                        csv_rows.push([])
                        var last_row = csv_rows.at(-1)
                        for (var j = 0; j < cells.length; j++) {
                            
                            var cellj = baseFormat(cells[j]);
                            console.log(j, cellj);
                            if((j-1) % 7 == 0){
                                addCell('');
                            }
                            else if ((j-1) % 7 == 2){
                                addCell(round3(cellj));
                            }
                            else if ((j-1) % 7 == 3){
                                addCell(round3(parseFloat(cellj)*100));
                            }
                            else if ((j-1) % 7 == 4){
                                addCell(round3(cellj));
                            }
                            else if ((j-1) % 7 == 6){
                                addCell(round3(cellj));
                            }
                            else if (j==0){
                                addCell(round3(cellj));
                            }
                            // else if ((j-1) % 7 == 5){
                            //     addCell(cellj);
                            // }
                            // else{
                            //     addCell(round3(cellj));
                            // }
                            last_row.push(cellj)
                                
                        }
                    }
                }
                
                // Last Cell to Users Object
                // user_name + ",Initial Fund,Fund,pct,tax,date,withdraw"
                var raw_cells = rows.at(-1).split(",");
                var cells = raw_cells.map(v => baseFormat(v))
                total_fund = parseFloat(baseFormat(cells[0]));
                console.log(cells, total_fund, cells.length, users_order);
                if (cells.length > 1){
                    for(var i = 0; i < users_order.length; i++){
                        console.log("here");
                        var user_name = users_order[i];
                        var user_profit = 0;
                        var user_initial_fund = parseFloat(cells[7*i + 2]);
                        var user_fund = parseFloat(cells[7*i + 3]);
                        var user_pct = parseFloat(cells[7*i + 4]);
                        var user_tax = parseFloat(cells[7*i + 5]);
                        var user_date = String(cells[7*i + 6]);
                        var user_withdraw = parseFloat(cells[7*i + 7]);
                        var user = new User(String(), 0, String());
                        
                        user.set_name(user_name);
                        user.set_profit(user_profit);
                        user.set_initial_fund(user_initial_fund);
                        user.set_fund(user_fund);
                        user.set_pct(user_pct);
                        user.set_tax(user_tax);
                        user.set_date(user_date);
                        user.set_withdraw(user_withdraw);
                        console.log(user);
                        users[user_name] = user;
                    }
                }
                console.log(users);
                showTable();
                // var dvCSV = document.getElementById("dvCSV");
                // dvCSV.innerHTML = "";
                // dvCSV.appendChild(table);
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}



function arrayToCsv(data) {
    return data.map(row =>
        row
            .map(String)  // convert every value to String
            .map(v => v.replaceAll('"', '""'))  // escape double colons
            .map(v => `"${v}"`)  // quote it
            .join(',')  // comma-separated
    ).join('\r\n');  // rows starting on new lines
}

/** Download contents as a file
 * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
 */
function downloadBlob(content, filename, contentType) {
    // Create a blob
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);

    // Create a link to download it
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
}
function downloadCSV() {
    if(csv_rows.length == 0) return;
    csv_dump = arrayToCsv(csv_rows);
    // console.log(csv_dump, csv_rows);
    downloadBlob(csv_header + "\n" + csv_dump, "nav" + counter + ".csv", 'text/csv;charset=utf-8;')
    counter++;
}
// let csv = arrayToCsv([
//     [1, '2', '"3"'],
//     [true, null, undefined],
// ]);
// console.log(csv);
// downloadBlob(csv, 'export.csv', 'text/csv;charset=utf-8;')

