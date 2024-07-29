btnClass = document.querySelector('.btn-class')
createClass = document.querySelector('.create-class')
closeClassForm = document.querySelector('.close')

console.log('hello')

closeClassForm.addEventListener('click', () => {

    if(createClass.classList.contains('show-class')) {

        createClass.classList.remove('show-class')
        createClass.classList.add('create-class')
        
    }
})

btnClass.addEventListener('click', () => {
    console.log('class')
    if(!createClass.classList.contains('show-class')) {
        createClass.classList.add('show-class')
        createClass.classList.remove('create-class')
    }
})