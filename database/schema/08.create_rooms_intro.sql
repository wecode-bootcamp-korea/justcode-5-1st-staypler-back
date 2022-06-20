CREATE TABLE rooms_intro(
  id int auto_increment primary key,
  rooms_id int not null,
  title varchar(300),
  main_content text,
  sub_content text,
  foreign key(rooms_id) references rooms(id) on delete cascade
);