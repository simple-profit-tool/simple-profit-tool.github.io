function displayShowHide() {
    document.getElementById("NAVOptions").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    }
    }
}
}

function updateUploadDownload(){

    var content = "<button onclick=\"downloadCSV()\" id=\"csvDownload\">Download</button>";
    content += "<label for=\"fileUpload\" class=\"custom-file-upload\"> Select File </label>";
    content += "<input type=\"file\" id=\"fileUpload\" accept=\".csv, .txt\" hidden/>";
    content += "<span id=\"file-chosen\">No file chosen</span>";
    content += "<input type=\"button\" id=\"upload\" value=\"Upload\" onclick=\"uploadCSV()\" />";
    document.getElementById("processBar").innerHTML = content;
    const actualBtn = document.getElementById('fileUpload');

    const fileChosen = document.getElementById('file-chosen');

    actualBtn.addEventListener('change', function(){
    fileChosen.textContent = this.files[0].name

    // document.getElementById("actionButton").innerHTML = "<input type=\"button\" id=\"upload\" value=\"Upload\" onclick=\"uploadCSV()\" />";
    // document.getElementById('csvDownload').focus();
})
}

function updateAddUserContent(){
    var content = "<input type=\"text\" id=\"addUserUserName\" placeholder=\"Name\"/>";
    content += "<input type=\"number\" id=\"addUserFundValue\" step=\"100\" min=\"0\" placeholder=\"Fund\"/>";
    content += "<button onclick=\"addUserUtil()\">Add User</button>";
    document.getElementById("processBar").innerHTML = content;
    // document.getElementById("actionButton").innerHTML = "<button onclick=\"addUserUtil()\">Add User</button>";
    document.getElementById("addUserUserName").focus()
    
}

function updateAddFundContent(){
    var content = "<input type=\"text\" id=\"addFundUserName\" placeholder=\"Name\"/>";
    content += "<input type=\"number\" id=\"addFundFundValue\" step=\"100\" min=\"0\" placeholder=\"Fund\"/>";
    content += "<button onclick=\"addFundUtil()\">Add Fund</button>";
    document.getElementById("processBar").innerHTML = content;
    document.getElementById("addFundUserName").focus()
}

function updateWithdrawFundContent(){
    var content = "<input type=\"text\" id=\"WithdrawFundUserName\" placeholder=\"Name\"/>";
    content += "<input type=\"number\" id=\"WithdrawFundFundValue\" step=\"100\" min=\"0\" placeholder=\"Fund\"/>";
    content += "<button onclick=\"withdrawFundUtil()\">Withdraw Fund</button>";
    document.getElementById("processBar").innerHTML = content;
    document.getElementById("WithdrawFundUserName").focus()
}

function updateWithdrawUserAllContent(){
    var content = "<input type=\"text\" id=\"withdrawAllFundUserName\" placeholder=\"Name\"/>";
    content += "<button onclick=\"withdrawAllUtil()\">Withdraw</button>";
    document.getElementById("processBar").innerHTML = content;
    document.getElementById("withdrawAllFundUserName").focus()
}

function updatePNLContent(){
    var content = "<input type=\"number\" id=\"updatePNLPNLValue\" step=\"100\" placeholder=\"PNL\"/>";
    content += "<button onclick=\"updatePNLUtil()\">Update PNL</button>";
    document.getElementById("processBar").innerHTML = content;
    document.getElementById("updatePNLPNLValue").focus()
}

function updateTotalFundContent(){
    var content = "<input type=\"number\" id=\"updateTotalFundFundValue\" step=\"100\" placeholder=\"Total Fund\"/>";
    content += "<button onclick=\"updateTotalFundUtil()\">Update Total Fund</button>";
    document.getElementById("processBar").innerHTML = content;
    document.getElementById("updateTotalFundFundValue").focus()
}



function addUserUtil() {
    var user_name = document.getElementById("addUserUserName").value;
    var fund = parseFloat(document.getElementById("addUserFundValue").value);
    if(isNaN(fund)){
        document.getElementById("addUserFundValue").focus();
        return;
    }
    addUser(user_name, fund);
}

function addFundUtil() {
    var user_name = document.getElementById("addFundUserName").value;
    var fund = parseFloat(document.getElementById("addFundFundValue").value);
    if(isNaN(fund)){
        document.getElementById("addFundFundValue").focus();
        return;
    }
    addFund(user_name, fund);
}

function withdrawFundUtil() {
    var user_name = document.getElementById("WithdrawFundUserName").value;
    var fund = parseFloat(document.getElementById("WithdrawFundFundValue").value);
    if(isNaN(fund)){
        document.getElementById("WithdrawFundFundValue").focus();
        return;
    }
    withdrawFund(user_name, fund);
}

function withdrawAllUtil() {
    var user_name = document.getElementById("withdrawAllFundUserName").value;
    removeUser(user_name);
}

function updatePNLUtil() {
    var pnl = parseFloat(document.getElementById("updatePNLPNLValue").value);
    if(isNaN(pnl)){
        document.getElementById("updatePNLPNLValue").focus();
        return;
    }
    bookpnl(pnl);
}

function updateTotalFundUtil() {
    var fund = parseFloat(document.getElementById("updateTotalFundFundValue").value);
    if(isNaN(fund)){
        document.getElementById("updateTotalFundFundValue").focus();
        return;
    }
    updateTotalFund(fund);
}

function taxAllUtil() {
    taxAllUsers();
}
