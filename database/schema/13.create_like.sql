CREATE TABLE like(
  id int auto_increment primary key,
  user_id int not null,
  rooms_id int not null,
  isLike boolean,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp on update current_timestamp,
  foreign key(user_id) references users(id) on delete cascade,
  foreign key(rooms_id) references rooms(id) on delete cascade
);