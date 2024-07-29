var obj={}
document.getElementById("teacherLogin").addEventListener("click",async function(e){
    e.preventDefault()
    a=document.querySelectorAll("input")
    a.forEach(objectCreation)
    console.log(obj)
    console.log(JSON.stringify(obj))
     let response=await fetch('http://localhost:3000/api/v1/teacher',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"//; charset=utf-8",
        },
        body:JSON.stringify(obj)
    });
    if (!response.ok) {
        const err=await response.json()
        alert(err.message);
        // throw new Error(`Error! status: ${response.status}`);
      }
    else
    {const resp= await response.json();
    console.log(resp)
    sessionStorage.setItem("user_id",resp.user_id)
    sessionStorage.setItem("email",resp.user_email)
    window.location.href="otp.html"
    }
})
function objectCreation(item)
{
    d=item.id
    let c=item.value
    obj[d]=c
}
