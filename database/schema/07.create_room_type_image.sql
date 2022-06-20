CREATE TABLE room_type_image(
  id int auto_increment primary key,
  room_type_id int not null,
  image varchar(2000),
  foreign key(room_type_id) references room_type(id) on delete cascade
);