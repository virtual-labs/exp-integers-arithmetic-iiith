"use strict";
const messages = [
    "Hover over the 4-bit table and Select any two rows to add",
    "Results are highlighted green and overflow is displayed in result table\nClick on 5-bit table to switch",
    "Click on reset to clear and restart anytime",
];
let mat = [];
let temp = [];
let ToBeAdded = [];
let SelectedRow = [];
let ColoredIdx = [];
let ResultArray = [0, 0, 0, 0, 0];
let VisitedArray = [0, 0, 0, 0, 0];
let ResultArrayname = ['rowbinar', 'row2s', 'row1s', 'rowunsigned', 'rowsigned'];
let vis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let SameElemFlag = 0;
let glob = 0;
let flag = 0;
let afteradd = 0;
let valcomplement2 = 0;
let valcomplement1 = 0;
let message = messages[0];
document.getElementById("message").innerHTML = message;

function addoverflow() {
    for (let i = 0; i < 5; i++) {
        console.debug(ResultArray[i]);
    }
    console.debug("inside addrow id=")
    for (let i = 0; i < 5; i++) {
        let rowlet = document.getElementById(ResultArrayname[i]);
        let newcell = rowlet.insertCell(-1);
        if (ResultArray[i] === 0) {
            newcell.innerHTML = "overflow";
            newcell.style.fontSize = "x-small";
            newcell.style.backgroundColor = "rgb(164, 198, 82)";
            newcell.style.fontWeight = 'bolder';
        }
        VisitedArray[i] = 1;
    }

}

function deleterow() {
    for (let i = 0; i < 5; i++) {
        if (VisitedArray[i] === 1) {
            document.getElementById(ResultArrayname[i]).deleteCell(-1);
            VisitedArray[i] = 0;
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

function reset() {
    vis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    mat = [];
    temp = [];
    ToBeAdded = [];
    document.getElementById('binar').innerHTML = '';
    document.getElementById('2s').innerHTML = '';
    document.getElementById('1s').innerHTML = '';
    document.getElementById('unsigned').innerHTML = '';
    document.getElementById('signed').innerHTML = '';
    if (glob != 0 || afteradd === 1) {
        afteradd = 0;
    }
    glob = 0;
    for (let i = 0; i < SelectedRow.length; i++) {
        document.getElementById(SelectedRow[i]).style.backgroundColor = 'transparent';

    }
    for (let i = 0; i < ColoredIdx.length; i++) {
        document.getElementsByClassName(ColoredIdx[i])[0].style.backgroundColor = 'transparent';
    }
    SelectedRow = [];
    ColoredIdx = [];
    deleterow();
    ResultArray = [0, 0, 0, 0, 0];
    let message = messages[0];
    document.getElementById("message").innerHTML = message;

}

function addfunc() {
    if (glob === 2) {
        let ar1 = [];
        let ar2 = [];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < ToBeAdded[i].length; j++) {
                if (i === 0) {
                    ar1.push(ToBeAdded[i][j]);
                } else {
                    ar2.push(ToBeAdded[i][j]);
                }
            }
        }
        bitadd(ar1, ar2);
        glob = 0;
        ToBeAdded = [];
        SameElemFlag = 0;
        afteradd = 1;
    }
}

function rowSelection(event) {
    let RowNum = event.target.id
    console.debug(" rowNum ", RowNum)
    if (glob === 0) {
        document.getElementById('binar').innerHTML = '';
        document.getElementById('2s').innerHTML = '';
        document.getElementById('1s').innerHTML = '';
        document.getElementById('unsigned').innerHTML = '';
        document.getElementById('signed').innerHTML = '';
        vis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < SelectedRow.length; i++) {
            document.getElementById(SelectedRow[i]).style.backgroundColor = 'transparent';
            document.getElementById(SelectedRow[i]).style.color = 'black';

        }
        for (let i = 0; i < ColoredIdx.length; i++) {
            document.getElementsByClassName(ColoredIdx[i])[0].style.backgroundColor = 'transparent';
            document.getElementsByClassName(ColoredIdx[i])[0].style.color = 'black';

        }
        SelectedRow = [];
        ColoredIdx = [];
        afteradd = 0;
        deleterow();
        ResultArray = [0, 0, 0, 0, 0];
    }

    let table = document.getElementById("four-bit-table");
    for (let r = 1, n = table.rows.length; r < n; r++) {
        temp = [];
        for (let c = 0, m = table.rows[r].cells.length; c < m; c++) {
            temp.push(table.rows[r].cells[c].innerHTML);
        }
        mat.push(temp);

    }
    for (let r = 0; r < table.rows.length - 1; r++) {
        if (mat[r][0] === RowNum) {
            glob++;
            if (glob <= 2) {
                ToBeAdded.push(mat[r][1]);
                vis[RowNum] = 1;
                SelectedRow.push(RowNum);
                if (ToBeAdded.length === 2) {
                    if (ToBeAdded[0] === ToBeAdded[1]) {
                        SameElemFlag = 1;
                    }
                }
                document.getElementById(RowNum).style.backgroundColor = '#5da0d1';
                let message = messages[0];
                document.getElementById("message").innerHTML = message;

            } else {
                ToBeAdded.splice(1);
                glob = 2;
                if (SameElemFlag === 0) {
                    document.getElementById(SelectedRow[1]).style.backgroundColor = 'transparent';
                    vis[SelectedRow[1]] = 0;
                } else {
                    SameElemFlag = 0;
                }
                SelectedRow.splice(1);
                SelectedRow.push(RowNum);
                ToBeAdded.push(mat[r][1]);
                if (ToBeAdded[0] === ToBeAdded[1]) {
                    SameElemFlag = 1;
                }
                document.getElementById(RowNum).style.backgroundColor = '#5da0d1';
                vis[RowNum] = 1;

            }

        }

    }
}
let carry = 0;

