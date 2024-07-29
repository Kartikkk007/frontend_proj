const params = window.location.search
const id = new URLSearchParams(params).get('cid')
console.log('HELLO')
$(() => {
	const showAss = async () => {
		console.log('IN NEW JS')
		
		try {
			const {
				data: { assignments },
			} = await axios.get(`/api/v1/assignment/${id}`)
			console.log(assignments)
			if(assignments.length < 1) {
				$('.classes').append('<h5 class="empty-list">No assignment in your list</h5>')
				return
			}
			const allAss = assignments.map((assignment) => {
				const {title,due,_id} = assignment
				$('.empty-list').remove()
				ul = $('<ul></ul>')
				ul.append(`<li class="subject-box">
                    <a href="/.html?cid=${id}&%id=${_id}">${title} Due: ${due}</a>
                    <div class="student-comments">
                        <textarea id="comment1" rows="2" placeholder="Add your comments..."></textarea>
                        <button onclick="addComment('comment1')">Add Comment</button>
                    </div>
                </li>`)
				$('.classes').append(ul)
			})
		} catch(err) {
			console.log(err)
			$('.classes').html('<h5 class="empty-list">There was an error, please try later....</h5>')
		}
	}
	showAss()
	console.log('HEHEHEHEHEHE')
	$('.creating-ass').on('click', (e) => {
		console.log('haiiii')
		window.open(`create_assignment.html?cid=${id}`)
	})
	
})