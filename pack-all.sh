packdir="./packs"

if ! command -v npm &> /dev/null
then
	echo "npm is not installed: install npm with 'sudo apt-get install npm'"
	exit 1
fi

if ! command -v zip &> /dev/null
then
	echo "zip is not installed: install zip with 'sudo apt-get install zip'"
	exit 1
fi

rm -rf -f $packdir &&
mkdir -p $packdir &&

cd ./blocks &&

for f in *; do
    if [ -d "$f" ]; then
        echo "---"
        echo "Packing '$f'"

        (
            composedname="wp-idg-ufr__block-$f"

            function copy_files() {
                cp -r ./build ./"$composedname" 2>/dev/null
                cp ./assets/client-"$f".js ./"$composedname"/assets/client-"$f".js 2>/dev/null
                cp ./block.json ./"$composedname" 2>/dev/null
                cp ./"$composedname".php ./"$composedname" 2>/dev/null
            }

            cd "$f" &&
            rm -f "$composedname".zip

            echo "Building..." &&

            {
              npm run build || npm i && npm run build
            } &> /dev/null &&

            echo "Mounting directory structure and zipping..." &&
            mkdir -p "$composedname"/assets &&
            copy_files &&

            {
              zip "$composedname".zip ./"$composedname" -r
            } &> /dev/null &&

            rm -rf -f ./"$composedname" &&

            mv "$composedname".zip "../../$packdir"

            echo "Packed file: $composedname.zip"
        )
    fi
done &&

(
  echo "---" &&
  echo "Packing dependencies" &&

  composedname="wp-idg-ufr__block-dependencies" &&
  cd ../dependencies &&

  function copy_files() {
      cp -r ./lib ./$composedname 2>/dev/null
      cp -r ./assets ./$composedname 2>/dev/null
      cp ./index.js ./$composedname 2>/dev/null
      cp ./node_modules/regenerator-runtime/runtime.js ./$composedname/node_modules/regenerator-runtime/runtime.js 2>/dev/null
      cp ./$composedname.php ./$composedname 2>/dev/null
  }

  rm -f "$composedname".zip
  echo "Building..." &&

  {
    npm run build
  } &> /dev/null &&

  echo "Mounting directory structure and zipping..." &&

  mkdir -p "$composedname"/node_modules/regenerator-runtime &&
  copy_files &&

  {
    zip "$composedname".zip ./"$composedname" -r
  } &> /dev/null &&

  rm -rf -f ./"$composedname" &&
  mv "$composedname".zip "../$packdir" &&

  echo "Packed file: $composedname.zip"
)

echo "---";
echo "";
echo "Done. Packed files can be found at $packdir folder.";