function bitadd(a, b) {
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
        let unsignval = 0;
        if (result[result.length - 1] === '1') {
            unsignval = 1;
        }
        for (let i = result.length - 2; i >= 0; i--) {
            if (result[i] === '1') {
                unsignval += Math.pow(2, result.length - 1 - i);
            }
        }
        return unsignval;
    }
    document.getElementById('signed').innerHTML = signed(str1);

    function signed(result) {
        let signval = 0;
        let sign = "";
        if (a[0] === b[0] && result[0] != a[0]) {
            signval = unsigned(str1);
        } else {
            if (result[result.length - 1] === '1') {
                signval = 1;
            }
            for (let i = result.length - 2; i >= 0; i--) {
                if (result[i] === '1' && i != 0) {
                    signval += Math.pow(2, result.length - 1 - i);
                }
                if (i === 0) {
                    if (result[i] === '1') {
                        sign = "-";
                    }
                }
            }
            if (signval === 0) {
                sign = "";
            }
        }
        signval = sign + signval;

        return signval;
    }
    onescomplement(str1);

    function onescomplement(result) {
        let complement1 = "";
        valcomplement1 = 0;
        if (a[0] === b[0] && result[0] != a[0]) {
            console.debug("hi there i am here");
            valcomplement1 = unsigned(str1);
            valcomplement2 = valcomplement1;
        } else {
            if (result[0] === '0') {
                valcomplement1 = unsigned(result);
                valcomplement2 = valcomplement1;
            } else {
                for (let i = 0; i < result.length; i++) {
                    if (result[i] === '0') {
                        complement1 += "1";
                    } else {
                        complement1 += "0";
                    }

                }
                valcomplement1 = "-" + unsigned(complement1);
                if (unsigned(complement1) === 0) {
                    valcomplement1 = 0;
                }
                twoscomplement(complement1);
            }
        }

    }

    function setgreencolor(idx, strin) {
        let flag = 0;
        for (let i = 0; i < 16; i++) {
            if (mat[i][idx] === strin) {
                let index = (100 * (i + 1) + idx);
                console.debug("green ", index)
                ColoredIdx.push(index);
                document.getElementsByClassName(index)[0].style.backgroundColor = 'rgb(164, 198, 82)';
                document.getElementsByClassName(index)[0].style.color = 'white';
                flag = 1;
                break;
            }
        }
        return flag;
    }


    function twoscomplement(result) {
        let complement = [];
        let complement2 = "";
        valcomplement2 = 0;
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
        valcomplement2 = "-" + unsigned(complement2);
    }
    document.getElementById('binar').innerHTML = str1;
    document.getElementById('2s').innerHTML = valcomplement2;
    document.getElementById('1s').innerHTML = valcomplement1;
    ResultArray[0] = setgreencolor(1, document.getElementById('binar').innerHTML);
    ResultArray[1] = setgreencolor(2, document.getElementById('2s').innerHTML);
    ResultArray[2] = setgreencolor(3, document.getElementById('1s').innerHTML);
    ResultArray[3] = setgreencolor(4, document.getElementById('unsigned').innerHTML);
    ResultArray[4] = setgreencolor(5, document.getElementById('signed').innerHTML);
    addoverflow();
    let message = messages[1];
    document.getElementById("message").innerHTML = message;

}