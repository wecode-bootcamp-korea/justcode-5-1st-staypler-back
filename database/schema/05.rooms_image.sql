CREATE TABLE rooms_image (
  id int auto_increment primary key,
  rooms_id int not null,
  image varchar(2000),
  foreign key(rooms_id) references rooms(id) on delete cascade
);