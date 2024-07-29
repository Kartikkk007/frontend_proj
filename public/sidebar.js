sideBar = document.querySelector('.sidebar')
barbutton = document.querySelector('.btnsidebar')

barbutton.addEventListener('click', () => {
    console.log('clicked')
    sideBar.classList.toggle('showSidebar')
})

var randColor = () => {
    console.log('wehehe')
    const x = document.getElementsByClassName('title')
    console.log(x)
    arr = ['A599B5', 'E03616', 'CD8987', 'FFBC42', 'EF233C', '6874E8', '0077B6','D7907B', 'E56B70', 'ABFF4F', 'E29578', 'FFBF46', '058C42']
    for(i = 0; i < x.length; i++) {    
        // x[i].style.backgroundImage = "linear-gradient(to left,"+"hsl("+Math.random()*360 + ",100%,30%),"+"hsl("+Math.random()*360 + ",100%,0%)"+")";
        // console.log(x[i].style.backgroud)
        x[i].style.backgroundColor = '#' + arr[Math.floor(Math.random()*arr.length)]
        // x[i].style.backgroundColor = "red"
    }
}
randColor()
