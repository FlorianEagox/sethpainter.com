rm -rf dist
nuxt generate
cd /home/seth/www/thefoxarmy.com
rm -rf 200.html about favicon.ico index.html _nuxt projects README.md
cd -
cp -r ./dist/* /home/seth/www/thefoxarmy.com/
