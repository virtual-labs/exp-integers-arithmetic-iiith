mat = []
temp = []
tobeadded = []
selectedrow = []
coloredidx = []
resultarray = [0,0,0,0,0]
visitedarray = [0,0,0,0,0] 
resultarrayname = ['rowbinar','row2s','row1s','rowunsigned','rowsigned']
vis = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
sameelemflag = 0
let glob = 0
let flag = 0
let afteradd = 0

function active_switch(switch_from)
{
    if(switch_from=="five-switch")
    {
        console.log('why is this"what is this?')
        $(document.getElementById(switch_from)).hide()
        $(document.getElementById('four-switch')).show()
    }
    else
    {
        $(document.getElementById(switch_from)).hide()
        $(document.getElementById('five-switch')).show()
    }

}

function addoverflow()
{
    for (var i=0;i<5;i++)
    {
        console.log(resultarray[i])
    }
    console.log("inside addrow id=")
    for (var i=0;i<5;i++)
    {
        if (resultarray[i]==0)
        {
            console.log("element to change")
            console.log(resultarrayname[i])
            rowvar = document.getElementById(resultarrayname[i])
            console.log(rowvar)
            newcell = rowvar.insertCell(-1)
            newcell.innerHTML="overflow"
            newcell.style.fontSize = "x-small" 
            newcell.style.backgroundColor="red"
            visitedarray[i]=1            
        }
    }

}
// function addmessagetable(indx)
// {
//     document.getElementById(1000+indx).innerHTML="Overflow"
// }
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
    // console.log("inside mouseover")
    // console.log(vis[indx])
    // console.log("indx=",indx)
    if(vis[parseInt(indx)]==0)
    {
        // console.log("inside if of mouseover")
    document.getElementById(indx).style.backgroundColor='yellow'
    }
}
function mouseOut(indx)
{
    // console.log("inside mouseout")
    // console.log(vis[parseInt(indx)])
    // console.log("indx=",indx)
    if (vis[parseInt(indx)]==0)
    {
        // console.log("inside if of mouseout")
    document.getElementById(indx).style.backgroundColor='transparent'
    }
}
function reset()
{
    vis = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    // console.log("inside reset")
    // console.log("array size=",selectedrow.size)
    mat = []
    temp = []
    tobeadded = []
    document.getElementById('binar').innerHTML=''
    document.getElementById('2s').innerHTML=''
    document.getElementById('1s').innerHTML=''
    document.getElementById('unsigned').innerHTML=''
    document.getElementById('signed').innerHTML=''
    // selectedrow = []
    if (glob!=0||afteradd==1)
    {
    //deleterow()
    afteradd=0
    }
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
    resultarray = [0,0,0,0,0]
   

}
function addfunc()
{
    // console.log("glob inside add is",glob)
    if (glob==2)
    {
        ar1 = []
        ar2 = []
        // console.log("printing numbers to be added")
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
            // s
        }
        // console.log("ar1=",ar1)
        // console.log("ar2=",ar2)
        bitadd(ar1,ar2)
        glob = 0
        tobeadded = []
        sameelemflag=0
        afteradd=1
    }
}
function myfunction(a1)
{
    
    // console.log("size=",selectedrow.length)
    if (glob==0)
    {
        document.getElementById('binar').innerHTML=''
        document.getElementById('2s').innerHTML=''
        document.getElementById('1s').innerHTML=''
        document.getElementById('unsigned').innerHTML=''
        document.getElementById('signed').innerHTML=''
        vis = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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
        //addrow()
        afteradd=0
        deleterow()
        resultarray = [0,0,0,0,0]
    }
    
    // console.log(document.getElementById(a1))
    // console.log("hi")
    // console.log(a1)
    // console.log(Document.getElementById("tabledata"))
    let table= document.getElementById("four-bit-table")
   // console.log(table.rows.length)

    for (let r=1,n=table.rows.length;r<n ; r++)
    {
        temp = []
        for (let c = 0, m = table.rows[r].cells.length; c < m; c++)
        {
            temp.push(table.rows[r].cells[c].innerHTML)
        }
        mat.push(temp)
        
    }
    //  console.log("printing")
    //  for (var i=0;i<mat.length;i++)
    //  {
    //      for (var j=0;j<mat[i].length;j++)
    //      {
    //          console.log(mat[i][j]," ")
    //      }
    //      console.log('\n')
        
    //  }
    for (let r=0;r<table.rows.length-1;r++)
    {
       // for (let c =0;c<table.rows[r].cells.length;c++)
       // {
            if (mat[r][0]==a1)
            {
                glob++
                if (glob<=2)
                {
                    // console.log("glob=",glob)
                    // console.log(mat[r][0])
               // console.log(mat[r][1])
                    tobeadded.push(mat[r][1])
                    vis[a1]=1
                    selectedrow.push(a1)
                    if(tobeadded.length==2)
                    {
                        if (tobeadded[0]==tobeadded[1])
                        {
                            // console.log("enter same element")
                            sameelemflag=1
                        }
                    }
                    document.getElementById(a1).style.backgroundColor='orange'
                }
                else
                {
                    // console.log("inside else")
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
                        // console.log("enter same element")
                        sameelemflag=1
                    }
                    document.getElementById(a1).style.backgroundColor='orange'
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
        //console.log("i=",i,"a[i]=",a[i],"b[i]=",b[i])
        if (a[i]==='1' && b[i]==='1')
        {
            //console.log("i=",i,"enterhere")
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
            // console.log("i=",i,"in else part")
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
            // console.log("hi there i am here")
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
        // console.log(signval)

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
        // console.log(strin)
        // console.log("inside sestgreeon color")
        for (var i=0;i<16;i++)
        {
            // console.log(mat[i][idx])
            if(mat[i][idx]==strin)
             {
                //  console.log("found")
                 var index = (100*(i+1)+idx)
                 coloredidx.push(index)
                //  console.log(mat[i][idx])
                 document.getElementById(index).style.backgroundColor='green'
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
    document.getElementById('binar').innerHTML = str1
    document.getElementById('2s').innerHTML = valcomplement2
    document.getElementById('1s').innerHTML = valcomplement1
    resultarray[0]=setgreencolor(1,document.getElementById('binar').innerHTML)
    resultarray[1]=setgreencolor(2,document.getElementById('2s').innerHTML)
    resultarray[2]=setgreencolor(3,document.getElementById('1s').innerHTML)
    resultarray[3]=setgreencolor(4,document.getElementById('unsigned').innerHTML)
    resultarray[4]=setgreencolor(5,document.getElementById('signed').innerHTML)
    addoverflow()
   // setgreencolor(1,str1)
    // for (var i=0;i<mat[0].length;i++)
    // {
    //     console.log(mat[0][i])
    // }
    // console.log(mat[0].indexOf(str1))
    
    

}