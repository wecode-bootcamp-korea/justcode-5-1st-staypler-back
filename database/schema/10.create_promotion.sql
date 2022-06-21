CREATE TABLE promotion(
  id int auto_increment primary key,
  rooms_id int not null,
  image varchar(2000),
  start_date timestamp not null,
  end_date timestamp not null,
  title varchar(300),
  sub_title varchar(500),
  foreign key(rooms_id) references rooms(id) on delete cascade
);