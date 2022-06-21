CREATE TABLE room_type (
  id int auto_increment primary key,
  rooms_id int not null,
  title varchar(300),
  type varchar(300),
  min_limit int not null,
  max_limit int not null,
  price int not null,
  check_in_time timestamp not null,
  check_out_time timestamp not null
);