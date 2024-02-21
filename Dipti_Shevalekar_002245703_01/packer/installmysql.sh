MYSQL_ROOT_PASSWORD="Cloud@123"

sudo dnf install -y expect
sudo dnf install -y mysql-server
sudo systemctl start mysqld.service
sudo systemctl status mysqld

sleep 10

expect << EOF
spawn sudo mysql_secure_installation

expect "Press y|Y for Yes, any other key for No:"
send "y\r"


expect "Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG:"
send "2\r"


expect "Enter password for user root:"
send "${MYSQL_ROOT_PASSWORD}\r"

expect "Re-enter new password:"
send "${MYSQL_ROOT_PASSWORD}\r"


expect "Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) :"
send "y\r"

expect "Remove anonymous users?"
send "y\r"

expect "Disallow root login remotely?"
send "y\r"

expect "Remove test database and access to it?"
send "y\r"

expect "Reload privilege tables now?"
send "y\r"

expect eof
EOF

sudo systemctl restart mysqld 
sleep 10


  HOST="localhost"
  DB_USERNAME="root"
  PASSWORD="Cloud@123"
  DATABASE="trial_db"
  PORT=3002

mysql --user="$DB_USERNAME" --execute="CREATE DATABASE "$DATABASE"; use "$DATABASE";