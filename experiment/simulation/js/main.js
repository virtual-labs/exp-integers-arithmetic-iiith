"use strict";
const messages = [
    "Hover over the 4-bit table and Select any two rows to add",
    "Results are highlighted green and overflow is displayed in result table\nClick on 5-bit table to switch",
    "Click on reset to clear and restart anytime",
];
let mat = [];
let temp = [];
let toBeAdded = [];
let selectedRow = [];
let coloredIdx = [];
let flg2 = 1
let resultArray = [0, 0, 0, 0, 0];
let visitedArray = [0, 0, 0, 0, 0];
let resultArrayName = ['rowbinar', 'row2s', 'row1s', 'rowunsigned', 'rowsigned'];
let vis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let sameElemFlag = 0;
let glob = 0;
let afterAdd = 0;
let valComplement2 = 0;
let valComplement1 = 0;
let message = messages[0];
document.getElementById("message").innerHTML = message;

function addOverflow() {
    for (let i = 0; i < 5; i++) {
        console.debug(resultArray[i]);
    }
    console.debug("inside addrow id=")
    for (let i = 0; i < 5; i++) {
        let rowlet = document.getElementById(resultArrayName[i]);
        let newcell = rowlet.insertCell(-1);
        if (resultArray[i] === 0) {
            newcell.innerHTML = "overflow";
            newcell.style.fontSize = "x-small";
            newcell.style.backgroundColor = "rgb(164, 198, 82)";
            newcell.style.fontWeight = 'bolder';
        }
        visitedArray[i] = 1;
    }
}

function deleteRow() {
    for (let i = 0; i < 5; i++) {
        if (visitedArray[i] === 1) {
            document.getElementById(resultArrayName[i]).deleteCell(-1);
            visitedArray[i] = 0;
        }
    }
}

function mouseOver(event) {
    let indx = event.target.id
    if (vis[parseInt(indx)] === 0) {
        document.getElementById(indx).style.backgroundColor = '#c3d8ed';
    }
}

function mouseOut(event) {
    let indx = event.target.id
    if (vis[parseInt(indx)] === 0) {
        document.getElementById(indx).style.backgroundColor = 'transparent';
    }
}

function reset(event) {
    let flg = event.target.id;
    if (flg == "four-reset")
        vis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (flg == "five-reset") {
        flg2 = 2
        vis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    mat = [];
    temp = [];
    toBeAdded = [];
    document.getElementById('binar').innerHTML = '';
    document.getElementById('2s').innerHTML = '';
    document.getElementById('1s').innerHTML = '';
    document.getElementById('unsigned').innerHTML = '';
    document.getElementById('signed').innerHTML = '';
    if (glob != 0 || afterAdd === 1) {
        afterAdd = 0;
    }
    glob = 0;
    for (let i = 0; i < selectedRow.length; i++) {
        document.getElementById(selectedRow[i]).style.backgroundColor = 'transparent';
        document.getElementById(selectedRow[i]).style.color = 'black';

    }
    for (let i = 0; i < coloredIdx.length; i++) {
        document.getElementsByClassName(coloredIdx[i])[0].style.backgroundColor = 'transparent';
        document.getElementsByClassName(coloredIdx[i])[0].style.color = 'black';
    }
    selectedRow = [];
    coloredIdx = [];
    deleteRow();
    resultArray = [0, 0, 0, 0, 0];
    let message = messages[0];
    document.getElementById("message").innerHTML = message;
}

function addFunction() {
    if (glob === 2) {
        let ar1 = [];
        let ar2 = [];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < toBeAdded[i].length; j++) {
                if (i === 0) {
                    ar1.push(toBeAdded[i][j]);
                } else {
                    ar2.push(toBeAdded[i][j]);
                }
            }
        }
        bitAdd(ar1, ar2);
        glob = 0;
        toBeAdded = [];
        sameElemFlag = 0;
        afterAdd = 1;
    }
}

