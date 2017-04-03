set -e

comp="$(echo $1 | $3)"
if [ $comp -eq $2 ]; then
  echo $comp
	exit 0
else
  echo $comp
	exit 3
fi 