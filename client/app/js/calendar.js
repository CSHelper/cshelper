function loadCalendar(argument) {
	$('#calendar').fullCalendar({
		// put your options and callbacks here
		
		schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
		
		events: [
			{
				title: 'Due: Variable Declarations',
				start: '2017-03-13'
			},
			{
				title: 'Due: Assignments',
				start: '2017-03-15'
			},
			{
				title: 'Due: Printing Variables',
				start: '2017-03-27'
			},
			{
				title: 'Due: Keywords',
				start: '2017-03-29'
			},
			
			
			

			{
				title: 'Lesson: Variables',
				start: '2017-03-06',
				end: '2017-03-11',
				allDay: true
			},
			{
				title: 'Lesson: Operators',
				start: '2017-03-13',
				end: '2017-03-18',
				allDay: true
			},
			{
				title: 'Lesson: Decision Making',
				start: '2017-03-27',
				end: '2017-04-01',
				allDay: true
			}
		]
	})
}