function rowSelection(event, flg) {
    let rowNum = event.target.id
    console.debug(" rowNum ", rowNum)
    if (glob === 0) {
        document.getElementById('binar').innerHTML = '';
        document.getElementById('2s').innerHTML = '';
        document.getElementById('1s').innerHTML = '';
        document.getElementById('unsigned').innerHTML = '';
        document.getElementById('signed').innerHTML = '';
        if (flg == '1')
            vis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (flg == '2') {
            flg2 = flg
            vis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        for (let i = 0; i < selectedRow.length; i++) {
            document.getElementById(selectedRow[i]).style.backgroundColor = 'transparent';
            document.getElementById(selectedRow[i]).style.color = 'black';

        }
        for (let i = 0; i < coloredIdx.length; i++) {
            document.getElementsByClassName(coloredIdx[i])[0].style.backgroundColor = 'transparent';
            document.getElementsByClassName(coloredIdx[i])[0].style.color = 'black';

        }
        selectedRow = [];
        coloredIdx = [];
        afterAdd = 0;
        deleteRow();
        resultArray = [0, 0, 0, 0, 0];
    }
    let table = ""
    if (flg == '1')
        table = document.getElementById("four-bit-table");
    if (flg == '2')
        table = document.getElementById("five-bit-table");
    for (let r = 1, n = table.rows.length; r < n; r++) {
        temp = [];
        for (let c = 0, m = table.rows[r].cells.length; c < m; c++) {
            temp.push(table.rows[r].cells[c].innerHTML);
        }
        mat.push(temp);

    }
    for (let r = 0; r < table.rows.length - 1; r++) {
        if (mat[r][0] === rowNum) {
            glob++;
            if (glob <= 2) {
                toBeAdded.push(mat[r][1]);
                vis[rowNum] = 1;
                selectedRow.push(rowNum);
                if (toBeAdded.length === 2) {
                    if (toBeAdded[0] === toBeAdded[1]) {
                        sameElemFlag = 1;
                    }
                }
                document.getElementById(rowNum).style.backgroundColor = '#5da0d1';
                let message = messages[0];
                document.getElementById("message").innerHTML = message;

            } else {
                toBeAdded.splice(1);
                glob = 2;
                if (sameElemFlag === 0) {
                    document.getElementById(selectedRow[1]).style.backgroundColor = 'transparent';
                    vis[selectedRow[1]] = 0;
                } else {
                    sameElemFlag = 0;
                }
                selectedRow.splice(1);
                selectedRow.push(rowNum);
                toBeAdded.push(mat[r][1]);
                if (toBeAdded[0] === toBeAdded[1]) {
                    sameElemFlag = 1;
                }
                document.getElementById(rowNum).style.backgroundColor = '#5da0d1';
                vis[rowNum] = 1;

            }

        }

    }
}
let carry = 0;

function bitAdd(a, b) {
    let c = [];
    for (let i = a.length - 1; i >= 0; i--) {
        if (a[i] === '1' && b[i] === '1') {
            if (carry === '1') {
                c.push('1');
            } else {
                c.push('0');
                carry = '1';
            }
        } else if ((a[i] === '0' && b[i] === '1') || (a[i] === '1' && b[i] === '0')) {
            if (carry === '1') {
                c.push('0');
            } else {
                c.push('1');
            }
        } else {
            if (carry === '1') {
                carry = '0';
                c.push('1');
            } else {
                c.push('0');
            }
        }

    }
    if (carry === '1') {
        c.push('1');
    }
    c.reverse();
    let str1 = "";
    for (let i = 0; i < c.length; i++) {
        str1 += c[i];
    }
    document.getElementById('unsigned').innerHTML = unsigned(str1);

    function unsigned(result) {
        let unsignValueue = 0;
        if (result[result.length - 1] === '1') {
            unsignValueue = 1;
        }
        for (let i = result.length - 2; i >= 0; i--) {
            if (result[i] === '1') {
                unsignValueue += Math.pow(2, result.length - 1 - i);
            }
        }
        return unsignValueue;
    }
    document.getElementById('signed').innerHTML = signed(str1);

    function signed(result) {
        let signValueue = 0;
        let sign = "";
        if (a[0] === b[0] && result[0] != a[0]) {
            signValueue = unsigned(str1);
        } else {
            if (result[result.length - 1] === '1') {
                signValueue = 1;
            }
            for (let i = result.length - 2; i >= 0; i--) {
                if (result[i] === '1' && i != 0) {
                    signValueue += Math.pow(2, result.length - 1 - i);
                }
                if (i === 0) {
                    if (result[i] === '1') {
                        sign = "-";
                    }
                }
            }
            if (signValueue === 0) {
                sign = "";
            }
        }
        signValueue = sign + signValueue;

        return signValueue;
    }
    onesComplement(str1);

    function onesComplement(result) {
        let complement1 = "";
        valComplement1 = 0;
        if (a[0] === b[0] && result[0] != a[0]) {
            console.debug("hi there i am here");
            valComplement1 = unsigned(str1);
            valComplement2 = valComplement1;
        } else {
            if (result[0] === '0') {
                valComplement1 = unsigned(result);
                valComplement2 = valComplement1;
            } else {
                for (let i = 0; i < result.length; i++) {
                    if (result[i] === '0') {
                        complement1 += "1";
                    } else {
                        complement1 += "0";
                    }

                }
                valComplement1 = "-" + unsigned(complement1);
                if (unsigned(complement1) === 0) {
                    valComplement1 = 0;
                }
                twosComplement(complement1);
            }
        }
    }

    function setGreenColor(a, idx, strin) {
        let flag = 0;
        let length = 16
        if (a == 2)
            length = 32
        for (let i = 0; i < length; i++) {
            if (mat[i][idx] === strin) {
                let index = (100 * (i + 1) + idx);
                console.debug("green ", index)
                coloredIdx.push(index);
                document.getElementsByClassName(index)[0].style.backgroundColor = 'rgb(164, 198, 82)';
                document.getElementsByClassName(index)[0].style.color = 'white';
                flag = 1;
                break;
            }
        }
        return flag;
    }


    function twosComplement(result) {
        let complement = [];
        let complement2 = "";
        valComplement2 = 0;
        carry = 1;
        for (let i = result.length - 1; i >= 0; i--) {
            if (carry === 0) {
                if (result[i] === "0") {
                    complement.push("0");
                    carry = 0;
                } else {
                    complement.push("1");
                    carry = 0;
                }
            } else if (carry === 1) {
                if (result[i] === "0") {
                    complement.push("1");
                    carry = 0;
                } else {
                    complement.push("0");
                    carry = 1;
                }
            }
            if (i === 0) {
                complement.reverse()
                for (let j = 0; j < complement.length; j++) {
                    complement2 += complement[j];
                }
                if (carry === 1) {
                    complement2 = "1" + complement2;
                }
            }
        }
        valComplement2 = "-" + unsigned(complement2);
    }
    document.getElementById('binar').innerHTML = str1;
    document.getElementById('2s').innerHTML = valComplement2;
    document.getElementById('1s').innerHTML = valComplement1;
    resultArray[0] = setGreenColor(flg2, 1, document.getElementById('binar').innerHTML);
    resultArray[1] = setGreenColor(flg2, 2, document.getElementById('2s').innerHTML);
    resultArray[2] = setGreenColor(flg2, 3, document.getElementById('1s').innerHTML);
    resultArray[3] = setGreenColor(flg2, 4, document.getElementById('unsigned').innerHTML);
    resultArray[4] = setGreenColor(flg2, 5, document.getElementById('signed').innerHTML);
    addOverflow();
    let message = messages[1];
    document.getElementById("message").innerHTML = message;

}