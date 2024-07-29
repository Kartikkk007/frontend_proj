console.log("hi")
value=(document.cookie.match(/^(?:.*;)?\s*jwt\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
if(value!=null)
{
    window.location.href="teacher.html"
}
