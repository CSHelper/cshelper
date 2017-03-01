 let comp="$(echo $1 | $3)"
if [ $comp == $2 ]; 
then
	exit 0
else
	exit 1
fi 