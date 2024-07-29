$(() => {
    const showClass = async () => {
        try {
            //const user = '652ba41fda7cd69fe4341e16';
            const {
                data: {role,classes} 
            } = await axios.get('/api/v1/classroom')
            console.log(role)
            if(classes.length < 1) {
                $('.main').append('<h1>No Classes found</h1>')
                return
            }
            const allClasses = classes.map((cls) => {
                const {title,_id,course} = cls
                return $(".main").append(
                    `<div class="testing" id=${_id}><div class="title"><h1>${title}</h1></div><div class="foot" style=""><p>Class Code: ${_id}</p><p>${course}</p></div></div>`
                  );
            })
        } catch(error) {
            $('.main').append('<h1>An Error Occurred</h1>')
            $('.main').append(`<p>${error}</p>`)
        }
    }
    // showClass()
    $.when( showClass() ).done(function() {
		randColor()
        $(".testing").click(async function(e){
            // console.log($(".title"))
            
            reqID=$(e.target).parents()[1].id
            if(reqID=="")
            reqID=$(e.target).parents()[0].id
            console.log(reqID)
             let respons=await fetch('http://localhost:3000/api/v1/classroom/'+ new URLSearchParams({'id':reqID}),{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"//; charset=utf-8",
                    },
                });
			window.location.href = `new.html?cid=${reqID}`
        })
		
 });
})
