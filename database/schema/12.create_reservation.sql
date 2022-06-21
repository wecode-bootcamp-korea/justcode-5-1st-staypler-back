CREATE TABLE reservation(
  id int auto_increment primary key,
  room_type_id int not null,
  user_id int not null,
  name varchar(100) not null,
  phone varchar(100) not null,
  email varchar(200) not null,
  start_date timestamp not null,
  end_date timestamp not null,
  created_at timestamp default current_timestamp,
  foreign key(room_type_id) references room_type(id) on delete cascade,
  foreign key(user_id) references users(id)
);