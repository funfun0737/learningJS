const list = document.querySelector(`.todos`);
list.addEventListener('click', (e) => {
	if(e.target.classList.contains('todo')) {
		e.target.classList.toggle('complete');
	}
});
