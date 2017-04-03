var elements = document.querySelectorAll('.target');
function showdiv (elements, counter)
{
	elements = elements.length ? elements : [elements];
  	for (var index = 0; index < elements.length; index++) {
  		if (index == counter)
  		{
  			elements[index].style.display = 'block';
  		}
  		else	
    		elements[index].style.display = 'none';
  	}
}