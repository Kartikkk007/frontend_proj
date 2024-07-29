let timerOn = true;

        function timer(remaining) {
        var m = Math.floor(remaining / 60);
        var s = remaining % 60;
        
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        document.getElementById('timer').innerHTML = m + ':' + s;
        remaining=remaining-1;
        
        if(remaining >= 0 && timerOn) {
            setTimeout(function() {
                timer(remaining);
            }, 1000);
            return;
        }

        if(!timerOn) {
            return;
        }
        
        // Do timeout stuff here
        alert('Timeout for otp');
        document.getElementById('resendOtp').disabled=false
        }
        // document.getElementById('').disabled=true
        timer(120)
        document.getElementById("verifyOtp").addEventListener('click',async function(e){
                e.preventDefault()
                let res=await fetch('http://localhost:3000/api/v1/otpverify',{
                method:"POST",
                // credentials:"include",
                headers:{
                    "Content-Type":"application/json"//; charset=utf-8",
                },
                body:JSON.stringify({user_id:sessionStorage.getItem("user_id"),otp:document.getElementById("otp").value,email:sessionStorage.getItem("email")})
            });
            if(res.status==200){
                timerOn=false
                const result=await res.json()
                alert("otp verified successfully")
                //set cookies may be here
                const token=result.token
                const expiry=new Date(new Date().getTime()+30*24*60*1000)
                console.log(encodeURIComponent(token))
                // let respons=await fetch('http://localhost:3000/api/v1/classroom',{
                //     method:"GET",
                //     headers:{
                //         "Content-Type":"application/json"//; charset=utf-8",
                //     },
                // });

                // document.cookie=`token=${encodeURIComponent(token)};path=../;expires=Date.now()`
            }
            else{
                const err=await res.json()
                alert(err.message)
                document.getElementById("resendOtp").disabled=false
            }
        })
        document.getElementById("resendOtp").addEventListener('click',async function(e){
                e.preventDefault()
                e.target.disabled=true
                timerOn=false
                document.getElementById("otp").disabled=true
                console.log(sessionStorage.getItem("user_id"))
                let response=await fetch('http://localhost:3000/api/v1/resendotp',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"//; charset=utf-8",
                },
                body:JSON.stringify({user_id:sessionStorage.getItem("user_id"),email:sessionStorage.getItem("email")})
            });
            console.log(response)
                if (response.status==200) {
                    console.log("okay")
                    document.getElementById("otp").disabled=false
                    timerOn=true
                    timer(120)
                }
                else{
                        const err=await response.json()
                        alert(err.message)
                    }
        })