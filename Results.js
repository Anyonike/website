function addrow() {
	// body...
	var table=
	document.getElementById("students");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);
	var cell7 = row.insertCell(6);
	var cell8 = row.insertCell(7);
	var cell9 = row.insertCell(8);
	cell1.innerHTML = "";
	cell2.innerHTML = "";
	cell3.innerHTML = "";
	cell4.innerHTML = "";
	cell5.innerHTML = "";
	cell6.innerHTML = "";
	cell7.innerHTML = "";
	cell8.innerHTML = "";
	cell9.innerHTML = "";
} 
function delrow()
{
	var table=
	getElementById("students");
		table.deleteRow(-1)
}
