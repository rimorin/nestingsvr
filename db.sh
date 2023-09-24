# Sequelize-auto script to generate models from an existing database
npx sequelize-auto -o "./models" -d sequelize_auto_test -h localhost -u my_username -p 5432 -x my_password -e postgres -l ts