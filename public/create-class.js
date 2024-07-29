
$(() => {
  $(".contact-form").on("submit", async(e) => {
    e.preventDefault();
    console.log("hi")
    const obj={}
    $(":text").each(function(){
      obj[this.id]=this.value
    })
    console.log(obj)

    let response=await fetch('http://localhost:3000/api/v1/classroom',{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"//; charset=utf-8",
                    },
                    body:JSON.stringify(obj)
                });
    
    // $(".main").append(
    //   '<div class="testing"><div class="title"><h1 >Classroom 2</h1></div><div class="foot" style=""><p>Class Code: 123456</p><p>Bsc (H) Phy Science</p></div></div>'
    // );
    // randColor()
    //console.log($(".main"));
  });
});
