const params = window.location.search
const id = new URLSearchParams(params).get('cid')
const tit = document.querySelector('#assignmentTitle')
const cont = document.querySelector('#assignmentContent')
const clas = document.querySelector('#classId')
const du = document.querySelector('#due')
$(() => {
	console.log('hiii')
	$('.submitting').on('click', async (e) => {
		e.preventDefault()
		try {
			title = tit.value
			content = cont.value
			//classId = id
			due = du.value
			console.log('WooHOO')
			const {assignment} = await axios.post(`/api/v1/assignment/${id}`,{title,content,due})
			console.log(assignment)
			$('#assignmentForm').append('<h5>Success</h5>')
		} catch(err) {
			$('#assignmentForm').append('<h5>Something went wrong</h5>')
		}
	})
})