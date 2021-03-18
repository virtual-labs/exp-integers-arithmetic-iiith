let messages=[
"Hover over the 5-bit table and Select any two rows to add",
"Results are highlighted green and overflow is diplayed in result table\nClick on 4-bit table to switch",
"Click on reset to clear and restart anytime",
]
mat = []
temp = []
tobeadded = []
selectedrow = []
coloredidx = []
resultarray = [0,0,0,0,0]
visitedarray = [0,0,0,0,0] 
resultarrayname = ['rowbinar','row2s','row1s','rowunsigned','rowsigned']
vis = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
sameelemflag = 0
let glob = 0
let flag = 0
let message = messages[0].fontsize("3%");
document.getElementById("message").innerHTML = message;

function addoverflow()
{
    for (var i=0;i<5;i++)
    {
        console.log(resultarray[i])
    }
    console.log("inside addrow id=")
    for (var i=0;i<5;i++)
    {
        rowvar = document.getElementById(resultarrayname[i])
        newcell = rowvar.insertCell(-1)
        if(resultarray[i]==0){
            newcell.innerHTML="overflow"
            newcell.style.fontSize = "x-small" 
            newcell.style.backgroundColor="#ff3a3a"
        }
            visitedarray[i]=1            
    }

}
function deleterow()
{
    for (var i=0;i<5;i++)
    {
        if (visitedarray[i]==1)
        {
            document.getElementById(resultarrayname[i]).deleteCell(-1)
            visitedarray[i]=0
        }
    }

}
function mouseOver(indx)
{
    if(vis[parseInt(indx)]==0)
    {
        document.getElementById(indx).style.backgroundColor='#FFFF28'
    }
}
function mouseOut(indx)
{
    if (vis[parseInt(indx)]==0)
    {
        document.getElementById(indx).style.backgroundColor='transparent'
    }
}
function reset()
{
    vis = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    mat = []
    temp = []
    tobeadded = []
    document.getElementById('binar').innerHTML=''
    document.getElementById('2s').innerHTML=''
    document.getElementById('1s').innerHTML=''
    document.getElementById('unsigned').innerHTML=''
    document.getElementById('signed').innerHTML=''
    glob=0
    for (var i=0;i<selectedrow.length;i++)
    {
        document.getElementById(selectedrow[i]).style.backgroundColor='transparent'
        
    }
    for (var i=0;i<coloredidx.length;i++)
    {
        document.getElementById(coloredidx[i]).style.backgroundColor='transparent'
    }
    selectedrow = []
    coloredidx = []
    deleterow()
    resultarray = [0,0,0,0,0];
    let message = messages[0].fontsize("3%");
    document.getElementById("message").innerHTML = message;  


}
function addfunc()
{
    if (glob==2)
    {
        ar1 = []
        ar2 = []
        for (let i=0;i<tobeadded.length;i++)
        {

            // console.log(tobeadded[i])
        }
        for (let i = 0;i<2;i++)
        {
            for (let j =0; j<tobeadded[i].length;j++)
            {
                if (i==0)
                {
                ar1.push(tobeadded[i][j])
                }
                else
                {
                    ar2.push(tobeadded[i][j]) 
                }
            }
        }
        bitadd(ar1,ar2)
        glob = 0
        tobeadded = []
        sameelemflag=0
        
    }
}
function myfunction(a1)
{
    if (glob==0)
    {
        document.getElementById('binar').innerHTML=''
        document.getElementById('2s').innerHTML=''
        document.getElementById('1s').innerHTML=''
        document.getElementById('unsigned').innerHTML=''
        document.getElementById('signed').innerHTML=''
        vis = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        for (var i=0;i<selectedrow.length;i++)
        {
        document.getElementById(selectedrow[i]).style.backgroundColor='transparent'
        
        }
        for (var i=0;i<coloredidx.length;i++)
        {
        document.getElementById(coloredidx[i]).style.backgroundColor='transparent'
        }
        selectedrow = []
        coloredidx = []
        deleterow()
        resultarray = [0,0,0,0,0]
    }
    
    console.log("hi")
    console.log(a1)
    let table= document.getElementById("five-bit-table")

    for (let r=1,n=table.rows.length;r<n ; r++)
    {
        temp = []
        for (let c = 0, m = table.rows[r].cells.length; c < m; c++)
        {
            temp.push(table.rows[r].cells[c].innerHTML)
        }
        mat.push(temp)
        
    }
    for (let r=0;r<table.rows.length-1;r++)
    {
            if (mat[r][0]==a1)
            {
                glob++
                if (glob<=2)
                {
                    tobeadded.push(mat[r][1])
                    vis[a1]=1
                    selectedrow.push(a1)
                    if(tobeadded.length==2)
                    {
                        if (tobeadded[0]==tobeadded[1])
                        {
                            sameelemflag=1
                        }
                    }
                    document.getElementById(a1).style.backgroundColor='rgb(252, 126, 139)'
                }
                else
                {
                    tobeadded.splice(1)
                    glob=2
                    if(sameelemflag==0)
                    {
                    document.getElementById(selectedrow[1]).style.backgroundColor='transparent'
                    vis[selectedrow[1]]=0
                    }
                    else{
                        sameelemflag=0
                    }
                    selectedrow.splice(1)
                    selectedrow.push(a1)
                    tobeadded.push(mat[r][1])
                    if (tobeadded[0]==tobeadded[1])
                    {
                        sameelemflag=1
                    }
                    document.getElementById(a1).style.backgroundColor='rgb(252, 126, 139)'
                    vis[a1]=1

                }
                
            }
        
    }
}
carry = 0
function bitadd(a,b)
{
    c = []
    for (i=a.length-1;i>=0;i--)
    {
        if (a[i]==='1' && b[i]==='1')
        {
            if (carry==='1')
            {
                c.push('1')
            }
            else
            {
                c.push('0')
                carry = '1'
            }
        }
        else if ((a[i]==='0' && b[i]==='1') ||(a[i]==='1' && b[i]==='0') )
        {
            if (carry==='1')
            {
                c.push('0')
            }
            else
            {
                c.push('1')
            }
        }
        else
        {
            if (carry === '1')
            {
                carry='0'
                c.push('1')
            }
            else
            {
                c.push('0')
            }
        }

    }
    if (carry==='1')
        {
            c.push('1')
        }
    c.reverse()
    str1 = ""
    for(let i=0;i<c.length;i++)
    {
        str1+=c[i]
    }
    document.getElementById('unsigned').innerHTML = unsigned(str1)
    function unsigned(result)
    {
        unsignval = 0
        if (result[result.length - 1] == '1')
        {
            unsignval = 1
        }  
        for(i = result.length - 2; i >= 0; i--)
        {
            if(result[i] == '1')
            {
                unsignval += Math.pow(2,result.length - 1 - i)
            }
        }
        return unsignval
    }
    document.getElementById('signed').innerHTML = signed(str1)
    function signed(result)
    {
        signval = 0
        sign = ""
        if(a[0] == b[0] && result[0] != a[0])
        {
            signval = unsigned(str1) 
        }
        else
        {
            if (result[result.length - 1] == '1')
            {
                signval = 1
            }  
            for(i = result.length - 2; i >= 0; i--)
            {
                if(result[i] == '1' && i != 0)
                {
                    signval += Math.pow(2,result.length - 1 - i)
                }
                if(i == 0)
                {
                    if(result[i] == '1')
                    {
                        sign = "-"
                    }
                }
            }
            if(signval == 0)
            {
                sign = ""
            }
        }
        signval = sign + signval
        return signval
    }

    onescomplement(str1)
    function onescomplement(result)
    {
        complement1 = ""
        valcomplement1 = 0
        if(a[0] == b[0] && result[0] != a[0])
        {
            console.log("hi there i am here")
            valcomplement1 = unsigned(str1) 
            valcomplement2 = valcomplement1
        }
        else
        {
            if(result[0] == '0')
            {
                valcomplement1 = unsigned(result)
                valcomplement2 = valcomplement1
            }
            else
            {
                for (i = 0; i < result.length; i++)
                {
                    if(result[i] == '0')
                    {
                        complement1+="1"
                    }
                    else
                    {
                        complement1+="0"
                    }

                }
                valcomplement1 = "-" + unsigned(complement1)
                if(unsigned(complement1) == 0)
                {
                    valcomplement1 = 0
                }
                twoscomplement(complement1)
            }
        }
        
    }
    function setgreencolor(idx,strin)
    {
        flag = 0
        for (var i=0;i<32;i++)
        {
            if(mat[i][idx]==strin)
             {
                 var index = (100*(i+1)+idx)
                 coloredidx.push(index)
                 document.getElementById(index).style.backgroundColor='rgb(157, 253, 171)'
                 flag = 1
                 break
             }
        }
        return flag
    }
    function twoscomplement(result)
    {
        complement = []
        complement2 = ""
        valcomplement2 = 0
        carry = 1
        for (i = result.length - 1; i >= 0; i--)
        {
            if (carry == 0)
            {
                if(result[i] == "0")
                {
                    complement.push("0")
                    carry = 0
                }
                else
                {
                    complement.push("1")
                    carry = 0
                }
            }
            else if(carry == 1)
            {
                if(result[i] == "0")
                {
                    complement.push("1")
                    carry = 0
                }
                else
                {
                    complement.push("0")
                    carry = 1
                }
            }
            if(i == 0)
            {   complement.reverse()
                for(j = 0; j < complement.length; j++)
                {
                    complement2 += complement[j]
                }
                if(carry == 1)
                {
                    complement2 = "1" + complement2
                }
            }
        }
        valcomplement2 = "-" + unsigned(complement2)
    }
    console.log("inside add part")
    document.getElementById('binar').innerHTML = str1
    document.getElementById('2s').innerHTML = valcomplement2
    document.getElementById('1s').innerHTML = valcomplement1
    resultarray[0]=setgreencolor(1,document.getElementById('binar').innerHTML)
    resultarray[1]=setgreencolor(2,document.getElementById('2s').innerHTML)
    resultarray[2]=setgreencolor(3,document.getElementById('1s').innerHTML)
    resultarray[3]=setgreencolor(4,document.getElementById('unsigned').innerHTML)
    resultarray[4]=setgreencolor(5,document.getElementById('signed').innerHTML)
    addoverflow();
    let message = messages[1].fontsize("3%");
    document.getElementById("message").innerHTML = message;
}